import { pgClient } from '@/config/pg-client/index.js'
import { Router } from 'express'
import { randomUUID } from 'crypto'
import { QueryResult } from 'pg'
import { Response } from 'express'

// Aquí está la estructura del cuerpo que debes usar en Postman
// Si no incluyes el campo 'destino', el valor se guardará como NULL
type ViajeConductorRequestBody = {
  usuario: { id: number }
  conductor: { id: number }
  ruta: { id: number }
  origen: { id: number }
  destino?: { id: number | null }
}

export class ViajeConConductorRoutes {
  static get routes(): Router {
    const router = Router()

    // Endpoint GET para obtener todos los viajes con conductor
    router.get('/', async (req, res: Response) => {
      try {
        const result = await pgClient('SELECT * FROM viaje WHERE conductor_id IS NOT NULL') as QueryResult;
        
        if ('error' in result) {
          console.error('Error al obtener los viajes:', (result as any).error);
          return res.status(500).json({ _resultado: 'error', mensaje: 'Error al obtener los viajes.' });
        }
        
        return res.status(200).json({
          _resultado: 'exito',
          datos: { viajes: result.rows }
        });
      } catch (error) {
        console.error('Error en la ruta GET /:', error);
        return res.status(500).json({ _resultado: 'error', mensaje: 'Error interno del servidor.' });
      }
    });

    // Endpoint GET para obtener un viaje específico por ID
    router.get('/:id', async (req, res: Response) => {
      const { id } = req.params;
      try {
        const result = await pgClient('SELECT * FROM viaje WHERE id = $1 AND conductor_id IS NOT NULL', [id]) as QueryResult;

        if ('error' in result) {
          console.error('Error al obtener el viaje:', (result as any).error);
          return res.status(500).json({ _resultado: 'error', mensaje: 'Error al obtener el viaje.' });
        }

        if (result.rows.length === 0) {
          return res.status(404).json({ _resultado: 'error', mensaje: 'Viaje no encontrado.' });
        }

        return res.status(200).json({ _resultado: 'exito', datos: { viaje: result.rows[0] } });
      } catch (error) {
        console.error('Error en la ruta GET /:id:', error);
        return res.status(500).json({ _resultado: 'error', mensaje: 'Error interno del servidor.' });
      }
    });

    // # Sistema de transporte público gestionado por privado (taxi, combi, etc)
    // Inicia el viaje
    router.post('/', async (req, res) => {
      // Se extraen los nuevos campos del body
      const { usuario, conductor, ruta, origen, destino } = req.body as ViajeConductorRequestBody

      try {
        // - Verifica auth del usuario (por lo mientras aquí usen un usuario_id aleatorio)
        // Se actualiza la validación para los nuevos campos requeridos
        if (!usuario?.id || !conductor?.id || !ruta?.id || !origen?.id) {
          return res.status(400).json({
            _resultado: 'error',
            mensaje: 'Faltan campos obligatorios: usuario.id, conductor.id, ruta.id u origen.id'
          })
        }

        // --- INICIO DE LA LÓGICA INTERNA ---

        // - Obtiene datos del usuario, conductor, ruta y origen
        // Se corrige el nombre de la tabla a 'usuario'
        const userResult = await pgClient('SELECT * FROM usuario WHERE id = $1', [usuario.id]) as QueryResult
        if ('error' in userResult || userResult.rows.length === 0) {
          console.error('Error al obtener el usuario:', 'error' in userResult ? (userResult as any).error : 'Usuario no encontrado')
          return res.status(userResult.rows?.length === 0 ? 404 : 500).json({
            _resultado: 'error',
            mensaje: 'Usuario no encontrado'
          })
        }
        const userData = userResult.rows[0]

        // Se corrige el nombre de la tabla a 'conductor'
        const conductorResult = await pgClient('SELECT * FROM conductor WHERE id = $1', [conductor.id]) as QueryResult
        if ('error' in conductorResult || conductorResult.rows.length === 0) {
          console.error('Error al obtener el conductor:', 'error' in conductorResult ? (conductorResult as any).error : 'Conductor no encontrado')
          return res.status(conductorResult.rows?.length === 0 ? 404 : 500).json({
            _resultado: 'error',
            mensaje: 'Conductor no encontrado'
          })
        }
        const conductorData = conductorResult.rows[0]

        // Valida que la ruta y el origen existan
        const rutaResult = await pgClient('SELECT * FROM ruta WHERE id = $1', [ruta.id]) as QueryResult
        if ('error' in rutaResult || rutaResult.rows.length === 0) {
            console.error('Error al obtener la ruta:', 'error' in rutaResult ? (rutaResult as any).error : 'Ruta no encontrada')
            return res.status(rutaResult.rows?.length === 0 ? 404 : 500).json({
                _resultado: 'error',
                mensaje: 'Ruta no encontrada'
            })
        }

        const origenResult = await pgClient('SELECT * FROM parada WHERE id = $1', [origen.id]) as QueryResult
        if ('error' in origenResult || origenResult.rows.length === 0) {
            console.error('Error al obtener la parada de origen:', 'error' in origenResult ? (origenResult as any).error : 'Parada no encontrada')
            return res.status(origenResult.rows?.length === 0 ? 404 : 500).json({
                _resultado: 'error',
                mensaje: 'Parada de origen no encontrada'
            })
        }

        // Si el destino es proporcionado, también validamos su existencia
        if (destino?.id) {
            const destinoResult = await pgClient('SELECT * FROM parada WHERE id = $1', [destino.id]) as QueryResult
            if ('error' in destinoResult || destinoResult.rows.length === 0) {
                console.error('Error al obtener la parada de destino:', 'error' in destinoResult ? (destinoResult as any).error : 'Parada no encontrada')
                return res.status(destinoResult.rows?.length === 0 ? 404 : 500).json({
                    _resultado: 'error',
                    mensaje: 'Parada de destino no encontrada'
                })
            }
        }
        
        // - Comprueba descuentos o programas
        const precioFijo = 50.00
        // - Cobra a la dirección de billetera de OpenPayments el precio fijo
        // - Aquí la diferencia es que una cantidad del pago se va a al conductor
        //   y otra se va al gobierno, 80% %20 digamos
        const comisionGobierno = precioFijo * 0.20 // 20% para el gobierno
        const pagoConductor = precioFijo * 0.80 // 80% para el conductor

        // Aquí se simularía la llamada a la API de OpenPayments.
        const pagoExitoso = true

        if (!pagoExitoso) {
          return res.status(402).json({
            _resultado: 'error',
            mensaje: 'El pago no pudo ser procesado. Por favor, intente de nuevo.'
          })
        }

        // - Crea el registro de "viaje" en la tabla en la DB
        // - crea con un destino aleatorio y un id de conductor también aleatorio.
        const paymentId = randomUUID();
        
        const insertQuery = `
          INSERT INTO viaje (
            ruta, origen, destino, usuario_id, conductor_id, payment_id, total_centavos
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
        `
        const insertValues = [
          ruta.id,
          origen.id,
          destino?.id ?? null,
          usuario.id,
          conductor.id,
          paymentId,
          precioFijo * 100
        ]

        const viajeResult = await pgClient(insertQuery, insertValues) as QueryResult
        if ('error' in viajeResult) {
          console.error('Error al insertar el viaje:', (viajeResult as any).error)
          return res.status(500).json({
            _resultado: 'error',
            mensaje: 'Error interno del servidor al registrar el viaje'
          })
        }
        const nuevoViajeId = viajeResult.rows[0].id

        // Response
        // - Si el pago fue exitoso:
        // HTTP code 200
        return res.status(200).json({
          _resultado: 'exito',
          datos: {
            viaje_id: nuevoViajeId,
            total: precioFijo
          }
        })
      } catch (error) {
        console.error('Error en la ruta POST /:', error)
        // - Si hubo un error:
        // HTTP code 200
        return res.status(500).json({
          _resultado: 'error',
          mensaje: 'Error interno del servidor'
        })
      }
    })

    return router
  }
}
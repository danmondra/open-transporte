import { pgClient } from '@/config/pg-client/index.js'
import { Router } from 'express'
import { randomUUID } from 'crypto'
import { QueryResult } from 'pg'
import { Response } from 'express'

type ViajeRequestBody = {
  usuario: { id: number }
  parada: { id: number }
}

export class ViajeRoutes {
  static get routes (): Router {
    const router = Router()
    //
    // Endpoint GET para obtener todos los viajes del gobierno
    router.get('/', async (req, res: Response) => {
      try {
        const result = await pgClient('SELECT * FROM viaje WHERE conductor_id IS NULL') as QueryResult;
        
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

    // Endpoint GET para obtener un viaje del gobierno por ID
    router.get('/:id', async (req, res: Response) => {
      const { id } = req.params;
      try {
        const result = await pgClient('SELECT * FROM viaje WHERE id = $1 AND conductor_id IS NULL', [id]) as QueryResult;

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

    // # Sistema de transporte público gestionado por el gobierno (metro, metrobus, etc)
    // Inicia el viaje
    router.post('/', async (req, res: Response) => {
      const { usuario, parada } = req.body as ViajeRequestBody

      try {
        if (!usuario?.id || !parada?.id) {
          return res.status(400).json({
            _resultado: 'error',
            mensaje: 'Faltan campos obligatorios: usuario.id o parada.id'
          })
        }

        const userResult = await pgClient('SELECT * FROM usuario WHERE id = $1', [usuario.id]) as QueryResult
        if ('error' in userResult || userResult.rows.length === 0) {
          return res.status(userResult.rows?.length === 0 ? 404 : 500).json({
            _resultado: 'error',
            mensaje: 'Usuario no encontrado'
          })
        }
        const userData = userResult.rows[0]

        const precioFijo = 5.00
        const pagoExitoso = true

        if (!pagoExitoso) {
          return res.status(402).json({
            _resultado: 'error',
            mensaje: 'El pago no pudo ser procesado.'
          })
        }

        const rutaId = 1
        const paymentId = randomUUID();
        const insertQuery = `
          INSERT INTO viaje (
            ruta, origen, destino, usuario_id, conductor_id, payment_id, total_centavos
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id
        `
        const insertValues = [
          rutaId,
          parada.id,
          null,
          userData.id,
          null,
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

        return res.status(200).json({
          _resultado: 'exito',
          datos: {
            viaje_id: nuevoViajeId,
            total: precioFijo
          }
        })
      } catch (error) {
        console.error('Error en la ruta POST /:', error)
        return res.status(500).json({
          _resultado: 'error',
          mensaje: 'Error interno del servidor'
        })
      }
    })

    return router
  }
}
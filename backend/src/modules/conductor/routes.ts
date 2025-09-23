import { pgClient } from '@/config/pg-client/index.js'
import { Router } from 'express'
import { QueryResult } from 'pg'
import { Response } from 'express'

export class ConductorRoutes {
  static get routes (): Router {
    const router = Router()

    // Obtiene los viajes que realizó el conductor en la DB en la tabla "viaje"
    //
    // En el header:
    // Authorization: Basic INventado // aquí se inventan algo para simular la auth
    //
    // Response: {
    //   _resultado: 'exito',
    //   viajes: [{
    //     id: numero,
    //     ruta: numero,
    //     origen: numero,
    //     destino: numero,
    //     usuario_id: numero,
    //     conductor_id: numero,
    //     total_centavos: numero,
    //     creado_en: timestamp (string)
    //   }] <- arreglo de todos los viajes
    // }
    //
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
    
    
    return router
  }
}
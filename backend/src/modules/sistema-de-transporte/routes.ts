import { pgClient } from '@/config/pg-client/index.js'
import assert from 'assert'
import { Router } from 'express'

type SistemaDeTransporteDTO = {
  id: number
  nombre: string
  indicaciones_usuario: string
  responsable: string
}

const sistemaDeTransporteMapperFromSQL = (
  sql: any
): SistemaDeTransporteDTO => {
  assert(
    sql.id !== undefined &&
    sql.nombre !== undefined &&
    sql.indicaciones_usuario !== undefined &&
    sql.responsable !== undefined
  )

  return {
    id: sql.id,
    nombre: sql.nombre,
    indicaciones_usuario: sql.indicaciones_usuario,
    responsable: sql.responsable
  }
}

export class SistemaDeTransporteRoutes {
  static get routes (): Router {
    const router = Router()

    router.get('/', async (req, res) => {
      // Hacemos la consulta a la base de datos
      // El primer parametro es la consulta
      // El segundo parametro son los parametros que acompañan la consulta
      const sistemaTransportesSQL = await pgClient('SELECT * FROM sistema_transporte')

      if ('error' in sistemaTransportesSQL) {
        return res.json({
          _resultado: 'error',
          mensaje: 'No se pudieron obtener los datos de la base de datos'
        })
      }

      const sistemasDeTransporteDTO = sistemaTransportesSQL
        .rows.map(sistemaDeTransporteMapperFromSQL)

      return res.json({
        _resultado: 'exito',
        datos: {
          sistemasDeTransporte: sistemasDeTransporteDTO
        }
      })
    })

    router.get('/:id', () => { })

    return router
  }
}

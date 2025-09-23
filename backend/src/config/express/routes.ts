import { SistemaDeTransporteRoutes } from '@/modules/sistema-de-transporte/routes.js'
import { Router } from 'express'
import { ViajeRoutes } from '@/modules/viaje/routes.js'

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    // TODO
    router.use('/api/viaje', ViajeRoutes.routes)
    // router.use('/api/viaje-con-conductor', ViajeConConductorRoutes.routes)
    // router.use('/api/conductor', ConductorRoutes.routes)
    router.use('/api/sistema-transporte', SistemaDeTransporteRoutes.routes)

    return router
  }
}

import { ENVS } from './config/envs.js'
import { AppRoutes, Server } from './config/express/index.js'

(async () => {
  await main()
})()

async function main (): Promise<void> {
  await new Server({
    port: ENVS.BACKEND_PORT,
    routes: AppRoutes.routes
  }).start()
}

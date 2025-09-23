import express, { Router } from 'express'

interface Options {
  port: number
  routes: Router
}

export class Server {
  private readonly app: express.Express
  private readonly port: number
  private readonly routes: Router

  constructor (
    options: Options
  ) {
    this.app = express()
    this.port = options.port
    this.routes = options.routes
  }

  async start (): Promise<void> {
    this.app.set('x-powered-by', false)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    // Usar las rutas definidas
    this.app.use(this.routes)

    // test
    this.app.listen(this.port, () => {
      console.log(`Server app running on PORT ${this.port}`)
    })
  }
}

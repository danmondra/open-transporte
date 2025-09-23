import envVar from 'env-var'

const { get } = envVar

export const ENVS = {
  BACKEND_PORT: get('BACKEND_PORT').required().asPortNumber(),

  POSTGRES_PORT: get('POSTGRES_PORT').required().asPortNumber(),
  POSTGRES_DB: get('POSTGRES_DB').required().asString(),
  POSTGRES_USER: get('POSTGRES_USER').required().asString(),
  POSTGRES_HOST: get('POSTGRES_HOST').required().asString(),
  POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString()
}

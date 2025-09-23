import { Pool, QueryResult } from 'pg'
import { ENVS } from '../envs.js'

export async function pgClient<T> (query: string, params?: T[]): Promise<QueryResult | { error: any }> {
  try {
    const pool = new Pool({
      user: ENVS.POSTGRES_USER,
      password: ENVS.POSTGRES_PASSWORD,
      host: ENVS.POSTGRES_HOST,
      port: ENVS.POSTGRES_PORT,
      database: ENVS.POSTGRES_DB
    })

    // the pool will emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    pool.on('error', (err, _) => {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    })

    const client = await pool.connect()
    const res = await client.query(query, params)

    client.release()

    return res
  } catch (e: unknown) {
    console.log(e)

    return { error: e }
  }
}

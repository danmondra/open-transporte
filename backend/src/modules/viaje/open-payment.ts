// Tutorial del cliente de Open Payments
// Objetivo: Realizar un pago entre pares entre dos direcciones de billetera (usando cuentas en la cuenta de prueba)

// Configuración inicial
// a. Importar dependencias y configurar el cliente
import { createAuthenticatedClient, isFinalizedGrant, type AuthenticatedClient } from '@interledger/open-payments'
import fs from 'node:fs'
import path from 'node:path'

const cliente = '$ilp.interledger-test.dev/open-transporte'
const keyId = '0bede86c-05e1-4d89-bd0f-61a5bfb62227'

// remitente
const usuario = '$ilp.interledger-test.dev/mario-usuario-de-transporte-publico'
// receptor
const gobierno = '$ilp.interledger-test.dev/government'

// const conductor = '$ilp.interledger-test.dev/jorge-conductor'

const walletAddress = (s: string): string => s.replace('$', 'https://')

const authClient = async (): Promise<AuthenticatedClient> => {
  const privateKey = fs.readFileSync(path.join(import.meta.dirname, 'private.key'), 'utf8')
  // b. Crear una instancia del cliente Open Payments
  const client = await createAuthenticatedClient({
    walletAddressUrl: walletAddress(cliente),
    // c. Cargar la clave privada del archivo
    privateKey,
    keyId
  })

  return client
}

type data = {
  client: any
  usuarioWallet: any
  gobiernoWallet: any
  incomingPayment: any
  inconmingPaymentGrant: any
  quoteGrant: any
  quote: any
  token: { outgoingPaymentGrant: any }
  authorize: boolean
}

async function getGrantAccess (
  usuarioAddress: string,
  gobiernoAddress: string,
  total: string
): Promise<data> {
  const client = await authClient()

  // Flujo de pago entre pares
  // 1. Obtener una concesión para un pago entrante)
  const usuarioWallet = await client.walletAddress.get({
    url: walletAddress(usuarioAddress)
  })
  const gobiernoWallet = await client.walletAddress.get({
    url: walletAddress(gobiernoAddress)
  })

  console.log({ gobiernoWallet, usuarioWallet })

  // 2. Obtener una concesión para un pago entrante
  const inconmingPaymentGrant = await client.grant.request({
    url: gobiernoWallet.authServer
  }, {
    access_token: {
      access: [{
        type: 'incoming-payment',
        actions: ['create']
      }]
    }
  })

  if (!isFinalizedGrant(inconmingPaymentGrant))
    throw new Error('Se espera finalice la concesión')

  // 3. Crear un pago entrante para el receptor
  const incomingPayment = await client.incomingPayment.create({
    url: gobiernoWallet.resourceServer,
    accessToken: inconmingPaymentGrant.access_token.value
  }, {
    walletAddress: gobiernoWallet.id,
    incomingAmount: {
      assetCode: gobiernoWallet.assetCode,
      assetScale: gobiernoWallet.assetScale,
      value: total
    }
  })

  // 4. Crear un concesión para una cotización
  const quoteGrant = await client.grant.request(
    { url: usuarioWallet.authServer },
    {
      access_token: {
        access: [{
          type: 'quote',
          actions: ['create']
        }]
      }
    }
  )

  if (!isFinalizedGrant(quoteGrant))
    throw new Error('Se espera finalice la concesión')

  // 5. Obtener una cotización para el remitente
  const quote = await client.quote.create(
    {
      url: gobiernoWallet.resourceServer,
      accessToken: quoteGrant.access_token.value
    },
    {
      walletAddress: usuarioWallet.id,
      receiver: incomingPayment.id,
      method: 'ilp'
    }
  )

  const savedGrant = fs.readFileSync(path.join('../../config/open-payments/', 'temporal-grant.json'), 'utf8')
  const outgoingPaymentGrant = savedGrant.length !== 0 ? JSON.parse(savedGrant) : null
  console.log({ outgoingPaymentGrant })

  const data: data = {
    client,
    usuarioWallet,
    gobiernoWallet,
    incomingPayment,
    inconmingPaymentGrant,
    quoteGrant,
    quote,
    token: {
      outgoingPaymentGrant
    },
    authorize: false
  }

  console.log({ outgoingPaymentGrant })

  if (outgoingPaymentGrant === null) {
    data.token.outgoingPaymentGrant = await client.grant.request(
      { url: usuarioWallet.authServer },
      {
        access_token: {
          access: [{
            actions: ['create'],
            type: 'outgoing-payment',
            identifier: usuarioWallet.id,
            limits: {
              debitAmount: quote.debitAmount
            }
          }]
        },
        interact: {
          start: ['redirect']
        }
      }
    )

    const token = JSON.stringify(outgoingPaymentGrant)
    fs.writeFileSync(path.join('../../config/open-payments/', 'temporal-grant.txt'), token)

    data.authorize = true
    data.token.outgoingPaymentGrant = outgoingPaymentGrant
  }

  return data
}

async function sendPayment (
  data: data
): Promise<any> {
  // 8. Finalizar la concesión del pago saliente
  // Es importante para verificar si se realizó la autorización en la interacción
  // o si no.
  const finalizarOutgoingPaymentGrant = await data.client.grant.continue({
    url: data.token.outgoingPaymentGrant.continue.uri,
    accessToken: data.token.outgoingPaymentGrant.access_token.value
  })

  if (!isFinalizedGrant(finalizarOutgoingPaymentGrant))
    throw new Error('Se espera finalice la concesión')

  // 9. Continuar con la cotización de pago saliente
  const outgoingPayment = await data.client.outgoingPayment.create(
    {
      url: data.usuarioWallet.resourceServer,
      accessToken: finalizarOutgoingPaymentGrant.access_token.value
    },
    {
      walletAddress: data.usuarioWallet.id,
      quoteId: data.quote.id
    }
  )

  return outgoingPayment
}

const grantAccess = await getGrantAccess(usuario, gobierno, '500')
if (!isFinalizedGrant(grantAccess.token.outgoingPaymentGrant))
  throw new Error('se espera finalice la conexión')

if (grantAccess.authorize) {

}

sendPayment(grantAccess)

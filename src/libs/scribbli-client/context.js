import { getContext, setContext } from 'svelte'


const CLIENT = Symbol('client')


export const getClient = () => {
  const client = getContext(CLIENT)

  if (!client) {
    throw new Error(
      'Scribbli client has not been set. Try using setClient(...)'
    )
  }

  return client
}


export const setClient = (client) => {
  setContext(CLIENT, client)
}

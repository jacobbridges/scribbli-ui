import { getClient } from './context'

/**
 * createMutator()
 *
 * Originally this function was a simple pass-thru for apollo's client.mutate
 * function, but Svelte's components would choke with the error:
 *
 * "function called outside component initialization"
 *
 * But for some reason writing this as a function which returns a function
 * solves the problem.
 */
export const createMutator = (mutation) => {
  const client = getClient()

  return (options) => client.mutate({ mutation, ...options })
//  return await client.mutate({ mutation, ...options  })
}

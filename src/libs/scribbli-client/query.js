import { readable  } from 'svelte/store'
import { getClient } from './context'


export const query = (gql, options) => {
  const client = getClient()

  const apolloQuery = { ...options, query: gql }

  const store = readable({ loading: true, data: undefined, error: undefined }, (set) => {

    client.query(apolloQuery)
          .then(r => set({ loading: false, data: r.data, error: undefined }))
          .catch(e => set({ loading: false, data: undefined, error: e }))

    return () => {}
  })

  return store
}

import { writable } from 'svelte/store'


export const scribbliContext = writable({
  csrftoken: null,
  universeId: null,
})

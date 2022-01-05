import { writable } from 'svelte/store'

export const NOAUTH = Symbol('Not Authenticated')

export const routerError = writable(null)

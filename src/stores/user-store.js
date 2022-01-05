import { writable } from 'svelte/store'


export const User = (function() {
  const { subscribe, set } = writable(null);
  return {
    subscribe,
    signout: () => { set(null) },
    signin: ({email}) => { set(email) },
  }
})()

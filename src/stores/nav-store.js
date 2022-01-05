import {  readable } from 'svelte/store'


export const publicNavLinks = readable([], (set) => {

  set([
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Worlds',
      href: '/worlds',
    },
  ])

  return () => {}
})

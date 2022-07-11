import { get } from 'svelte/store'
import _ from 'lodash'
import { wrap } from 'svelte-spa-router/wrap'

import { User } from '@stores/user-store'
import { routerError, NOAUTH } from '@stores/error-store'

import Login from '@views/public/login.svelte'
import LoginFromMagicLink from '@views/public/login-from-magic-link.svelte'
import PublicIndex from '@views/public/index.svelte'
import WorldList from '@views/public/world-list.svelte'
import WorldCreate from '@views/public/world-create.svelte'
import WorldDetail from '@views/public/world-detail.svelte'
import RegionDetail from '@views/public/region-detail.svelte'
import StoryList from '@views/public/story-list.svelte'
import StoryCreate from '@views/public/story-create.svelte'
import StoryDetail from '@views/public/story-detail.svelte'
import ErrorNotFound from '@views/errors/not_found.svelte'

const authwall = async (detail) => {
  const s = get(User)
  if (!s) { routerError.set(NOAUTH) }
  return !!s
}
const authwrap = (View, conditions=[]) => wrap({
  asyncComponent: () => (_.isString(View)
                         ? import(View)
                         : View),
  conditions: [
    authwall,
    ...conditions,
  ],
})


export const routes = {
  // Root url
  '/': PublicIndex,

  // Initiate login flow
  '/login': Login,

  // Login via magic link
  '/login-from-magic-link': LoginFromMagicLink,

  // -- World
  '/worlds': authwrap(WorldList),
  '/new-world': authwrap(WorldCreate),    // World create page
  '/world/:slug': authwrap(WorldDetail), // World detail page
  '/world/:worldSlug/region/:regionSlug': authwrap(RegionDetail),  // Region detail page

  // -- Story
  '/stories': authwrap(StoryList),
  '/new-story': authwrap(StoryCreate),
  '/story/:slug': authwrap(StoryDetail),

  // Catch all
  '*': ErrorNotFound,
}

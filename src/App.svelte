<script>
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import Router from 'svelte-spa-router'
  import { replace } from 'svelte-spa-router'
  import { routes } from '@src/routes'
  import { scribbliContext } from '@stores/scribbli-context-store'
  import { User } from '@stores/user-store'
  import { routerError, NOAUTH } from '@stores/error-store'

  export let appContext

  onMount(async () => {
    // Slightly jank way of getting app context
    console.log('App.svelte::onMount() appContext=', appContext)
    if (appContext.isLoggedIn) {
      User.signin(appContext.userdata)
    }
    let csrftoken, universeId;
    ({ csrftoken, universeId } = appContext)
    $scribbliContext = { csrftoken, universeId }
  })

  const routeConditionFailed = (event) => {
    if (get(routerError) === NOAUTH) {
      routerError.set(null)
      replace('/')
    }
    replace('/')
  } 
</script>

<main>
	<Router
    {routes}
    on:conditionsFailed={routeConditionFailed}
    restoreScrollState={true}
    />
</main>

<style>
</style>

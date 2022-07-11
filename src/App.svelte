<script>
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import Router from 'svelte-spa-router'
  import { replace } from 'svelte-spa-router'
  import { routes } from '@src/routes'
  import { routerError, NOAUTH } from '@stores/error-store'

  export let appContext

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

<script>
  import { writable } from 'svelte/store'
  import { replace } from 'svlete-spa-router'
  import { generateTabs } from '@src/utils.js'
  import { query } from '@scribbli-client'
  import { USER_DETAIL_BY_SLUG } from '@scribbli-client/queries'
  import SidebarLayout from '@layouts/public-sidebar.svelte'

  // Params from url ----------------------------------------------------------
  export let params = {}

  // Local variables ----------------------------------------------------------
  const { slug } = params
  let req = query(USER_DETAIL, {
    variables: { slug }
  })
  const TAB_ABOUT = 1
  const TAB_CHARACTERS = 2
  const TAB_STORIES = 3
  const TAB_POSTS = 4
  let currentTab = writable(TAB_ABOUT)
  const tabs = generateTabs([
    [TAB_ABOUT, 'About'],
    [TAB_CHARACTERS, 'Characters'],
    [TAB_STORIES, 'Stories'],
    [TAB_POSTS, 'Posts'],
  ], currentTab)


  // Reactive statements ------------------------------------------------------

  // If user could not be found
  $: if ($req.error && $req.error.message.includes('does not exist')) {
    replace('/404')
  }
  

  // Event handlers -----------------------------------------------------------
  const handleUserChange = (e) => {
    req.refresh()
  }
</script>

<SidebarLayout>

  <svelte:fragment slot="heading">
    {#if $req.data}
      <h1>{$req.data.user.name}</h1>
    {:else}
      <h1>...</h1>
    {/if}
  </svelte:frament>

  <div slot="sidebar">
    {#each tabs as t}
      <div>
        {#if t.index == $currentTab}
          <a href="." class="active" on:click|preventDefault={t.load}>
            {t.title}
          </a>
        {:else}
          <a href="." on:click|preventDefault={t.load}>
            {t.title}
          </a>
        {/if}
      </div>
    {/each}
  </div>

  <div>
    {#if $req.data}
      {#if $currentTab === TAB_ABOUT}
        <div>
          {$req.data.user.name}
        </div>
      {/if}
    {/if}
  </div>

</SidebarLayout>

<style>
  h1 { margin-bottom: 0 }
</style>

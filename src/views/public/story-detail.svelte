<script>
  import { writable } from 'svelte/store'
  import { link } from 'svelte-spa-router'
  import { query } from '@scribbli-client'
  import { STORY_DETAIL_BY_SLUG } from '@scribbli-client/queries'
  import { generateTabs } from '@src/utils'
  import SidebarLayout from '@layouts/public-sidebar.svelte'
  import AboutTab from '@cp/pages/story-detail/about-tab.svelte'

  // Params from url ----------------------------------------------------------
  export let params = {}

  // Local variables ----------------------------------------------------------
  const { slug } = params
  let req = query(STORY_DETAIL_BY_SLUG, {
    variables: { slug }
  })
  const getHumanStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'Draft'
      case 'open':
        return 'Open'
      case 'closed':
        return 'Closed'
      case 'finish':
        return 'Finished'
      case 'lfw':
        return 'Looking for Writers'
      case 'dead':
        return 'Dead'
      default:
        return '?'
    }
  }
  const TAB_ABOUT = 1
  const TAB_READ = 2
  const TAB_OOC = 3
  let activeTab = writable(TAB_ABOUT)
  const tabs = generateTabs([
    [TAB_ABOUT, 'About'],
    [TAB_READ, 'Read'],
    [TAB_OOC, 'OOC'],
  ], activeTab)

  // Reactive statements ------------------------------------------------------

  // If story data could not be retrieved due to "does not exist" error, load
  // 404 page
  $: if ($req.error && $req.error.message.includes('does not exist')) {
    replace('/404')
  }

  // Event handlers -----------------------------------------------------------
  const handleStoryChange = (e) => {
    req.refresh()
  }
</script>

<SidebarLayout>

  <svelte:fragment slot="heading">
    {#if $req.data}
      <h1>{$req.data.story.name}</h1>
      <small>
        Status: {getHumanStatus($req.data.story.status)} |
        Author: <a href="/author/{$req.data.story.author.slug}" use:link>{$req.data.story.author.name}</a>
      </small>
    {:else}
      <h1>...</h1>
    {/if}
  </svelte:fragment>

  <div slot="sidebar">
    {#each tabs as t}
      <div>
        {#if t.index == $activeTab}
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

  <div slot="main">
    {#if $req.data}
      <pre>
        {JSON.stringify($req.data)}
      </pre>
      <AboutTab story={$req.data.story} />
    {:else}
      Story could not be found, try refreshing the page.
    {/if}
  </div>

</SidebarLayout>

<style>
  h1 { margin-bottom: 0; }
  small { margin-bottom: 20px; }
</style>

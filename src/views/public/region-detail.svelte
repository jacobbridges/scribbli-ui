<script>
  import { onMount } from 'svelte'
  import { readable, writable, get } from 'svelte/store'
  import { push, replace, link } from 'svelte-spa-router'
  import { query } from '@scribbli-client'
  import { REGION_DETAIL_BY_SLUG_WITH_WORLD } from '@scribbli-client/queries'
  import { generateTabs } from '@src/utils'
  import SidebarLayout from '@layouts/public-sidebar.svelte'
  import AboutTab from '@cp/pages/region-detail/about-tab.svelte'
  import RegionChildren from '@cp/region-children-list.svelte'
  import Lexicon from '@cp/lexicon.svelte'

  // Params from url ----------------------------------------------------------
  export let params = {}

  // Local variables ----------------------------------------------------------
  //const generateTabs = (config, activeStore) => {
  //  return config.map(([index, title]) => ({
  //    title,
  //    index,
  //    get load() {
  //      return () => {
  //        activeStore.set(index)
  //      }
  //    },
  //  }))
  //}
  const { worldSlug, regionSlug } = params
  let req = query(REGION_DETAIL_BY_SLUG_WITH_WORLD, {
    variables: { worldSlug, regionSlug }
  })
  const TAB_ABOUT = 1
  const TAB_REGIONS = 2
  const TAB_LEXICON = 3
  let activeTab = writable(TAB_ABOUT)
  const tabs = generateTabs([
    [TAB_ABOUT, 'About'],
    [TAB_REGIONS, 'Regions'],
    [TAB_LEXICON, 'Lexicon'],
  ], activeTab)

  
  // Reactive statements ------------------------------------------------------

  // If region data could not be retrieved due to "does not exist" error,
  // load 404 page
  $: if ($req.error && $req.error.message.includes('does not exist')) {
    replace('/404')
  }

  // Event handlers -----------------------------------------------------------
  const handleChildRegionClick = (e) => {
    const target = e.detail.region
    push(`/world/${params.worldSlug}/region/${target.slug}`)
  }
  const handleRegionChange = (e) => {
    req.refresh()
  }
</script>

<SidebarLayout>

  <svelte:fragment slot="heading">
    {#if $req.data}
      <h1>{$req.data.region.name}</h1>
      <small>Region within <a href="/world/{$req.data.world.slug}" use:link>{$req.data.world.name}</a></small>
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
      {#if $activeTab === TAB_ABOUT}
        <AboutTab
          region={$req.data.region}
          on:regionChange={handleRegionChange} />
      {:else if $activeTab === TAB_REGIONS}
        <RegionChildren
          parent={$req.data.region}
          on:regionClick={handleChildRegionClick} />
      {:else if $activeTab === TAB_LEXICON}
        <Lexicon refId={$req.data.region.id} />
      {/if}
    {/if}
  </div>

</SidebarLayout>

<style>
  h1 { margin-bottom: 0 }
</style>

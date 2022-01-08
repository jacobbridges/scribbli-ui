<script>
  import { WORLD_DETAIL } from '@scribbli-client/queries'
  import { query } from '@scribbli-client'
  import SidebarLayout from '@layouts/public-sidebar.svelte'

  export let params = {}

  let world = query(WORLD_DETAIL, {
    variables: { worldSlug: params.slug },
  })

  const handleWorldChange = (e) => {
    world.refresh()
  }

  // --------------------------------------------------------------------------
  import { User } from '@stores/user-store'
  

  // --------------------------------------------------------------------------
  import { push } from 'svelte-spa-router'
  import About from '@cp/pages/world-detail/about.svelte'
  import RegionTab from '@cp/pages/world-detail/region-tab.svelte'

  const TAB_ABOUT = Symbol('about')
  const TAB_REGIONS = Symbol('regions')
  const TAB_LEXICON = Symbol('lexicon')
  let activeTab = TAB_ABOUT

  let activeSidebarLink = TAB_ABOUT
  const sidebarLinks = [
    {
      title: 'About',
      symbol: TAB_ABOUT,
      get action() {
        return () => {
          activeTab = this.symbol
          activeSidebarLink = this.symbol
        }
      },
    },
    {
      title: 'Regions',
      symbol: TAB_REGIONS,
      get action() {
        return () => {
          activeTab = this.symbol
          activeSidebarLink = this.symbol
        }
      },
    },
    {
      title: 'Lexicon',
      symbol: TAB_LEXICON,
      get action() {
        return () => {
          activeTab = this.symbol
          activeSidebarLink = this.symbol
        }
      },
    }
  ]
</script>

<SidebarLayout>

  <svelte:fragment slot="heading">
  {#if $world.data}
    <h1>{$world.data.world.name}</h1>
  {/if}
  </svelte:fragment>

  <div slot="sidebar" class="sidebar">
    {#each sidebarLinks as l}
      <div>
        <a
          href="."
          class={l.symbol === activeTab ? 'active' : ''}
          on:click|preventDefault={l.action}
        >
          {l.title}
        </a>
      </div>
    {/each}
  </div>

  <div slot="main">
    {#if $world.data}
      {#if activeTab === TAB_ABOUT}

        <About world={$world.data.world} on:worldChange={handleWorldChange} />

      {:else if activeTab === TAB_REGIONS}

        <RegionTab world={$world.data.world} />

      {:else if activeTab === TAB_LEXICON}
        <i>Not implemented yet</i>
      {/if}
    {/if}
  </div>
</SidebarLayout>

<style>
  h1 { margin-bottom: 0; }
</style>

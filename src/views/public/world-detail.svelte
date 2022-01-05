<script>
  import { WORLD_DETAIL } from '@scribbli-client/queries'
  import { query } from '@scribbli-client'
  import SidebarLayout from '@layouts/public-sidebar.svelte'

  export let params = {}

  const world = query(WORLD_DETAIL, {
    variables: { worldSlug: params.slug },
  })

  // --------------------------------------------------------------------------
  import { User } from '@stores/user-store'
  

  // --------------------------------------------------------------------------
  import { push } from 'svelte-spa-router'
  import RegionCreateForm from '@cp/forms/region-create.svelte'
  import About from '@cp/pages/world-detail/about.svelte'

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

        <About world={$world.data.world} />

        <div class="col-2">
          <div>
            <h4>Test</h4>
            <p>ao;wsg ao; gna;wogneaowing oiwng;oiwne g;oiawng;oiwang;oinaw;og na;wgn awoign a;woign ;awong ;awoign</p>
          </div>
          <div>
            <h4>Col 2</h4>
            <p>slkdfhj aowihernbioguv boiuw4n toi2uwh;o48svh dligh bkajwb elikfugv liuasdgilqwue3b f;KMSCBlgkjh 23oi4ufb</p>
          </div>
        </div>

      {:else if activeTab === TAB_REGIONS}
        <h3>Create Region</h3>
        <RegionCreateForm />
      {:else if activeTab === TAB_LEXICON}
        <i>Not implemented yet</i>
      {/if}
    {/if}
  </div>
</SidebarLayout>

<style>
  h3 {
    margin-top: 0;
  }

  .italic {
    font-style: italic;
  }

  .col-2 {
    display: flex;
  }
  .col-2 > div {
    width: 50%;
  }
</style>

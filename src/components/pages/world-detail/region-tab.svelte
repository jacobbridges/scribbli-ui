<!-- This tab is complex, warranting a dedicated svelte file -->
<script>
  import { push } from 'svelte-spa-router'
  import RegionForm from '@cp/forms/region-create.svelte'
  import RegionChildren from '@cp/region-children-list.svelte'

  // Component props
  export let world

  // Local variables
  const VIEW_REGION_LIST = Symbol('view_region_list')
  const VIEW_REGION_CREATE = Symbol('view_region_create')
  let currentView = VIEW_REGION_LIST

  // Event handlers
  const handleCreateRegionClick = () => {
    currentView = VIEW_REGION_CREATE
  }
  const handleCreateRegionFormSubmit = () => {
    currentView = VIEW_REGION_LIST
  }
  const handleRegionChildClick = (e) => {
    const region = e.detail.region
    push(`/world/${world.slug}/region/${region.slug}`)
  } 
</script>


{#if currentView === VIEW_REGION_LIST}

  <button on:click|preventDefault={handleCreateRegionClick}>
    Create Region
  </button>

  <RegionChildren
    parent={world}
    on:regionClick={handleRegionChildClick} />

{:else if currentView === VIEW_REGION_CREATE}

  <RegionForm
    parent={world}
    on:submit={handleCreateRegionFormSubmit} />

{/if}

<script>
  import { onMount } from 'svelte'
  import { query } from '@scribbli-client'
  import { REGION_LIST } from '@scribbli-client/queries'

  // Props
  export let parent

  // Local variables
  let regions = query(REGION_LIST, {
    variables: {
      parentId: parent.id,
      level: parent.level + 1,
    }
  })

</script>

{#if $regions.data}
  <ul>
    {#each $regions.data.regionList.edges as edge (edge.node.id)}
      <li>{edge.node.name}</li>
    {/each}
  </ul>
{/if}

<style>
</style>

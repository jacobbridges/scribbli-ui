<script>
  import { createEventDispatcher } from 'svelte'
  import { form, field, style, validators } from '@scribbli-forms'
  import { createMutator } from '@scribbli-client'
  import { REGION_CREATE, REGION_LIST } from '@scribbli-client/queries'
  import { scribbliContext } from '@stores/scribbli-context-store'

  // Component props
  export let parent

  // Local variables
  const dispatch = createEventDispatcher()
  const name = field('name', '', [validators.required()])
  const f = form(name)
  const createRegion = createMutator(REGION_CREATE)

  // Event handlers
  const handleCreateRegion = async () => {
    await f.validate()
    if (!$f.valid) return

    try {
      const res = await createRegion({
        variables: {
          name: $name.value,
          universeId: $scribbliContext.universeId,
          parentId: parent.id,
        },
        update: (cache, { data: { createRegion: { errors, region } } }) => {
          if (errors && errors.length > 0) return;
          const { regionList } = cache.readQuery({
            query: REGION_LIST,
            variables: {
              parentId: parent.id,
              level: parent.level + 1,
            },
          })
          cache.writeQuery({
            query: REGION_LIST,
            variables: {
              parentId: parent.id,
              level: parent.level + 1,
            },
            data: {
              regionList: {
                __typename: regionList.__typename,
                edges: [
                  ...regionList.edges,
                  {
                    __typename: 'RegionNodeEdge',
                    node: region,
                  },
                ],
              },
            },
          })
        }
      })
      if (res.data.createRegion.errors && res.data.createRegion.errors.length > 0) {
        throw Error(`Errors were found in the GraphQL response! ${res.data.createRegion.errors}`)
      }
      dispatch('submit', {})
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div>
  <div>
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
      bind:value={$name.value}
      on:blur={name.validate}
      use:style={{field: name}} />
    {#if $name.errors}
      <ul>
        {#if $name.errors.includes('required')}
          <li>This is a required field!</li>
        {/if}
      </ul>
    {/if}
  </div>
  <div>
    <button
      disabled={!$f.valid}
      on:click|preventDefault={handleCreateRegion}
    >
      Create
    </button>
  </div>
</div>

<style>
  ul { margin-top: 0; }
  :global(.invalid) { border: 1px solid red; }
</style>

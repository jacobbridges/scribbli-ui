<script>
  import { createEventDispatcher } from 'svelte'
  import { form, field, style, validators } from '@scribbli-forms'
  import { createMutator } from '@scribbli-client'
  import { STORY_CREATE, STORY_LIST } from '@scribbli-client/queries'
  import { scribbliContext } from '@stores/scribbli-context-store'
  import TextField from '@cp/fields/text.svelte'

  // Component props ----------------------------------------------------------
  export let formData = {}

  // Local variables ----------------------------------------------------------
  const dispatch = createEventDispatcher()
  const name = field('name', formData?.name || '', [validators.required()])
  const blurb = field('blurb', formData?.blurb || null)
  const rules = field('rules', formData?.rules || null)
  const F = form(name, blurb, rules)
  const createStory = createMutator(STORY_CREATE)

  // Event handlers -----------------------------------------------------------
  const handleFormSubmit = async () => {
    await F.validate()
    if (!$F.valid) return

    try {
      const res = await createStory({
        variables: {
          name: $name.value,
          blurb: $blurb.value || undefined,
          rules: $rules.value || undefined,
          universe: $scribbliContext.universeId,
        },
        update: (cache, { data: { createStory: { errors, story } } }) => {
          if (errors && errors.length > 0) return;
          const cachedQuery = cache.readQuery({
            query: STORY_LIST,
            variables: {
              universe: $scribbliContext.universeId,
            }
          })
          if (!cachedQuery) return
          const { storyList } = cachedQuery
          cache.writeQuery({
            query: STORY_LIST,
            variables: {
              universe: $scribbliContext.universeId,
            },
            data: {
              storyList: {
                __typename: storyList.__typename,
                edges: [
                  ...storyList.edges,
                  {
                    __typename: 'StoryNodeEdge',
                    node: story,
                  },
                ],
              },
            },
          })
        }
      })
      if (res.data.createStory.errors && res.data.createStory.errors.length > 0) {
        throw Error(`Errors were found in the GraphQL response! ${res.data.createStory.errors}`)
      }
      dispatch('submit', { slug: res.data.createStory.story.slug })
    } catch(error) {
      console.error(error)
    }
  }
</script>

<div>
  <TextField
    label="Name"
    field={name} />
  <div>
    <button
      disabled={!$F.valid}
      on:click|preventDefault={handleFormSubmit}>
      Create
    </button>
  </div>
</div>

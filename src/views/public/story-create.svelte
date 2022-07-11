<script>
  import { push } from 'svelte-spa-router'
  import { form, field, style, validators } from '@scribbli-forms'
  import { scribbliContext } from '@stores/scribbli-context-store'
  import PublicLayout from '@layouts/public.svelte'
  import StoryCreateForm from '@cp/forms/story-create.svelte'

  let loading = false

  const handleStoryCreate = async (e) => {
    const slug = e?.detail?.slug

    if (slug) {
      push('/story/' + slug)
    } else {
      console.error(e) 
    }
  }
</script>

<PublicLayout>

  <h1>Create Story</h1>

  <section>
    <StoryCreateForm on:submit={handleStoryCreate} />
  </section>

</PublicLayout>

<style>
  :global(.invalid) {
    border: 1px solid red;
  }
</style>

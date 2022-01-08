<script>
  import { createEventDispatcher } from "svelte"
  
  // Props
  export let value

  // Local variables
  const dispatch = createEventDispatcher()

  // Handlers
  const handleCancel = () => {
    dispatch('cancel')
  }
  
  const handleSave = () => {
    dispatch('save', { value })
  }

  // Reactive statements

</script>

<div class="editor">

  <textarea bind:value />

  <div class="action-tray">
    <a href="." on:click|preventDefault={handleCancel}>Cancel</a>
    <a href="." on:click|preventDefault={handleSave}>Save</a>
  </div>
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
  }

  .action-tray {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
  }
</style>

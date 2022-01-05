<script>
  import { Editor } from 'bytemd'

  export let callback
  export let value
  
  const plugins = []

  const handleChange = (e) => {
    callback(e.detail.value)
  }
</script>

<div class="editor">

  <Editor {value} {plugins} on:change={handleChange} />

  <div class="action-tray">
    <a href=".">Cancel</a>
    <a href=".">Save</a>
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
    gap: 0.5rem;
  }
</style>

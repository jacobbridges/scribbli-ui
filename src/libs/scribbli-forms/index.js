export { form, field } from 'svelte-forms'

import { required, email } from 'svelte-forms/validators'
export const validators = {
  required,
  email,
}


export const style = (node, { field: field_, valid='valid', invalid='invalid' }) => {
  const unsub = field_.subscribe(fieldStore => {
    if (fieldStore.errors.length > 0) {
      node.classList.add(invalid)
    } else {
      node.classList.remove(invalid)
    }
  })

  return {
    destroy: () => unsub()
  }
}

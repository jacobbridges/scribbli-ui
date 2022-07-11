export const generateTabs = (config, activeStore) => {
  return config.map(([index, title]) => ({
    title,
    index,
    get load() {
      return () => {
        activeStore.set(index)
      }
    },
  }))
}

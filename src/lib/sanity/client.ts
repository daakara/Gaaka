// Sanity client removed. Lightweight stub to avoid breaking imports.

export const config = {
  projectId: null,
  dataset: null,
}

export const sanityClient = {
  // fetch is a no-op stub returning an empty array by default
  fetch: async (_query: string, _params?: any) => {
    return []
  },
}

export function urlFor(_source: any) {
  return {
    width: () => ({ url: () => '' }),
    url: () => '',
  }
}

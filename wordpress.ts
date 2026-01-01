const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (!API_URL) {
    throw new Error('WORDPRESS_API_URL is not configured')
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllProducts() {
  const data = await fetchAPI(`
    query AllProducts {
      products {
        nodes {
          id
          title
          productFields {
            price
            images {
              mediaItemUrl
            }
          }
        }
      }
    }
  `)
  return data?.products
}

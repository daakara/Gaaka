// GraphQL client for WordPress API using graphql-request
import { GraphQLClient } from 'graphql-request'
import { wpConfig, validateWPConfig } from './config'

// Initialize GraphQL client
function createWPClient(): GraphQLClient | null {
  if (!validateWPConfig()) {
    return null
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Add authentication if token is provided
  if (wpConfig.authToken) {
    headers['Authorization'] = `Bearer ${wpConfig.authToken}`
  }

  return new GraphQLClient(wpConfig.apiUrl, {
    headers,
    // Enable error details in development
    errorPolicy: wpConfig.debug ? 'all' : 'ignore',
  })
}

// Singleton client instance
export const wpClient = createWPClient()

/**
 * Execute a GraphQL query against WordPress
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @returns Query result data
 */
export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T | null> {
  if (!wpClient) {
    console.error('WordPress client not initialized. Check your configuration.')
    return null
  }

  try {
    const data = await wpClient.request<T>(query, variables)
    return data
  } catch (error) {
    if (wpConfig.debug) {
      console.error('GraphQL Error:', error)
    }
    throw error
  }
}

/**
 * Fetch data with error handling and fallback
 * @param query - GraphQL query string
 * @param variables - Query variables
 * @param fallback - Fallback value if request fails
 * @returns Query result or fallback
 */
export async function safeFetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
  fallback: T | null = null
): Promise<T | null> {
  try {
    return await fetchGraphQL<T>(query, variables)
  } catch (error) {
    console.error('Failed to fetch from WordPress:', error)
    return fallback
  }
}

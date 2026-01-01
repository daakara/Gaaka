// WordPress API configuration

export const wpConfig = {
  // GraphQL endpoint (WPGraphQL plugin required)
  apiUrl: process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '',
  
  // WordPress site URL (for constructing URLs)
  siteUrl: process.env.WORDPRESS_SITE_URL || '',
  
  // Authentication token (optional, for preview mode or private content)
  authToken: process.env.WORDPRESS_AUTH_TOKEN || '',
  
  // Revalidation time for ISR (in seconds)
  revalidateTime: parseInt(process.env.REVALIDATE_TIME || '60'),
  
  // Enable debug logging
  debug: process.env.NODE_ENV === 'development',
}

// Validate configuration
export function validateWPConfig() {
  if (!wpConfig.apiUrl) {
    console.warn('⚠️ WordPress API URL not configured. Set WORDPRESS_API_URL in .env.local')
    return false
  }
  return true
}

/**
 * GraphQL queries for dynamic site content
 * Hybrid Approach: WordPress for marketing content, fallbacks for static content
 */

export const GET_SITE_CONTENT = `
  query GetSiteContent($contentType: String!) {
    siteContents(where: { metaQuery: { metaArray: [{ key: "content_type", value: $contentType }] } }, first: 1) {
      nodes {
        id
        title
        content
        siteContentFields {
          contentType
          headline
          subheadline
          ctaText
          ctaLink
          backgroundImage
        }
      }
    }
  }
`;

export const GET_HERO_CONTENT = `
  query GetHeroContent {
    siteContents(where: { metaQuery: { metaArray: [{ key: "content_type", value: "hero" }] } }, first: 1) {
      nodes {
        id
        siteContentFields {
          headline
          subheadline
          ctaText
          ctaLink
          backgroundImage
        }
      }
    }
  }
`;

export const GET_MISSION_CONTENT = `
  query GetMissionContent {
    siteContents(where: { metaQuery: { metaArray: [{ key: "content_type", value: "mission" }] } }, first: 1) {
      nodes {
        id
        title
        content
        siteContentFields {
          headline
          subheadline
        }
      }
    }
  }
`;

export const GET_ARTISAN_STORIES = `
  query GetArtisanStories($first: Int = 10) {
    artisanStories(first: $first) {
      nodes {
        id
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        artisanStoryFields {
          artisanName
          location
          craft
          yearsExperience
          quote
          videoUrl
          relatedProducts {
            ... on Product {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORY_WITH_DESCRIPTION = `
  query GetCategoryWithDescription($slug: String!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      description
      longDescription
      image {
        sourceUrl
        altText
      }
      products {
        nodes {
          id
          name
          slug
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
          }
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export interface SiteContent {
  id: string;
  title?: string;
  content?: string;
  siteContentFields: {
    contentType: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
  };
}

export interface ArtisanStory {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  artisanStoryFields: {
    artisanName: string;
    location?: string;
    craft?: string;
    yearsExperience?: number;
    quote?: string;
    videoUrl?: string;
    relatedProducts?: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
}

export interface CategoryWithDescription {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  products: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
      price?: string;
      regularPrice?: string;
      salePrice?: string;
      image?: {
        sourceUrl: string;
        altText?: string;
      };
    }>;
  };
}

/**
 * Fetch site content with fallback
 */
export async function fetchSiteContent(
  contentType: string,
  fallback: Partial<SiteContent['siteContentFields']>
): Promise<SiteContent['siteContentFields']> {
  try {
    const response = await fetch(process.env.WORDPRESS_API_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_SITE_CONTENT,
        variables: { contentType },
      }),
    });

    const { data } = await response.json();
    const content = data?.siteContents?.nodes?.[0];

    if (content?.siteContentFields) {
      return content.siteContentFields;
    }

    // Return fallback if no WordPress content found
    return { contentType, ...fallback };
  } catch (error) {
    console.warn(`Failed to fetch ${contentType} content, using fallback:`, error);
    return { contentType, ...fallback };
  }
}

/**
 * Fetch artisan stories with error handling
 */
export async function fetchArtisanStories(first: number = 10): Promise<ArtisanStory[]> {
  try {
    const response = await fetch(process.env.WORDPRESS_API_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_ARTISAN_STORIES,
        variables: { first },
      }),
    });

    const { data } = await response.json();
    return data?.artisanStories?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch artisan stories:', error);
    return [];
  }
}

/**
 * Fetch category with long description
 */
export async function fetchCategoryWithDescription(slug: string): Promise<CategoryWithDescription | null> {
  try {
    const response = await fetch(process.env.WORDPRESS_API_URL || '', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_CATEGORY_WITH_DESCRIPTION,
        variables: { slug },
      }),
    });

    const { data } = await response.json();
    return data?.productCategory || null;
  } catch (error) {
    console.error(`Failed to fetch category ${slug}:`, error);
    return null;
  }
}

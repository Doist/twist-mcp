import type { TwistApi } from '../twist-api'
import type { SearchResults } from '../types'

type SearchArgs = {
    readonly query: string
}

/**
 * Factory function to create search-related tools.
 * @param api - The authenticated Twist API client.
 * @returns An object containing functions for performing searches.
 */
export function getTools(api: TwistApi) {
    /**
     * Performs a search across threads, comments, and messages.
     * @param args - The arguments for the search.
     * @param args.query - The search query string.
     * @returns A promise that resolves to the search results.
     */
    function search({ query }: SearchArgs): Promise<SearchResults> {
        console.log(`Performing search for: "${query}"`)
        return api.search(query)
    }

    return {
        search,
    }
}

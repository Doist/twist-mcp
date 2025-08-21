import type { TwistApi } from '../twist-api'
import type { Inbox, InboxStatus, SavedItem } from '../types'

/**
 * Factory function to create inbox-related tools.
 * @param api - The authenticated Twist API client.
 * @returns An object containing functions for interacting with the inbox.
 */
export function getTools(api: TwistApi) {
    /**
     * Retrieves all conversations and threads in your inbox.
     * @returns A promise that resolves to the user's inbox content.
     */
    function getInbox(): Promise<Inbox> {
        console.log("Fetching user's inbox...")
        return api.getInbox()
    }

    /**
     * Fetches the unread status of your inbox.
     * @returns A promise that resolves to the inbox status, including unread count.
     */
    function getInboxStatus(): Promise<InboxStatus> {
        console.log('Fetching inbox status...')
        return api.getInboxStatus()
    }

    /**
     * Gets a list of your saved threads and messages.
     * @returns A promise that resolves to an array of saved items.
     */
    function getSavedItems(): Promise<SavedItem[]> {
        console.log('Fetching saved items...')
        return api.getSavedItems()
    }

    return {
        getInbox,
        getInboxStatus,
        getSavedItems,
    }
}

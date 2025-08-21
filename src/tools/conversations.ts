import type { TwistApi } from '../twist-api'
import type { Conversation } from '../types'

type GetConversationsArgs = {
    readonly workspace_id: number
}

type GetConversationArgs = {
    readonly id: number
}

type GetOrCreateConversationArgs = {
    readonly workspace_id: number
    readonly user_ids: readonly number[]
}

type UpdateConversationArgs = {
    readonly id: number
    readonly title: string | null
}

type ArchiveConversationArgs = {
    readonly id: number
}

type UnarchiveConversationArgs = {
    readonly id: number
}

type MuteConversationArgs = {
    readonly id: number
    readonly minutes: number
}

type UnmuteConversationArgs = {
    readonly id: number
}

export function getTools(api: TwistApi) {
    function getConversations({ workspace_id }: GetConversationsArgs): Promise<Conversation[]> {
        console.log(`Fetching all conversations for workspace ID: ${workspace_id}`)
        return api.getConversations(workspace_id)
    }

    function getConversation({ id }: GetConversationArgs): Promise<Conversation> {
        console.log(`Fetching conversation with ID: ${id}`)
        return api.getConversation(id)
    }

    function getOrCreateConversation({
        workspace_id,
        user_ids,
    }: GetOrCreateConversationArgs): Promise<Conversation> {
        console.log(
            `Getting or creating a conversation in workspace ${workspace_id} with users: ${user_ids.join(
                ', ',
            )}`,
        )
        return api.getOrCreateConversation(workspace_id, user_ids)
    }

    function updateConversation({ id, title }: UpdateConversationArgs): Promise<Conversation> {
        console.log(`Updating conversation ${id} with new title: ${title}`)
        return api.updateConversation(id, title ?? '')
    }

    function archiveConversation({ id }: ArchiveConversationArgs): Promise<void> {
        console.log(`Archiving conversation with ID: ${id}`)
        return api.archiveConversation(id)
    }

    function unarchiveConversation({ id }: UnarchiveConversationArgs): Promise<void> {
        console.log(`Unarchiving conversation with ID: ${id}`)
        return api.unarchiveConversation(id)
    }

    function muteConversation({ id, minutes }: MuteConversationArgs): Promise<Conversation> {
        console.log(`Muting conversation ${id} for ${minutes} minutes`)
        return api.muteConversation(id, minutes)
    }

    function unmuteConversation({ id }: UnmuteConversationArgs): Promise<Conversation> {
        console.log(`Unmuting conversation with ID: ${id}`)
        return api.unmuteConversation(id)
    }

    return {
        getConversations,
        getConversation,
        getOrCreateConversation,
        updateConversation,
        archiveConversation,
        unarchiveConversation,
        muteConversation,
        unmuteConversation,
    }
}

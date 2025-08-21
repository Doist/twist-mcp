/**
 * This file contains all the core TypeScript types for the Twist API.
 * These types are based on the official Twist API v3 documentation.
 * @see https://developer.twist.com/v3/
 */

// #region Utility Types

export type Url = string
export type Email = string
export type DateTimeString = string // ISO 8601 format
export type UnixTimestamp = number
export type HtmlString = string
export type MarkdownString = string

// #endregion

// #region Basic Objects

export type AvatarUrls = {
    readonly s35: Url
    readonly s60: Url
    readonly s195: Url
    readonly s640: Url
}

export type AwayMode = {
    readonly date_from: DateTimeString
    readonly date_to: DateTimeString
    readonly type: 'parental' | 'vacation' | 'sickleave' | 'other'
}

export type Reaction = {
    readonly [emoji: string]: readonly number[]
}

export type ActionButton = {
    readonly action: 'open_url' | 'prefill_message' | 'send_reply'
    readonly button_text: string
    readonly message?: string
    readonly type: 'action'
    readonly url?: Url
}

export type Attachment = {
    readonly attachment_id: string
    readonly title: string
    readonly url: Url
    readonly url_type: 'file' | 'image' | 'audio'
    readonly file_name: string
    readonly file_size: number
    readonly underlying_type: string // MIME type
    readonly image?: Url
    readonly image_height?: number
    readonly image_width?: number
    readonly duration?: string
    readonly upload_state: 'uploaded' | 'failed'
}

// #endregion

// #region Main Objects

export type User = {
    readonly id: number
    readonly name: string
    readonly first_name: string
    readonly short_name: string
    readonly email: Email
    readonly lang: string
    readonly timezone: string
    readonly avatar_id: string | null
    readonly avatar_urls: AvatarUrls
    readonly bot: boolean
    readonly default_workspace: number
    readonly token: string
    readonly away_mode: AwayMode | null
    readonly contact_info: string
    readonly profession: string
    readonly removed: boolean
    readonly restricted: boolean
    readonly setup_pending: boolean
    readonly off_days: readonly number[]
}

export type Workspace = {
    readonly id: number
    readonly name: string
    readonly creator: number
    readonly created_ts: UnixTimestamp
    readonly default_channel: number
    readonly default_conversation: number
    readonly avatar_id: string | null
    readonly avatar_urls: AvatarUrls
    readonly plan: 'free' | 'unlimited'
}

// Inbox

export type Inbox = {
    readonly threads: Thread[]
    readonly messages: Message[]
}

export type InboxStatus = {
    readonly has_unreads: boolean
    readonly unread_count: number
}

export type SavedItem = {
    readonly id: number
    readonly item: Thread | Message
    readonly type: 'thread' | 'message'
}

// Search

export type SearchResults = {
    readonly threads: Thread[]
    readonly comments: Comment[]
    readonly messages: Message[]
}

export type WorkspaceUser = {
    readonly id: number
    readonly name: string
    readonly first_name: string
    readonly short_name: string
    readonly email: Email
    readonly bot: boolean
    readonly removed: boolean
    readonly restricted: boolean
    readonly setup_pending: boolean
    readonly user_type: 'USER' | 'ADMIN' | 'GUEST'
    readonly timezone: string
}

export type Group = {
    readonly id: number
    readonly workspace_id: number
    readonly name: string
    readonly description: string | null
    readonly user_ids: readonly number[]
}

export type Channel = {
    readonly id: number
    readonly workspace_id: number
    readonly creator: number
    readonly created_ts: UnixTimestamp
    readonly name: string
    readonly description: string
    readonly user_ids: readonly number[]
    readonly color: number
    readonly public: boolean
    readonly archived: boolean
    readonly use_default_recipients: boolean
    readonly default_groups: readonly number[]
    readonly default_recipients: readonly number[]
    readonly is_favorited: boolean
    readonly icon: number
}

export type Thread = {
    readonly id: number
    readonly workspace_id: number
    readonly channel_id: number
    readonly creator: number
    readonly posted_ts: UnixTimestamp
    readonly last_updated_ts: UnixTimestamp
    readonly title: string
    readonly content: MarkdownString
    readonly comment_count: number
    readonly participants: readonly number[]
    readonly recipients: readonly number[] | 'EVERYONE'
    readonly groups: readonly number[]
    readonly direct_mentions: readonly number[]
    readonly direct_group_mentions: readonly number[]
    readonly snippet: string
    readonly snippet_creator: number
    readonly attachments: readonly Attachment[]
    readonly actions: readonly ActionButton[]
    readonly reactions: Reaction
    readonly starred: boolean
    readonly pinned: boolean
    readonly pinned_ts: UnixTimestamp | null
    readonly muted_until_ts: UnixTimestamp | null
    readonly is_archived: boolean
    readonly in_inbox: boolean
}

export type Comment = {
    readonly id: number
    readonly thread_id: number
    readonly channel_id: number
    readonly workspace_id: number
    readonly creator: number
    readonly posted_ts: UnixTimestamp
    readonly last_edited_ts: UnixTimestamp | null
    readonly content: MarkdownString
    readonly obj_index: number
    readonly recipients: readonly number[] | 'EVERYONE' | 'EVERYONE_IN_THREAD'
    readonly groups: readonly number[]
    readonly direct_mentions: readonly number[]
    readonly direct_group_mentions: readonly number[]
    readonly attachments: readonly Attachment[]
    readonly actions: readonly ActionButton[]
    readonly reactions: Reaction
    readonly deleted: boolean
    readonly deleted_by: number | null
}

export type Conversation = {
    readonly id: number
    readonly workspace_id: number
    readonly creator: number
    readonly created_ts: UnixTimestamp
    readonly last_active_ts: UnixTimestamp
    readonly title: string | null
    readonly private: boolean
    readonly user_ids: readonly number[]
    readonly message_count: number
    readonly last_obj_index: number
    readonly snippet: string
    readonly last_message: Message | null
    readonly archived: boolean
    readonly muted_until_ts: UnixTimestamp | null
}

export type Message = {
    readonly id: number
    readonly conversation_id: number
    readonly workspace_id: number
    readonly creator: number
    readonly posted_ts: UnixTimestamp
    readonly last_edited_ts: UnixTimestamp | null
    readonly content: MarkdownString
    readonly obj_index: number
    readonly direct_mentions: readonly number[]
    readonly direct_group_mentions: readonly number[]
    readonly attachments: readonly Attachment[]
    readonly actions: readonly ActionButton[]
    readonly reactions: Reaction
    readonly is_deleted: boolean
}

// #endregion

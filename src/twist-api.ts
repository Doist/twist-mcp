import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import type {
	Attachment,
	User,
	Workspace,
	Channel,
	Thread,
	Comment,
	Conversation,
	Message,
	Group,
	Inbox,
	InboxStatus,
	SavedItem,
	SearchResults,
} from './types';

const API_BASE_URL = 'https://api.twist.com/api/v3/';

export class TwistApi {
    private client: AxiosInstance;

    constructor(token: string) {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.client.request<T>(config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Twist API Error:', error.response.data);
                throw new Error(`API Error: ${error.response.status} ${JSON.stringify(error.response.data)}`);
            } else {
                console.error('An unexpected error occurred:', error);
                throw new Error('An unexpected error occurred while communicating with the Twist API.');
            }
        }
    }

    // #region Workspaces
    async getWorkspaces(): Promise<Workspace[]> {
        return this.request<Workspace[]>({ method: 'GET', url: 'workspaces/get' });
    }

    async getWorkspace(id: number): Promise<Workspace> {
        return this.request<Workspace>({ method: 'GET', url: 'workspaces/getone', params: { id } });
    }

    async getDefaultWorkspace(): Promise<Workspace> {
        return this.request<Workspace>({ method: 'GET', url: 'workspaces/get_default' });
    }

    async getPublicChannels(id: number): Promise<Channel[]> {
        return this.request<Channel[]>({ method: 'GET', url: 'workspaces/get_public_channels', params: { id } });
    }

    async getWorkspaceUsers(id: number): Promise<User[]> {
        return this.request<User[]>({ method: 'GET', url: 'v4/workspace_users/get', params: { id } });
    }

    // #endregion

    // #region Channels
    async getChannels(workspace_id: number): Promise<Channel[]> {
        return this.request<Channel[]>({ method: 'GET', url: 'channels/get', params: { workspace_id } });
    }

    async getChannel(id: number): Promise<Channel> {
        return this.request<Channel>({ method: 'GET', url: 'channels/getone', params: { id } });
    }

    async archiveChannel(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'channels/archive', data: { id } });
    }

    async unarchiveChannel(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'channels/unarchive', data: { id } });
    }



    // #endregion

    // #region Threads
    async getThreads(channel_id: number): Promise<Thread[]> {
        return this.request<Thread[]>({ method: 'GET', url: 'threads/get', params: { channel_id } });
    }

    async getThread(id: number): Promise<Thread> {
        return this.request<Thread>({ method: 'GET', url: 'threads/getone', params: { id } });
    }

    async addThread(channel_id: number, title: string, content: string, recipients?: readonly string[] | string): Promise<Thread> {
        return this.request<Thread>({
            method: 'POST',
            url: 'threads/add',
            data: { channel_id, title, content, recipients },
        });
    }

    async updateThread(id: number, title?: string, content?: string): Promise<Thread> {
        return this.request<Thread>({ method: 'POST', url: 'threads/update', data: { id, title, content } });
    }



    async starThread(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'threads/star', data: { id } });
    }

    async unstarThread(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'threads/unstar', data: { id } });
    }

    async pinThread(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'threads/pin', data: { id } });
    }

    async unpinThread(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'threads/unpin', data: { id } });
    }

    async moveThread(id: number, to_channel_id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'threads/move_to_channel', data: { id, to_channel_id } });
    }

    async markThreadAsRead(id: number, obj_index: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'threads/mark_read', data: { id, obj_index } });
    }

    async muteThread(id: number, minutes: number): Promise<Thread> {
        return this.request<Thread>({ method: 'POST', url: 'threads/mute', data: { id, minutes } });
    }

    async unmuteThread(id: number): Promise<Thread> {
        return this.request<Thread>({ method: 'POST', url: 'threads/unmute', data: { id } });
    }
    // #endregion

    // #region Comments
    async getComments(thread_id: number): Promise<Comment[]> {
        return this.request<Comment[]>({ method: 'GET', url: 'comments/get', params: { thread_id } });
    }

    async getComment(id: number): Promise<Comment> {
        return this.request<Comment>({ method: 'GET', url: 'comments/getone', params: { id } });
    }

    async addComment(thread_id: number, content: string, recipients?: readonly string[] | string): Promise<Comment> {
        return this.request<Comment>({
            method: 'POST',
            url: 'comments/add',
            data: { thread_id, content, recipients },
        });
    }

    async updateComment(id: number, content: string): Promise<Comment> {
        return this.request<Comment>({ method: 'POST', url: 'comments/update', data: { id, content } });
    }



    async addReactionToComment(id: number, reaction: string): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'reactions/add', data: { comment_id: id, reaction } });
    }

    // #endregion

    // #region Conversations
    async getConversations(workspace_id: number): Promise<Conversation[]> {
        return this.request<Conversation[]>({ method: 'GET', url: 'conversations/get', params: { workspace_id } });
    }

    async getConversation(id: number): Promise<Conversation> {
        return this.request<Conversation>({ method: 'GET', url: 'conversations/getone', params: { id } });
    }

    async getOrCreateConversation(workspace_id: number, user_ids: readonly number[]): Promise<Conversation> {
        return this.request<Conversation>({ method: 'POST', url: 'conversations/get_or_create', data: { workspace_id, user_ids } });
    }

    async updateConversation(id: number, title: string): Promise<Conversation> {
        return this.request<Conversation>({ method: 'POST', url: 'conversations/update', data: { id, title } });
    }

    async archiveConversation(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'conversations/archive', data: { id } });
    }

    async unarchiveConversation(id: number): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'conversations/unarchive', data: { id } });
    }

    async muteConversation(id: number, minutes: number): Promise<Conversation> {
        return this.request<Conversation>({ method: 'POST', url: 'conversations/mute', data: { id, minutes } });
    }

    async unmuteConversation(id: number): Promise<Conversation> {
        return this.request<Conversation>({ method: 'POST', url: 'conversations/unmute', data: { id } });
    }
    // #endregion

    // #region Conversation Messages
    async getMessages(conversation_id: number): Promise<Message[]> {
        return this.request<Message[]>({ method: 'GET', url: 'conversation_messages/get', params: { conversation_id } });
    }

    async getMessage(id: number): Promise<Message> {
        return this.request<Message>({ method: 'GET', url: 'conversation_messages/getone', params: { id } });
    }

    async addMessage(conversation_id: number, content: string): Promise<Message> {
        return this.request<Message>({
            method: 'POST',
            url: 'conversation_messages/add',
            data: { conversation_id, content },
        });
    }

    async updateMessage(id: number, content: string): Promise<Message> {
        return this.request<Message>({ method: 'POST', url: 'conversation_messages/update', data: { id, content } });
    }



    async addReactionToMessage(id: number, reaction: string): Promise<void> {
        return this.request<void>({ method: 'POST', url: 'reactions/add', data: { message_id: id, reaction } });
    }

    // #endregion

    // #region Users
    async getCurrentUser(): Promise<User> {
        return this.request<User>({ method: 'GET', url: 'users/get_session_user' });
    }


    // #endregion

    // #region Groups
    async getGroups(workspace_id: number): Promise<Group[]> {
        return this.request<Group[]>({ method: 'GET', url: 'groups/get', params: { workspace_id } });
    }

    async getGroup(id: number): Promise<Group> {
        return this.request<Group>({ method: 'GET', url: 'groups/getone', params: { id } });
    }


    	// #endregion

    	// #region Inbox
    	async getInbox(): Promise<Inbox> {
    		return this.request<Inbox>({ method: 'GET', url: 'inbox/get' });
    	}

    	async getInboxStatus(): Promise<InboxStatus> {
    		return this.request<InboxStatus>({ method: 'GET', url: 'inbox/get_status' });
    	}

    	async getSavedItems(): Promise<SavedItem[]> {
    		return this.request<SavedItem[]>({ method: 'GET', url: 'saved_items/get' });
    	}
    	// #endregion

    	// #region Search
    	async search(query: string): Promise<SearchResults> {
    		return this.request<SearchResults>({ method: 'GET', url: 'search/search', params: { query } });
    	}
    	// #endregion

    	// #region Attachments
    	async getAttachment(id: string): Promise<Attachment> {
    		return this.request<Attachment>({ method: 'GET', url: 'attachments/getone', params: { id } });
    	}

    	async uploadFile(filePath: string): Promise<Attachment> {
    		const form = new FormData();
    		form.append('file', fs.createReadStream(filePath));
    		form.append('file_name', path.basename(filePath));

    		return this.request<Attachment>({
    			method: 'POST',
    			url: 'attachments/upload',
    			data: form,
    			headers: {
    				...form.getHeaders(),
    			},
    		});
    	}
    	// #endregion
    }

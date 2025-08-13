import type { TwistApi } from '../twist-api';
import { getTools as getAttachmentsTools } from './attachments';
import { getTools as getChannelsTools } from './channels';
import { getTools as getCommentsTools } from './comments';
import { getTools as getConversationsTools } from './conversations';
import { getTools as getGroupsTools } from './groups';
import { getTools as getInboxTools } from './inbox';
import { getTools as getMessagesTools } from './messages';
import { getTools as getSearchTools } from './search';
import { getTools as getThreadsTools } from './threads';
import { getTools as getUsersTools } from './users';
import { getTools as getWorkspacesTools } from './workspaces';

export function getTools(api: TwistApi) {
    return {
        ...getAttachmentsTools(api),
        ...getChannelsTools(api),
        ...getCommentsTools(api),
        ...getConversationsTools(api),
        		...getGroupsTools(api),
        		...getInboxTools(api),
        		...getMessagesTools(api),
        		...getSearchTools(api),
        		...getThreadsTools(api),
        ...getUsersTools(api),
        ...getWorkspacesTools(api),
    };
}

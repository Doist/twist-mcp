import type { TwistApi } from '../twist-api'
import type { Group } from '../types'

type GetGroupsArgs = {
    readonly workspace_id: number
}

type GetGroupArgs = {
    readonly id: number
}

export function getTools(api: TwistApi) {
    function getGroups({ workspace_id }: GetGroupsArgs): Promise<Group[]> {
        console.log(`Fetching all groups for workspace ID: ${workspace_id}`)
        return api.getGroups(workspace_id)
    }

    function getGroup({ id }: GetGroupArgs): Promise<Group> {
        console.log(`Fetching group with ID: ${id}`)
        return api.getGroup(id)
    }

    return {
        getGroups,
        getGroup,
    }
}

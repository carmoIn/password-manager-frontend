import { AbstractClient } from '@/client/abstract.client'
import { User, UserCollection } from '@/types/user.types'
import { TokenResponse } from '@/types/auth.types'

export class UserClient extends AbstractClient<User, UserCollection> {
    constructor() {
        super('users')
    }

    public login(username: string, password: string): Promise<any> {
        return this.fetchEndpoint('/login', { username, password }, {}, 'POST')
    }
}

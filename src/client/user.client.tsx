import { AbstractClient } from '@/client/abstract.client'
import { User, UserCollection } from '@/types/user.types'
import { TokenResponse } from '@/types/auth.types'

export class UserClient extends AbstractClient<User, UserCollection> {
    constructor() {
        super('users')
    }

    async login(username: string, password: string): Promise<any> {
        try {
            return await this.axiosClient.post('/login', { username, password })
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
}

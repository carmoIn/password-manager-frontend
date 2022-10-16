import { AbstractClient } from '@/client/abstract.client'
import { User, UserCollection } from '@/types/user.types'
import { FormRegister } from '@/types/auth.types'

export class UserClient extends AbstractClient<User, UserCollection> {
    constructor() {
        super('users')
    }

    public login(username: string, password: string): Promise<any> {
        return this.fetchEndpoint('/login', { username, password }, {}, 'POST')
    }

    public register(user: FormRegister): Promise<any> {
        return this.fetchEndpoint('/register', user, {}, 'POST')
    }
}

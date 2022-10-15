import { AbstractClient } from '@/client/abstract.client'
import { Password, PasswordCollection } from '@/types/password.types'

export class PasswordClient extends AbstractClient<Password, PasswordCollection> {
    constructor() {
        super('passwords')
    }
}

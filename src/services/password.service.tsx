import { Password, PasswordCollection } from '@/types/password.types'
import { AbstractService } from '@/services/abstract.service'
import { PasswordClient } from '@/client/password.client'

class PasswordService extends AbstractService<Password, PasswordCollection> {
    constructor() {
        super(new PasswordClient())
    }
}

export default new PasswordService()

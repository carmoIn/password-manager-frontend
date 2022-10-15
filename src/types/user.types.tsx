import { AbstractLinks } from './abstract-links.type'
import { ApiLink } from '@/types/api-link.types'
import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export class User implements AbstractEntity {
    name: string
    email: string
    username: string
    password: string
    _links!: UserLinks
    active: boolean

    constructor() {
        this.name = ''
        this.email = ''
        this.username = ''
        this.password = ''
        this.active = true
    }

    get passwords() {
        return // eventService.getAll(this._links.events)
    }
}

export interface UserCollection extends CollectionResource<User> {
    // Tentei setar dinamicamente jogando uma variavel "nomeRecurso" em AbstractEntity
    // porem tem que ser manual mesmo, foda.
    _embedded: {
        users: User[]
    }
}

interface UserLinks extends AbstractLinks {
    passwords: ApiLink
}

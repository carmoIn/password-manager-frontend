import { AbstractLinks } from './abstract-links.type'
import { ApiLink } from '@/types/api-link.types'
import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export interface IPassword {
    name: string
    site: string
    password: string
}

export class Password implements AbstractEntity {
    name: string
    site: string
    password: string
    _links!: PasswordLinks
    active: boolean

    constructor() {
        this.name = ''
        this.site = ''
        this.password = ''
        this.active = true
    }

    get passwords() {
        return // eventService.getAll(this._links.events)
    }
}

export interface PasswordCollection extends CollectionResource<Password> {
    // Tentei setar dinamicamente jogando uma variavel "nomeRecurso" em AbstractEntity
    // porem tem que ser manual mesmo, foda.
    _embedded: {
        passwords: Password[]
    }
}

interface PasswordLinks extends AbstractLinks {
    user: ApiLink
}

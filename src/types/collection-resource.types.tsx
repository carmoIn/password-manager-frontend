import { AbstractEntity } from '@/types/abstract-entity.types'
import { ApiLink } from '@/types/api-link.types'

export interface CollectionResource<T extends AbstractEntity> {
    _embedded: {
        [key: string]: T[]
    }
    _links: {
        self: ApiLink
        profile: ApiLink
    }
    page: {
        size: number
        totalElements: number
        totalPages: number
        number: number
    }
}

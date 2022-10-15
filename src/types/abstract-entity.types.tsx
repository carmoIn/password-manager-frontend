import { AbstractLinks } from '@/types/abstract-links.type'

export interface AbstractEntity {
    active: boolean
    _links?: AbstractLinks
}

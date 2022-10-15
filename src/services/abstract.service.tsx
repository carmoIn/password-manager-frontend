import { CollectionResource } from '@/types/collection-resource.types'
import { ApiLink } from '@/types/api-link.types'
import { AbstractEntity } from '@/types/abstract-entity.types'
import { AbstractClient } from '@/client/abstract.client'

export abstract class AbstractService<
    T extends AbstractEntity, // Tipo singular do recurso (e.g. User, Event, Lecture)
    U extends CollectionResource<T>, // Tipo coletivo do recurso (e.g. UserCollection, EventCollection)
> {
    client: AbstractClient<T, U>

    protected constructor(client: AbstractClient<T, U>) {
        this.client = client
    }

    async get(from: ApiLink): Promise<T> {
        return await this.client.findEntity(from)
    }

    async getAll(url?: ApiLink): Promise<U> {
        if (!url) {
            return await this.client.list()
        }

        return await this.client.listEntity(url)
    }

    async delete(entity: ApiLink): Promise<void> {
        await this.client.deleteEntity(entity)
    }

    async create(entity: T): Promise<T> {
        return await this.client.createEntity(entity)
    }

    async update(entity: ApiLink, updated: any): Promise<T> {
        return await this.client.updateEntity(entity, updated)
    }
}

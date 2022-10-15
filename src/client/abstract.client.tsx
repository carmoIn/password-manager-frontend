import Cookie from 'universal-cookie'
import UserService from '@/services/user.service'
import axios, { AxiosInstance } from 'axios'
import { ApiLink } from '@/types/api-link.types'
import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export abstract class AbstractClient<
    T extends AbstractEntity, // Tipo singular do recurso (e.g. User, Event, Lecture)
    U extends CollectionResource<T>, // Tipo coletivo do recurso (e.g. UserCollection, EventCollection)
> {
    protected axiosClient: AxiosInstance

    defaultHeader: object = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    protected constructor(endpoint: string) {
        this.axiosClient = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
            headers: this.defaultHeader,
        })
    }

    public async findEntity(entity: ApiLink): Promise<T> {
        return this.get(entity.href)
    }

    public async listEntity(entity: ApiLink): Promise<U> {
        return this.get(entity.href)
    }

    public async deleteEntity(entity: ApiLink): Promise<void> {
        return this.delete(entity.href)
    }

    public async createEntity(entity: T): Promise<T> {
        return this.post('', entity)
    }

    public async updateEntity(entity: ApiLink, updated: T): Promise<T> {
        delete updated['_links']
        return this.put(entity.href, updated)
    }

    public async list(): Promise<U> {
        const headers = {
            ...this.authHeader(),
        }
        return this.fetchEndpoint('', null, headers, 'GET')
    }

    public get(url: string): Promise<any> {
        return this.fetchFromURL(url, null, this.authHeader(), 'GET')
    }

    public post(url: string, data: object): Promise<T> {
        return this.fetchEndpoint(url, data, this.authHeader(), 'POST')
    }

    public delete(url: string): Promise<void> {
        return this.fetchFromURL(url, null, this.authHeader(), 'DELETE')
    }

    public put(url: string, data: T): Promise<T> {
        return this.fetchFromURL(url, data, this.authHeader(), 'PUT')
    }

    private authHeader() {
        // return auth header with jwt if user is logged in and request is to the api url
        const token: string = UserService.getAuthenticatedToken()
        if (token) {
            return { Authorization: `Bearer ${token}` }
        } else {
            return { Authorization: 'None' }
        }
    }

    async fetchFromURL(url: string, data: object | null, headers: any, type: string): Promise<any> {
        return (
            await axios<any>(url, {
                data: JSON.stringify({ ...data }),
                headers: {
                    ...this.defaultHeader,
                    ...headers,
                },
                method: type,
            }).catch(this.handleResponse)
        ).data
    }

    async fetchEndpoint(
        url: string,
        data: object | null,
        headers: any,
        type: string,
    ): Promise<any> {
        console.log(headers)
        return (
            await this.axiosClient<any>(url, {
                data: JSON.stringify({ ...data }),
                headers: {
                    ...headers,
                },
                method: type,
            }).catch(this.handleResponse)
        ).data
    }

    private handleResponse(response) {
        console.log(response)
        const data = response

        if (!response.ok) {
            if ([401, 403].includes(response.status) && UserService.getAuthenticatedToken()) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                UserService.logout()
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    }
}

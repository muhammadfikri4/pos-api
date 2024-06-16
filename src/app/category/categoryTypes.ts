export interface CategoryModelTypes {
    id: string
    name: string,
    createdAt: Date,
    updateAt: Date
}

export interface IFilterCategory {
    name?: string,
    page?: number,
    perPage?: number
}
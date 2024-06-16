export interface ProductModelTypes {
    id: string
    name: string,
    price: number,
    image: string,
    category: {
        id: string,
        name: string
    },
    createdAt?: Date,
    stock: number,
    updateAt?: Date
}

export interface IFilterProduct {
    name?: string,
    page?: number,
    perPage?: number
}
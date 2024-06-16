import { ProductModelTypes } from "./productTypes";

export const getProductMapper = (products: ProductModelTypes[]): ProductModelTypes[] => {
    return products.map((product: ProductModelTypes) => {
        const { id, name, price, category } = product
        return {
            id,
            name,
            price,
            category: {
                id: category.id,
                name: category.name
            }
        }
    })
}
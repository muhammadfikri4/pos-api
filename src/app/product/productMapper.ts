import { ProductModelTypes } from "./productTypes";

export const getProductMapper = (products: ProductModelTypes[]): ProductModelTypes[] => {
    return products.map((product: ProductModelTypes) => {
        const { id, name, price, category, image, stock } = product
        return {
            id,
            name,
            price,
            image,
            category: {
                id: category.id,
                name: category.name
            },
            stock
        }
    })
}
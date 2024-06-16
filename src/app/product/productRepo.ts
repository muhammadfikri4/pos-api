import prisma from "../../config";
import { ProductBodyDTO } from "./productDTO";
import { IFilterProduct } from "./productTypes";

export const getProducts = async ({ name, page, perPage }: IFilterProduct) => {
    return await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)

    })

}
export const getProductsCount = async ({ name }: IFilterProduct) => {
    return await prisma.product.count({
        where: {
            name: {
                contains: name
            }
        }
    })

}

export const getProductByName = async ({ name }: IFilterProduct) => {
    return await prisma.product.findFirst({ where: { name } })
}

export const getProductById = async (id?: string) => {
    return await prisma.product.findUnique({ where: { id } })
}

export const createProduct = async ({ name, price, categoryId, image, stock }: ProductBodyDTO) => {
    return await prisma.product.create({
        data: {
            name: name as string,
            categoryId: categoryId as string,
            image: image as string,
            price: price as number,
            stock: stock as number
        }
    })
}

export const updateProduct = async ({ id, name, categoryId, price, image }: ProductBodyDTO) => {
    return await prisma.product.update({
        where: { id },
        data: {
            name,
            categoryId,
            price,
            image
        }
    })
}

export const deleteProduct = async (id: string) => {
    return await prisma.product.delete({
        where: {
            id
        }
    })
}
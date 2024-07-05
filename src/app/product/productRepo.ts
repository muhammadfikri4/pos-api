import prisma from "../../config";
import { ProductBodyDTO } from "./productDTO";
import { IFilterProduct } from "./productTypes";

export const getProducts = async ({ name, page, perPage, categoryId }: IFilterProduct) => {
    return await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive',
            },
            categoryId
        },
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
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
    return await prisma.product.findUnique({
        where: { id },
        include: {
            category: true
        }
    })
}

export const createProduct = async ({ name, price, categoryId, image, stock }: ProductBodyDTO) => {
    return await prisma.product.create({
        data: {
            name: name as string,
            categoryId: categoryId as string,
            image: image as string,
            price: price as number,
            totalSold: 0,
            stock: stock as number
        }
    })
}

export const updateProduct = async ({ id, name, categoryId, price, image, stock }: ProductBodyDTO) => {
    return await prisma.product.update({
        where: { id },
        data: {
            name,
            categoryId,
            price,
            image,
            stock
        }
    })
}

export const updateProductStock = async (id: string, stock: number) => {
    return await prisma.product.update({
        where: { id },
        data: {
            stock
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
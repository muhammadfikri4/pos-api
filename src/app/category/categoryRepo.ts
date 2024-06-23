import prisma from "../../config";
import { CategoryBodyDTO } from "./categoryDTO";
import { IFilterCategory } from "./categoryTypes";

export const getCategories = async ({ name, page, perPage }: IFilterCategory) => {
    return await prisma.category.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)

    })

}
export const getCategoriesCount = async ({ name }: IFilterCategory) => {
    return await prisma.category.count({
        where: {
            name: {
                contains: name
            }
        }
    })

}

export const getCategoryByName = async ({ name }: IFilterCategory) => {
    return await prisma.category.findFirst({ where: { name } })
}

export const getCategoryById = async (id?: string) => {
    return await prisma.category.findUnique({ where: { id } })
}

export const createCategory = async ({ name }: CategoryBodyDTO) => {
    return await prisma.category.create({
        data: {
            name
        }
    })
}

export const updateCategory = async ({ id, name }: CategoryBodyDTO) => {
    return await prisma.category.update({
        where: { id },
        data: {
            name
        }
    })
}

export const deleteCategory = async (id: string) => {
    return await prisma.category.delete({
        where: {
            id
        }
    })
}

export const getProductsByCategoryId = async (categoryId: string) => {
    return await prisma.product.findMany({
        where: {
            categoryId: categoryId
        }
    });
};
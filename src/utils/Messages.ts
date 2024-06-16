export const MESSAGES = {
    CREATED: {
        USER: "User created successfully",
        CATEGORY: "Category created successfully",
        PRODUCT: "Product created successfully",
    },
    ERROR: {
        NOT_FOUND: {
            USER: "User not found",
            CATEGORY: "Category not found",
            PRODUCT: "Product not found",
        },
        ALREADY: {
            USER: "User is already exists",
            CATEGORY: "Category is already exists",
            PRODUCT: "Product is already exists",
        },
        INVALID: {
            USER: {
                PASSWORD: "Password is wrong",
                PASSWORD_LENGTH: "Password must be at least 8 characters",
                EMAIL: "Email is invalid"
            },
            CATEGORY_ID: "Category ID is invalid",
        },
        UNAUTHORIZED: {
            AUTH: "If you are not logged in, please log in first"
        },
        REQUIRED: {
            EMAIL: "Email is required",
            PASSWORD: "Password is required",
            NAME: "Name is required",
            IMAGE: "Image is required"
        },
        INTERNAL_SERVER: "Internal server error"
    },
    SUCCESS: {
        USER: "User logged in successfully",
        CATEGORY: {
            GET: "Success to fetch category",
            UPDATE: "Success to update category",
            DELETE: "Success to delete category"
        },
        PRODUCT: {
            GET: "Success to fetch product",
            UPDATE: "Success to update product",
            DELETE: "Success to delete product"
        }

    }
}
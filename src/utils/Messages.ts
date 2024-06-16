export const MESSAGES = {
    CREATED: {
        USER: "User created successfully",
        CATEGORY: "Category created successfully"
    },
    ERROR: {
        NOT_FOUND: {
            USER: "User not found",
            CATEGORY: "Category not found"
        },
        ALREADY: {
            USER: "User is already exists",
            CATEGORY: "Category is already exists"
        },
        INVALID: {
            USER: {
                PASSWORD: "Password is wrong",
                PASSWORD_LENGTH: "Password must be at least 8 characters",
                EMAIL: "Email is invalid"
            }
        },
        UNAUTHORIZED: {
            AUTH: "If you are not logged in, please log in first"
        },
        REQUIRED: {
            EMAIL: "Email is required",
            PASSWORD: "Password is required",
            NAME: "Name is required"
        },
        INTERNAL_SERVER: "Internal server error"
    },
    SUCCESS: {
        USER: "User logged in successfully",
        CATEGORY: {
            GET: "Success to fetch categories",
            UPDATE: "Success to update category",
            DELETE: "Success to delete category"
        }

    }
}
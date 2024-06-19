export const MESSAGES = {
    CREATED: {
        USER: "User created successfully",
        CATEGORY: "Category created successfully",
        PRODUCT: "Product created successfully",
        TRANSACTION: "Transaction created successfully",
    },
    ERROR: {
        NOT_FOUND: {
            USER: "User not found",
            CATEGORY: "Category not found",
            PRODUCT: "Product not found",
            TRANSACTION: "Transaction not found",
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
            IMAGE_SIZE: "Image size is too large, max 5mb",
            PRODUCT_ITEM: "There must be at least 1 product item",
            TRANSACTION_ORDER: "Orders cannot exceed the stock amount"
        },
        UNAUTHORIZED: {
            AUTH: "If you are not logged in, please log in first"
        },
        REQUIRED: {
            EMAIL: "Email is required",
            PASSWORD: "Password is required",
            NAME: "Name is required",
            IMAGE: "Image is required",
            STOCK: "Stock is required",
            PRODUCT_ID: "Product ID is required",
            QUANTITY: "Quantity is required",
            PAYMENT_METHOD: "Payment Method is required",
            TOTAL_QUANTITY: "Total Quantity is required",
            TOTAL_AMOUNT: "Total Amount is required",
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
        },
        TRANSACTION: {
            GET: "Success to fetch transaction",
            UPDATE: "Success to update transaction",
            DELETE: "Success to delete transaction",
            PAID: "Success to paid transaction"
        }

    }
}
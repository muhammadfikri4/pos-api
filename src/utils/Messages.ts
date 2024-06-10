export const MESSAGES = {
    CREATED: {
        USER: {
            ACCOUNT: "User created successfully"
        }
    },
    ERROR: {
        NOT_FOUND: {
            USER: {
                ACCOUNT: "User not found",
                EMAIL: "Email is required",
                PASSWORD: "Password is required",
                NAME: "Name is required"
            }
        },
        ALREADY: {
            USER: {
                ACCOUNT: "User already exist"
            }
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
        }
    },
    SUCCESS: {
        USER: "User logged in successfully"
    }
}
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development";
            PORT: string;
            JWT_SECRET: string;
            MONGO_URI: string;
            MESSAGE_BROKER_URL: string;
        }
    }
}

export {}
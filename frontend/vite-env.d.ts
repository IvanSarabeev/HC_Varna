// Import any key variables

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    readonly VITE_DOMAIN_HOST: string;
    readonly VITE_LOCAL_DOMAIN_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
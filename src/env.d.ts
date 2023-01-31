/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URLS: string
  readonly VITE_REACT_APP_API_UR: string
  readonly VITE_REACT_APP_API_MOCKING: string
  readonly VITE_TSC_COMPILE_ON_ERROR: string
  readonly VITE_ESLINT_NO_DEV_ERRORS: string
  readonly VITE_CHOKIDAR_USEPOLLING: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

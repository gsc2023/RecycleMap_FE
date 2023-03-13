declare global {
  interface Window {
    clickPlace: (p: string) => unknown;
  }
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_MAPS_API_KEY: string;
      REACT_APP_BASE_URL: string;
    }
  }
}

export {}

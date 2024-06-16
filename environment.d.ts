declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      NOTION_API: string
      DATABASE_ID: string
    }
  }
}
export {}

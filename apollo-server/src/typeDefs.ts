export interface Utils {
  paginateResults<T>(opts: {
    after?: string | null
    pageSize?: number | null
    results: T[]
    getCursor?: Function
  }): T[]
  createStore(): {}
}
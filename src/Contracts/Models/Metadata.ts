type Metadata<T = any> = {
  meta: {
    total: number
    per_page: number
    current_page: number
    last_page: number
    first_page: number
    first_page_url: string
    last_page_url: string
    next_page_url: string
    previuos_page_url: string
  }
  data: T
}

export default Metadata

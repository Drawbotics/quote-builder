export interface ServiceType {
  id: string | undefined
  name?: string
}


export interface TableRowType {
  phase?: string
  service: ServiceType
  comment?: string
  price: string
}


export interface TableHeaderType {
  phase: string
  service: string
  comment?: string
  price: string
}


export interface FooterRowType {
  label?: string
  comment?: string
  value: string
}


export interface TableType {
  header: TableHeaderType
  body: TableRowType[]
  footers: FooterRowType[]
}

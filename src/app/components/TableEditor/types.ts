export interface TableRowType {
  phase?: string
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
  header: TableRowType
  body: TableRowType[]
  footers: FooterRowType[]
}

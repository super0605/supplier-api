export interface SupplierType {
  name: string;
  logo: string;
  address: string;
}

export interface SupplierResultType {
  suggestions: SupplierType[];
}

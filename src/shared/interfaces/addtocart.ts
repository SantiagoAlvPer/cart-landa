export interface AddTocartInput {
  userId: string;
  products: { uuid: string }[];
  total: number;
}

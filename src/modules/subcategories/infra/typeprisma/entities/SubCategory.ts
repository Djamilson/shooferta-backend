import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import { Exclude } from 'class-transformer';
class SubCategory {
  id: string;
  name: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  products: Product[];
}

export { SubCategory };

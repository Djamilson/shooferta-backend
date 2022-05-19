import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import { Exclude } from 'class-transformer';

class Description {
  id: string;

  description: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  products?: Product[];
}

export { Description };

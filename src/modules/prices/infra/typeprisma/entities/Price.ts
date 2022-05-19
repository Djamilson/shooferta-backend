import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import User from '@modules/users/infra/typeprisma/entities/User';
import { Exclude } from 'class-transformer';

class Price {
  id: string;
  price: number;
  price_promotion: number;
  product: Product;
  product_id: string;
  user: User;
  user_id: string;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
}

export { Price };

import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import User from '@modules/users/infra/typeprisma/entities/User';
import { Exclude } from 'class-transformer';

class ProductInfo {
  id: string;
  stock: number;
  price: number;
  price_promotion: number;
  product_id: string;
  user_id: string;
  link: string;
  freight: number;
  company: string;
  currency: number;

  user: User;
  product: Product;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export { ProductInfo };

import { Category } from '@modules/categories/infra/typeprisma/entities/Category';
import { Exclude } from 'class-transformer';
import { Product } from './Product';

class CategoryProduct {
  category: Category;
  product: Product;
  category_id: string;
  product_id: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export { CategoryProduct };

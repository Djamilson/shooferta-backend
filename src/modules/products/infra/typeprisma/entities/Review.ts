import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import { Exclude } from 'class-transformer';
import { ReviewsStatusEnum } from '../../../../../../prisma/generated/postgres';

class Review {
  id: string;

  comment: string;
  status: ReviewsStatusEnum;
  product_id: string;
  product: Product;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
}

export { Review };

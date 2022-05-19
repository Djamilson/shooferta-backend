import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import { ReviewsStatusEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { Exclude } from 'class-transformer';

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

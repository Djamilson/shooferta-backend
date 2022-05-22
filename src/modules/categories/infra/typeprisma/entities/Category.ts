import uploadConfig from '@config/upload';
import { CategoryProduct } from '@modules/products/infra/typeprisma/entities/CategoryProduct';
import { Exclude, Expose } from 'class-transformer';
import { TypeCategoryEnum } from '../../../../../../prisma/generated/postgres';

class Category {
  id: string;
  name: string;
  description: string;
  type: TypeCategoryEnum;
  slug: string;
  created_at?: Date;
  products?: CategoryProduct[];
  photo?: string;

  @Exclude()
  updated_at?: Date;

  @Expose({ name: 'photo_url' })
  getAvatarUrl(): string | null {
    if (!this.photo) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL_BACKEND}:${process.env.API_PORT}/files/${this.photo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.photo}`;
      default:
        return null;
    }
  }
}

export { Category };

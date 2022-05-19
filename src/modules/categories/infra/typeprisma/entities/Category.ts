import uploadConfig from '@config/upload';
import { CategoryProduct } from '@modules/products/infra/typeprisma/entities/CategoryProduct';
import { TypeCategoryEnum } from '@shared/infra/prisma/postgres/generated/postgres';
import { Exclude, Expose } from 'class-transformer';

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
        return `${process.env.APP_URL_BACKEND}/files/${this.photo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.photo}`;
      default:
        return null;
    }
  }
}

export { Category };

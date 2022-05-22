import uploadConfig from '@config/upload';
import { Product } from '@modules/products/infra/typeprisma/entities/Product';
import { Exclude, Expose } from 'class-transformer';

class Photo {
  id: string;

  name: string;

  priority: number;

  product_id: string;
  product: Product;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  @Expose({ name: 'photo_url' })
  getPhotoUrl(): string | null {
    if (!this.name) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL_BACKEND}:${process.env.API_PORT}/files/${this.name}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.name}`;
      default:
        return null;
    }
  }
}

export { Photo };

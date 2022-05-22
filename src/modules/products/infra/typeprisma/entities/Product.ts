import uploadConfig from '@config/upload';
import { OrderProduct } from '@modules/orders/infra/typeprisma/entities/OrderProduct';
import { Price } from '@modules/prices/infra/typeprisma/entities/Price';
import { ProductInfo } from '@modules/productsInfo/infra/typeprisma/entities/ProductInfo';
import { SubCategory } from '@modules/subcategories/infra/typeprisma/entities/SubCategory';
import { Exclude, Expose } from 'class-transformer';
import { CategoryProduct } from './CategoryProduct';
import { Description } from './Description';
import { Photo } from './Photo';
import { Review } from './Review';

class Product {
  id: string;

  sku: string;
  other?: object;
  status_freight: boolean;
  status_product: boolean;
  bar_code?: string;

  photos?: Photo[];
  reviews?: Review[];
  categories?: CategoryProduct[];
  description: Description;

  description_id: string;
  price: Price;

  price_id: string;
  product_info: ProductInfo;

  product_info_id: string;
  subcategory: SubCategory;
  subcategory_id: string;

  order_products?: OrderProduct[];

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
  @Expose({ name: 'total_reviews' })
  getTotalReviews(): number {
    if (this.reviews === undefined) {
      return 0;
    }

    if (this.reviews !== undefined && this.reviews.length < 1) {
      return 0;
    }

    return this.reviews.length;
  }

  @Expose({ name: 'thumbnail_url' })
  getThumbnailUrl(): string | null {
    if (this.photos === undefined) {
      return null;
    }

    if (this.photos !== undefined && this.photos.length < 1) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL_BACKEND}:${process.env.API_PORT}/files/${this.photos[0].name}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.photos[0].name}`;
      default:
        return null;
    }
  }
}

export { Product };

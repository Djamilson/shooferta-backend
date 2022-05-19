import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';

class Banner {
  id: string;
  name: string;
  type: string;
  priority: number;
  status: boolean;
  
  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Expose({ name: 'banner_url' })
  getBannerUrl(): string | null {
    if (!this.name) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL_BACKEND}/files/${this.name}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.name}`;
      default:
        return null;
    }
  }
}

export { Banner };

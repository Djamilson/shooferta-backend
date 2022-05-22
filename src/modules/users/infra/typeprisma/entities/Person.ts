import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import { Address } from './Address';
import { Phone } from './Phone';

class Person {
  id?: string;
  name: string;
  cpf?: string | undefined;
  rg?: string;
  rgss?: string;
  birth_date?: Date;
  email: string;
  status: boolean;
  privacy: boolean;
  avatar?: string;

  phone?: Phone;
  phone_id?: string;

  address?: Address;
  address_id?: string;

  addresses?: Address[];
  phones?: Phone[];

  created_at: Date;
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_URL_BACKEND}:${process.env.API_PORT}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export { Person };

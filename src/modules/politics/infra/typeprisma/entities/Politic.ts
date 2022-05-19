import { Exclude, Expose } from 'class-transformer';

class Politic {

  id: string;
  name: string;
  slug: string;
  description: string;
  reading_time: number;

  @Exclude()
  created_at: Date;
  updated_at: Date;

  @Expose({ name: 'toUpperCase' })
  getToUpperCase(): string {
    return this.name.toUpperCase();
  }
}

export { Politic };

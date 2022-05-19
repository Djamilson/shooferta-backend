import { ObjectID } from 'bson';

class ForgottenCart {
  id: ObjectID;

  user_id: string;
  product_id: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

export { ForgottenCart };

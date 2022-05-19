import { ObjectID } from 'bson';

class PageAccessCounter {
  id: ObjectID;
  metadata: object;
  created_at: Date;
  updated_at: Date;
}

export { PageAccessCounter };

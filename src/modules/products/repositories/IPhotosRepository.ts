import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreatePhotoDTO } from '../dtos/ICreateDTO';
import { Photo } from '../infra/typeprisma/entities/Photo';
interface IPhotosRepository {
  findAllByProductId(productId: string): Promise<Photo[] | null>;

  allPhotos(): Promise<Photo[] | null>;
  findById(id: string): Promise<Photo | null>;

  create(data: ICreatePhotoDTO): Promise<Photo>;
  update({ id, updateData }: IPropsUpdateData): Promise<Photo>;
  delete(id: string): Promise<void>;
}

export { IPhotosRepository };

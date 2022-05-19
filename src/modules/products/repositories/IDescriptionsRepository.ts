import { IPropsUpdateData } from '@modules/__DTOS';
import { ICreateDescriptionDTO } from '../dtos/ICreateDTO';
import ISearchDTO from '../dtos/ISearchDTO';
import ITotalDescriptionsDTO from '../dtos/ITotalDescriptionsDTO';
import { Description } from '../infra/typeprisma/entities/Description';

interface IDescriptionsRepository {
  allDescription(
    date: Omit<ISearchDTO, 'status'>,
  ): Promise<ITotalDescriptionsDTO>;

  findById(id: string): Promise<Description | null>;
  findByDescription(description: string): Promise<Description | null>;

  create(data: ICreateDescriptionDTO): Promise<Description>;
  update({ id, updateData }: IPropsUpdateData): Promise<Description>;
  delete(id: string): Promise<void>;
}

export { IDescriptionsRepository };

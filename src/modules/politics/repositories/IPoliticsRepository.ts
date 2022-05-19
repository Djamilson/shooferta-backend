import { IDataPageDTO, IPropsUpdateData } from '@modules/__DTOS';
import { ICreatePoliticDTO } from '../dtos/ICreatePoliticDTO';
import { Politic } from '../infra/typeprisma/entities/Politic';

export type ITotalPoliticsDTO = {
  result: Politic[];
  total: number;
};

interface IPoliticsRepository {
  findByName(name: string): Promise<Politic | null>;
  allPolitics(): Promise<Politic[] | null>;
  findById(id: string): Promise<Politic | null>;
  create(data: ICreatePoliticDTO): Promise<Politic>;
  update({ id, updateData }: IPropsUpdateData): Promise<Politic>;

  allPoliticsPagination(data: IDataPageDTO): Promise<ITotalPoliticsDTO>;
}

export { IPoliticsRepository };

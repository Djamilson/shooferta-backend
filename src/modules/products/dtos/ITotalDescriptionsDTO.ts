import { Description } from '../infra/typeprisma/entities/Description';

export default interface ITotalDescriptionsDTO {
  result: Description[];
  total: number;
}

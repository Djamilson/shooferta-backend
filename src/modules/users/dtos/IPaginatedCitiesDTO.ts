import City from '../infra/typeprisma/entities/City';

export default interface IPaginatedCitiesDTO {
  data: City[];
  page: number;
  limit: number;
  totalCount: number;
}

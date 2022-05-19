import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPricesRepository from '../repositories/IPricesRepository';
import { Price } from '../infra/typeprisma/entities/Price';
interface IRequest {
  price_id: string;
  price: number;
}
@injectable()
class UpdatePricesService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,
  ) {}

  public async execute({ price_id, price }: IRequest): Promise<Price> {
    const newPrice = await this.pricesRepository.findById(price_id);

    if (!newPrice) {
      throw new AppError(' Not exist price.', 401);
    }

    return this.pricesRepository.update({
      id: price_id, updateData: {
      price
    }});
  }
}

export default UpdatePricesService;

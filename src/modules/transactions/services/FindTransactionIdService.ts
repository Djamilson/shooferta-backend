import { inject, injectable } from 'tsyringe';
import { Transaction } from '../infra/typeprisma/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindTransactionIdService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Transaction | null> {
    const transaction = await this.transactionsRepository.findById(id);

    return transaction;
  }
}

export default FindTransactionIdService;

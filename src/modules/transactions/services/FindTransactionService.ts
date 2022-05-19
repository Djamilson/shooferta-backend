import { inject, injectable } from 'tsyringe';
import { Transaction } from '../infra/typeprisma/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  order_id: string;
}

@injectable()
class FindTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<Transaction | null> {
    const transaction = await this.transactionsRepository.findByOrderId(
      order_id,
    );

    console.log('===>>', transaction);
    return transaction;
  }
}

export default FindTransactionService;

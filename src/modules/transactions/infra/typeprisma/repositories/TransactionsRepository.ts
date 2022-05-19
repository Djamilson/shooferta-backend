import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Transaction } from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findByOrderId(order_id: string): Promise<Transaction | null> {
    const transaction = await this.prismaRepository.transaction.findFirst({
      where: { order_id },
    });
    return transaction as unknown as Transaction;
  }

  public async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prismaRepository.transaction.findUnique({
      where: { id },
    });
    return transaction as unknown as Transaction;
  }

  public async allTransactions(): Promise<Transaction[] | null> {
    const transactions = await this.prismaRepository.transaction.findMany({});
    return transactions as unknown as Transaction[];
  }

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    return this.prismaRepository.transaction.create({
      data,
    }) as unknown as Transaction;
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<Transaction> {
    const transaction = await this.prismaRepository.transaction.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return transaction as unknown as Transaction;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaRepository.transaction.delete({
      where: {
        id,
      },
    });
  }
}

export default TransactionsRepository;

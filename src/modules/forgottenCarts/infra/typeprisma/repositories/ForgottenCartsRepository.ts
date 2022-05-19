import ICreateForgottenCartDTO from '@modules/forgottenCarts/dtos/ICreateForgottenCartDTO';
import IForgottenCartsRepository, {
  IUserIdByProductId
} from '@modules/forgottenCarts/repositories/IForgottenCartsRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { mongodb } from '@shared/infra/prisma/lib/prismaClient';
import { ObjectId } from 'bson';
import { ForgottenCart } from '../schemas/ForgottenCart';

class ForgottenCartsRepository implements IForgottenCartsRepository {
  private prismaRepository = mongodb;

  constructor() {
    this.prismaRepository;
  }

  public async findById(id: string): Promise<ForgottenCart | null> {
    const forgottenCart = await this.prismaRepository.forgottenCart.findUnique({
      where: { id },
      select: {
        id: true,
        created_at: true,
        product_id: true,
        user_id: true,
        amount: true,
        updated_at: true,
      },
    });
    return forgottenCart as unknown as ForgottenCart;
  }

  public async findByUserIdByProductId({
    user_id,
    product_id,
  }: IUserIdByProductId): Promise<ForgottenCart | null> {

    console.log('user_id product_id', user_id, product_id);
    
    const forgottenCart = await this.prismaRepository.forgottenCart.findFirst({
      where: { user_id, product_id },
      select: {
        id: true,
        created_at: true,
        product_id: true,
        user_id: true,
        amount: true,
        updated_at: true,
      },
    });
    return forgottenCart as unknown as ForgottenCart;
  }
  public async allForgottenCarts(
    user_id: string,
  ): Promise<ForgottenCart[] | null> {
    const forgottenCarts = await this.prismaRepository.forgottenCart.findMany({
      where: { user_id },
      select: {
        id: true,
        created_at: true,
        product_id: true,
        user_id: true,
        amount: true,
        updated_at: true,
      },
    });
    return forgottenCarts as unknown as ForgottenCart[];
  }

  public async create(data: ICreateForgottenCartDTO): Promise<ForgottenCart> {
   console.log('vou criar', data);

    return this.prismaRepository.forgottenCart.create({
      data,
    }) as unknown as ForgottenCart;
  }

  public async update({
    id,
    updateData,
  }: IPropsUpdateData): Promise<ForgottenCart> {
    const forgottenCart = await this.prismaRepository.forgottenCart.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return forgottenCart as unknown as ForgottenCart;
  }

  public async delete(id: ObjectId): Promise<ForgottenCart> {
    const forgottenCart = await this.prismaRepository.forgottenCart.delete({
      where: {
        id: String(id),
      },
    });
    return forgottenCart as unknown as ForgottenCart;
  }

  public async deleteAll(ids: string[]): Promise<void> {
    //db.collection.deleteMany({_id: { $in: objects}});

    await this.prismaRepository.forgottenCart.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export default ForgottenCartsRepository;

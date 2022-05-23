import { Address } from '@modules/users/infra/typeprisma/entities/Address';
import { Phone } from '@modules/users/infra/typeprisma/entities/Phone';
import AppError from '@shared/errors/AppError';
import { format } from 'date-fns';
import pagarme from 'pagarme';
import { injectable } from 'tsyringe';

type IProductSerealizablePagarme = {
  id: string;
  tangible: boolean;
  title: string;
  quantity: number;
  unit_price: number;
};

interface IRequest {
  user_id: string;
  fee: number;
  card_hash: string;
  installments: string;
  total: number;
  order_id: string;
  products: IProductSerealizablePagarme[];

  userExists: {
    id: string;
    person: {
      name: string;
      email: string;
      cpf: string;
      rg: string;
      birth_date: Date;
      phone?: Phone;
      address?: Address;
    };
  };
}

interface IPagarme {
  transaction_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  authorized_amount: string;
  tid: string;
}

@injectable()
class CreatePagarmeCardService {
  constructor() {}

  public async execute({
    order_id,
    fee,
    card_hash,
    userExists,
    products: items,
    total,
  }: IRequest): Promise<IPagarme> {
    try {
      console.log(
        'Passo 01',
        JSON.stringify(
          {
            order_id,
            fee,
            card_hash,
            userExists,
            products: items,
            total,
          },
          null,
          2,
        ),
      );

      const client = await pagarme.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });

      console.log('Passo 01 client', JSON.stringify(client, null, 2));

      const customer = {
        external_id: userExists.id,
        name: userExists.person.name,
        email: userExists.person.email,
        type: 'individual',
        country: 'br',

        documents: [
          {
            type: 'cpf',
            number: String(userExists.person.cpf),
          },
        ],
        phone_numbers: [`+55${userExists.person.phone?.phone}`],
        birthday: format(userExists.person?.birth_date, 'yyyy-MM-dd'),
      };
      console.log('customer', JSON.stringify(customer, null, 2));

      const meAddress = {
        country: 'br',
        state: String(userExists.person.address?.state),
        city: String(userExists.person.address?.city),
        neighborhood: userExists.person.address?.neighborhood,
        street: String(userExists.person.address?.street),
        complementary: String(userExists.person.address?.complement),
        street_number: String(userExists.person.address?.number),
        zipcode: String(userExists.person.address?.zip_code),
      };
      console.log('customer', JSON.stringify(meAddress, null, 2));

      const tte = {
        api_key: process.env.PAGARME_API_KEY,
        card_hash,
        amount: parseInt(String(total).replace('.', ''), 10),
        postback_url:
          'http://860dbc2385e9.ngrok.io/transactions/card/postbacks',
        metadata: {
          idOrder: order_id,
        },
        antifraud_metadata: {},
        capture: true,
        // Vamos executar a chamada assíncrona
        async: true,

        customer,
        billing: {
          name: userExists.person.name,
          address: meAddress,
        },
        shipping: {
          name: userExists.person.name,
          fee,
          expedited: true,
          address: meAddress,
        },

        items,
      };
      console.log('tte tte', JSON.stringify(tte, null, 2));

      const pagarmeTransaction = await client.transactions.create(tte);
      console.log('Passoou', JSON.stringify(pagarmeTransaction, null, 2));

      const {
        id: transaction_id,
        status,
        authorization_code,
        card_brand: brand,
        authorized_amount,
        tid,
      } = pagarmeTransaction;

      return {
        transaction_id: String(transaction_id),
        status,
        authorization_code,
        brand,
        authorized_amount: String(authorized_amount),
        tid,
      };
    } catch (erro: any) {
      console.log('Err 01', erro.errors);

      throw new AppError('Erro pagarme 01');
    }
  }
}

export default CreatePagarmeCardService;

import AppError from '@shared/errors/AppError';
import { injectable } from 'tsyringe';
//import { configurations, payment } from 'mercadopago';

var mercadopago = require('mercadopago');

interface IProduct {
  name: string;
  subtotal: number;
  product_id: string;
  quantity: number;
  price: number;
}

interface IRequest {
  installments: number;
  transaction_amount: number;
  token: string;
  payment_method_id: string;
  email: string;
}

interface IMercadoPago {
  transaction_id: string;
  status: string;
  authorization_code: string;
  brand: string;
  authorized_amount: string;
  tid: string;
}

@injectable()
class CreatePaymentService {
  constructor() {}

  public async execute({
    transaction_amount,
    token,
    installments,
    payment_method_id,
    email,
  }: IRequest): Promise<IMercadoPago | {} | string> {
    try {
     

      //console.log(mercadopago);

      const p = {
        token,
        description: 'Payment for product',
        external_reference: 'MP0001',
        installments: 1,
        payment_method_id: 'visa',
        transaction_amount: 58.8,
        payer: {
          entity_type: 'individual',
          type: 'customer',
          email,
        },
        additional_info: {
          items: [
            {
              id: 'PR0001',
              title: 'Point Mini',
              description:
                'Producto Point para cobros con tarjetas mediante bluetooth',
              picture_url:
                'https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png',
              category_id: 'electronics',
              quantity: 1,
              unit_price: 58.8,
            },
          ],
          shipments: {
            receiver_address: {
              zip_code: '12312-123',
              state_name: 'Rio de Janeiro',
              city_name: 'Buzios',
              street_name: 'Av das Nacoes Unidas',
              street_number: 3003,
            },
          },

          payer: {
            first_name: 'Test',
            last_name: 'Test',
            phone: {
              area_code: '11',
              number: '987654321',
            },
            address: {
              zip_code: '12312-123',
              street_name: 'Av das Nacoes Unidas',
              street_number: 3003,
            },
          },
        },
      };

      //console.log('Papai:', p);

      //const s = await mercadopago.payment_methods.listAll();
      //console.log(s);

      /*const e = await mercadopago.payment.save(p);
      mercadopago.payment
        .save(p)
        .then(function (resp: any) {
          const { status, status_detail, id } = resp.body;
        })
        .catch(function (error: any) {
          console.error(error);
        });*/

      return 'Stou fazendo teste';
    } catch (err: any) {
      console.log('Erro ao tenta fazer o pagamento:', err);
      throw new AppError('Address does not exist.');
    }

    /*
    const mercadoPagoTransaction = await client.transactions.create({
      api_key: process.env.MercadoPago_API_KEY,
      capture: 'false',
      amount: parseInt(String(total * 100), 10),
      card_hash,
      customer: {
        external_id: userExists.id,
        name: userExists.person.name,
        email: userExists.person.email,
        type: 'individual',
        country: 'br',
        documents: [
          {
            type: 'cpf',
            number: userExists.person.cpf,
          },
          {
            type: 'rg',
            number: userExists.person.rg,
          },
        ],
        phone_numbers: [`+55${newPhone}`],
        birthday: format(userExists.person.birth_date, 'yyyy-MM-dd'),
      },
      billing: {
        name: userExists.person.name,
        address: {
          country: 'br',
          state: address?.city.state.name,
          city: address?.city.name,
          neighborhood: address?.neighborhood,
          street: address?.street,
          street_number: `${address?.number}`.replace(/([^0-9])/g, ''),
          zipcode: `${address?.zip_code}`.replace(/([^0-9])/g, ''),
        },
      },
      shipping: {
        name: userExists.person.name,
        freight,
        expedited: true,
        address: {
          country: 'br',
          state: address?.city.state.name,
          city: address?.city.name,
          neighborhood: address?.neighborhood,
          street: address?.street,
          street_number: `${address?.number}`.replace(/([^0-9])/g, ''),
          zipcode: `${address?.zip_code}`.replace(/([^0-9])/g, ''),
        },
      },
      items: serializadProducts.map((item: any) => ({
        id: String(item.product_id),
        title: item.name,
        unit_price: parseInt(String(item.price * 100), 10),
        quantity: item.quantity,
        tangible: true,
      })),
    });

    const {
      id: transaction_id,
      status,
      authorization_code,
      card_brand: brand,
      authorized_amount,
      tid,
    } = mercadoPagoTransaction;
*/
  }
}

export default CreatePaymentService;

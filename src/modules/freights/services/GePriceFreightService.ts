import { injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { calcularPrecoPrazo } from 'correios-brasil';
type IProps = {
  zipCode: string;
};

@injectable()
class GePriceFreightService {
  constructor() {}

  async execute({ zipCode }: IProps): Promise<any> {
    try {
      let args = {
        // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
        sCepOrigem: '21770200',
        sCepDestino: zipCode,
        nVlPeso: '1',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '20',
        nVlLargura: '20',
        nCdServico: ['04014', '04510'], //Array com os códigos de serviço
        nVlDiametro: '0',
      };

      const data = await calcularPrecoPrazo(args);

      /*const dataMaxEntrega = await frete()
        .cepOrigem(zipCode)
        .cepDestino('69905820')
        .servico(frete.servicos.sedex)
        .prazo('13466321');

      const price = await frete()
        .cepOrigem(zipCode)
        .cepDestino('69905820')
        .peso(1)
        .formato(frete.formatos.caixaPacote)
        .comprimento(16)
        .altura(2)
        .largura(11)
        .diametro(1)
        .maoPropria('N')
        .valorDeclarado(50)
        .avisoRecebimento('S')
        .servico(frete.servicos.sedex)
        .preco('13466321');*/

      return data;
    } catch (err: any) {
      console.log('carai::::', err);
      throw new AppError('erro no upload the photo.', 401);
    }
  }
}

export { GePriceFreightService };

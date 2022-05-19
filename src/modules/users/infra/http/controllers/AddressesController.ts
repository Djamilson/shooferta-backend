import CreateAddressService from '@modules/users/services/CreateAddressService';
import DeleteAddressService from '@modules/users/services/DeleteAddressService';
import FindAddressService from '@modules/users/services/FindAddressService';
import ListAddressesService from '@modules/users/services/ListAddressesService';
import UpdateAddressService from '@modules/users/services/UpdateAddressService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AddressesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { addressId } = req.params;

    const findAddress = container.resolve(FindAddressService);

    const addresses = await findAddress.execute({ id: addressId });

    return res.json(instanceToPlain(addresses));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const listAddresses = container.resolve(ListAddressesService);

      const addresses = await listAddresses.execute(user_id);

      return res.json(instanceToPlain(addresses));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.user.id;

      const {
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        city,
        state,
      } = req.body;

      const createAddress = container.resolve(CreateAddressService);

      const address = await createAddress.execute({
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        user_id,
        city,
        state,
      });
      return res.json(instanceToPlain(address));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const {
        id,
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        city,
        state,
        person_id,
      } = req.body;

      const updateAddressService = container.resolve(UpdateAddressService);

      const address = await updateAddressService.execute({
        id,
        number,
        street,
        complement,
        zip_code,
        neighborhood,
        city,
        state,
        person_id,
      });
      return res.json(instanceToPlain(address));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { addressId } = request.params;

    const addressesService = container.resolve(DeleteAddressService);
    await addressesService.execute({
      idAddress: addressId,
    });

    return response.status(204).json({ success: true });
  }
}

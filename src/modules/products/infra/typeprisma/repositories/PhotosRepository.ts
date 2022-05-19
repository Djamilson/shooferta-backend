import { ICreatePhotoDTO } from '@modules/products/dtos/ICreateDTO';
import { IPhotosRepository } from '@modules/products/repositories/IPhotosRepository';
import { IPropsUpdateData } from '@modules/__DTOS';
import { postgres } from '@shared/infra/prisma/lib/prismaClient';
import { Photo } from '../entities/Photo';

class PhotosRepository implements IPhotosRepository {
  private prismaRepository = postgres;

  constructor() {
    this.prismaRepository;
  }

  public async findAllByProductId(productId: string): Promise<Photo[] | null> {
    const photos = await this.prismaRepository.photo.findMany({
      where: { product_id: productId },
    });
    return photos as unknown as Photo[];
  }

  public async findById(id: string): Promise<Photo | null> {
    const photo = await this.prismaRepository.photo.findUnique({
      where: { id },
    });
    return photo as unknown as Photo;
  }

  public async allPhotos(): Promise<Photo[] | null> {
    const photos = await this.prismaRepository.photo.findMany({});
    return photos as unknown as Photo[];
  }

  public async create(data: ICreatePhotoDTO): Promise<Photo> {
    return this.prismaRepository.photo.create({
      data,
    }) as unknown as Photo;
  }

  public async update({ id, updateData }: IPropsUpdateData): Promise<Photo> {
    const photo = await this.prismaRepository.photo.update({
      where: {
        id: String(id),
      },
      data: updateData,
    });
    return photo as unknown as Photo;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaRepository.photo.delete({
      where: {
        id,
      },
    });

    return;
  }
}

export { PhotosRepository };

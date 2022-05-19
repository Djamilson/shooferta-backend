import uploadConfig from '@config/upload';
import { container } from 'tsyringe';
import DiskStoreageProvider from './implementations/DiskStoreageProvider';
import S3StoreageProvider from './implementations/S3StoreageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStoreageProvider,
  s3: S3StoreageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);

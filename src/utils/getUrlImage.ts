import uploadConfig from '@config/upload';

export function getUrlImage(name: string) {
  const url: { [name: string]: string } = {
    disk: `${process.env.APP_URL_BACKEND}/files/${name}`,
    s3: `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${name}`,
  };

  const urlImage: string | null = url[uploadConfig.driver] || null;

  return urlImage;
}

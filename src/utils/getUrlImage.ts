import uploadConfig from '@config/upload';

function getUrlImage(name: string) {
  const url: { [name: string]: string } = {
    disk: `${process.env.APP_URL_BACKEND}:${process.env.API_PORT}/files/${name}`,
    s3: `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${name}`,
  };

  const urlImage: string | null = url[uploadConfig.driver] || null;

  return urlImage;
}

export { getUrlImage };

import { Banner } from "@prisma/client";

export default interface ITotalBannersDTO {
  result: Banner[];
  total: number;
}

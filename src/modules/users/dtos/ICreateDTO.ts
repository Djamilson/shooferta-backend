type ICreatePersonDTO = {
  name: string;
  email: string;
  cpf?: string | undefined;
  rg?: string;
  rgss?: string;
};

type IGroupsIds = {
  group_id: string;
};

type ICreateUserDTO = {
  person: ICreatePersonDTO;
  password: string;
  usersGroups: IGroupsIds[];
};

type ICreatePhoneDTO = {
  phone: string;
  person_id: string;
};

type ICreateAddressDTO = {
  number: number;
  street: string;
  complement: string | null | undefined;
  zip_code: string;
  neighborhood: string;
  person_id: string;
  city: string;
  state: string;
};

type ICreatePersonAndPhoneAndAddressDTO = {
  user: ICreateUserDTO;
  phone: string;
  address: ICreateAddressDTO;
};

type ICreateForgotTokenDTO = {
  user_id: string;
  token: string;
  code: string;
  expires_date: Date;
};

type ICreateUserGroupDTO = {
  user_id: string;
  group_id: string;
};

type ICreateUserReflexTokenDTO = {
  user_id: string;
  expires_date: Date;
  reflesh_token: string;
};

export type {
  ICreatePersonAndPhoneAndAddressDTO,
  ICreateForgotTokenDTO,
  ICreateUserGroupDTO,
  ICreateUserReflexTokenDTO,
  ICreateUserDTO,
  ICreatePersonDTO,
  IGroupsIds,
  ICreatePhoneDTO,
  ICreateAddressDTO,
};

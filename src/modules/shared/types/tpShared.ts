export type tpSessionUser = {
  id: string,
  email: string,
  type: string,
}

export type tpRegisterRequest = {
  companyName: string;
  workAs: string;
  email: string;
  password: string;
}

export type tpUserStatus = {
  id: string,
  status: string
}

export type tpCompanyList = {
  id: string,
  cdId: string,
  cdName: string,
  ePriType: string,
  eStatus: string,
  eEmail: string,
  pPhone: string,
  cName: string,
  aCityId: string,
  aCountryId: string,
  aAddressLine1: string,
  aAddressLine2: string | null,
  aZip: number,
  countryName: string
}

export type tpVerifyEmailRequest = {
  emailToken: string,
}

export type tpCategories = {
  cUuid: string,
  cName: string
}

export type tpCatalogues = {
  ctUuid: string,
  cName: string,
  entityId: string,
}

export type tpProducts = {
  pUuid: string,
  pCategoryId: string,
  pName: string,
  pPrice: string,
  pDescription: string,
  pImages: Express.Multer.File[],
  pUserId: string,
}

export type tpProductCatalog = {
  pcUuid: string,
  pcCatalogId: string,
  pcProductId: string,
}

export type tpUser = {
  id: string,
  email: string,
  type: string,
  redirect: string,
}

export type tpLoginUser = {
  email: string,
  password: string,
}

export const TypeList = [
  "image",
  "loginBackgroundImage",
] as const;
export type TypeType = typeof TypeList[number];

export const ExtensionTypeList = [
  ".jpg",
  ".jpeg",
  ".png",
  ".JPG",
  ".JPEG",
  ".PNG",
] as const;
export type ExtensionType = typeof ExtensionTypeList[number];

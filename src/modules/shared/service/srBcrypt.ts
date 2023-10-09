import bcrypt from "bcryptjs";

const Salt = 12;

export const srBcryptHash = async (value: string): Promise<string> => bcrypt.hash(value, Salt);

export const srBcryptCompare = async (
  value1: string,
  value2: string,
): Promise<boolean> => bcrypt.compare(value1, value2);

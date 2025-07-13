export type UserCreateParams = {
  email: string;
  encryptedPassword: string | null | undefined;
  id: string;
  createdAt: Date;
};

export type ProjectCreateParams = {
  name: string;
  description: string | null | undefined;
  imageUrl: string | null | undefined;
  id: string;
  createdAt: Date;
};

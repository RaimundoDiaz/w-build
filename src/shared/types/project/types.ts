export type ProjectCreateParams = {
  id: string;
  createdAt: Date;
  name: string;
  description: string | null | undefined;
  imageUrl: string | null | undefined;
  location: string;
  targetAmount: number;
  currentAmount: number;
  minInvestment: number;
  expectedReturn: string;
  investors: number;
  status: string;
};

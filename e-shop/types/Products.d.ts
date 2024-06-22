export type TProduct = {
  id?: number;
  title: string;
  description: string;
  max: number;
  quantity?: number;
  image: string | any;
  price: number;
  isLiked?: boolean;
};

export type Product = {
  id: string;
  created_at?: string;

  name: string;
  slug: string;

  description?: string;
  category?: string;

  image_url?: string;

  moq?: number;
  price_range?: string;

  featured?: boolean;
};
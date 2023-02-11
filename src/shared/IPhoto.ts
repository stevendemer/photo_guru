export interface IPhoto {
  id: string;
  alt_description?: string;
  width?: number;
  downloads?: number;
  blur_hash: string;
  height?: number;
  created_at?: string;
  updated_at?: string;
  urls?: {
    raw: string;
    full: string;
    regular: string;
    thumb: string;
    small: string;
  };
  likes?: string | number;
  user: {
    id: string;
    username?: string;
    name?: string;
    portfolio_url?: string;
    profile_image?: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username?: string;
    total_photos?: number;
    total_likes?: number;
  };
}

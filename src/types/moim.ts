export interface User {
  id: number;
  nickname: string;
  profile_image: string;
}

export interface GetMoimLIST {
  id: number;
  title: string;
  category: string;
  is_closed: boolean;
  is_applied: boolean;
  is_writer: boolean;
  is_liked: boolean;
  date: string;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  max_people: number;
  status: number;
  role_status: {
    backend: number;
    designer: number;
    frontend: number;
    fullstack: number;
  };
  image?: string;
}

export interface MoimPayload {
  title: string;
  category: string;
  content: string;
  place_name: string;
  adress: string;
  date: string;
  latitude?: number;
  longitude?: number;
  roles: Record<string, number>;
  image_url?: string;
}

export interface moimCard {
  id: number;
  title: string;
  category: string;
  is_closed: boolean;
  is_applied: boolean;
  is_writer: boolean;
  is_liked: boolean;
  date: string;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  max_people: number;
  status: number;
  role_status: {
    backend: number;
    designer: number;
    frontend: number;
    fullstack: number;
  };
  image?: string;
}

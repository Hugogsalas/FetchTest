import { servicesInstance } from '../helpers/axios';
import { Dog } from '../models';

export interface SearchFilter {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export const getBreeds = async () => {
  const response = await servicesInstance.get('/dogs/breeds');
  return response.data;
};

export interface SearchResponse {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export const searchDogs = async ({
  breeds = [],
  zipCodes = [],
  ageMin = 0,
  ageMax = 100,
  size = 10,
  from = 0,
  sort,
}: SearchFilter) => {
  const response = await servicesInstance.get<SearchResponse>('/dogs/search', {
    params: { breeds, zipCodes, ageMin, ageMax, size, from, sort },
  });
  return response.data;
};

export const getDog = async (id: string) => {
  const response = await servicesInstance.post('/dogs', [id]);
  return response.data;
};

export const getDogs = async (ids: string[]) => {
  const response = await servicesInstance.post<Dog[]>('/dogs', ids);
  return response.data;
};

export const matchDog = async (ids: string[]) => {
  const response = await servicesInstance.post('/dogs/match', ids);
  return response.data;
};

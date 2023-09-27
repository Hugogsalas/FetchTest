import { servicesInstance } from '../helpers/axios';
import { LoginForm } from '../views/login/component';

export const login = async ({ email, name }: LoginForm) => {
  const response = await servicesInstance.post('/auth/login', {
    email,
    name,
  });
  return response.data;
};

import { setCookie } from './set-cookie';

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};

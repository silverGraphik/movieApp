import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: false,
});

export const userState = atom({
  key: 'userState',
  default: null,
});

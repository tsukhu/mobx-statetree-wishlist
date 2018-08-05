import { types } from 'mobx-state-tree';

import { WishList } from './WishList';

const User = types.model({
  id: types.string,
  name: types.string,
  gender: types.enumeration('gender', ['m', 'f']),
  WishList: types.optional(WishList, {})
});

export const Group = types.model({
  users: types(User)
});

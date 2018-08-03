import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { WishListItem, WishList } from './WishList';
import { reaction } from 'mobx';

it('can create an instance of a model', () => {
  const item = WishListItem.create({
    name: 'The Notebook',
    price: 10.31
  });

  expect(item.price).toBe(10.31);
  expect(item.image).toBe('');
  item.changeName('My Notebook');
  expect(item.name).toBe('My Notebook');
});

it('can create a wishlist', () => {
  const list = WishList.create({
    items: [
      {
        name: 'The Notebook',
        price: 10.31
      }
    ]
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(10.31);
});

it('can add items', () => {
  const list = WishList.create();

  const states = [];

  onSnapshot(list, snapshot => {
    states.push(snapshot);
  });

  list.add({
    name: 'The Notebook',
    price: 10.31
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(10.31);
  expect(list.items[0].name).toBe('The Notebook');
  list.items[0].changeName('New Notebook');
  expect(list.items[0].name).toBe('New Notebook');

  expect(getSnapshot(list)).toEqual({
    items: [
      {
        name: 'New Notebook',
        price: 10.31,
        image: ''
      }
    ]
  });
  expect(getSnapshot(list)).toMatchSnapshot();

  expect(states).toMatchSnapshot();
});

it('can add items with patch', () => {
  const list = WishList.create();

  const patches = [];

  onPatch(list, patch => {
    patches.push(patch);
  });

  list.add({
    name: 'The Notebook',
    price: 10.31
  });

  list.items[0].changeName('New Notebook');
  expect(patches).toMatchSnapshot();
});

it('can canculate the total price of a wishlist', () => {
  const list = WishList.create({
    items: [
      {
        name: 'Machine Gun Preacher',
        price: 7.35,
        image:
          'https://images-na.ssl-images-amazon.com/images/I/91AFFK9fwkL._SY445_.jpg'
      },
      {
        name: 'LEGO Mindstorms EV3',
        price: 349.95,
        image:
          'https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg'
      }
    ]
  });

  let changed = 0;
  expect(list.totalPrice).toBe(357.3);
  reaction(() => list.totalPrice, () => changed++);
  expect(changed).toBe(0);
  console.log(list.totalPrice);
  list.items[0].changeName('Test');
  expect(changed).toBe(0);
  list.items[0].changePrice(10);
  expect(changed).toBe(1);
  expect(list.totalPrice).toBe(359.95);
});

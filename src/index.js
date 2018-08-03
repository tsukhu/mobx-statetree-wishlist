import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';

import { onSnapshot } from 'mobx-state-tree';

import { WishList } from './models/WishList';

let initialState = WishList.create({
  items: [
    {
      name: 'The Notebook',
      price: 10.31,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51ZXkAJNYWL._AC_US218_.jpg'
    },
    {
      name: 'LEGO Mindstorms EV3',
      price: 349.95,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg'
    }
  ]
});

if (localStorage.getItem('wishlistapp')) {
  const json = JSON.parse(localStorage.getItem('wishlistapp'));
  if (WishList.is(json)) initialState = json;
}

const wishList = WishList.create(initialState);

onSnapshot(wishList, snapshot => {
  localStorage.setItem('wishlistapp', JSON.stringify(snapshot));
});

ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));

/* setInterval(() => {
  wishList.items[0].changePrice(wishList.items[0].price + 1);
}, 1000);
 */

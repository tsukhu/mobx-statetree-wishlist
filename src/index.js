import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';

import { onSnapshot, getSnapshot } from 'mobx-state-tree';

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

let wishList = WishList.create(initialState);

onSnapshot(wishList, snapshot => {
  localStorage.setItem('wishlistapp', JSON.stringify(snapshot));
});

function renderApp() {
  ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));
}

renderApp();

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    // new components
    renderApp();
  });

  module.hot.accept(['./models/WishList'], () => {
    // new model definitions
    const snapshot = getSnapshot(wishList);
    wishList = WishList.create(snapshot);
    renderApp();
  });
}

/* setInterval(() => {
  wishList.items[0].changePrice(wishList.items[0].price + 1);
}, 1000);
 */

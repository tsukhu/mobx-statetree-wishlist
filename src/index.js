import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';

import { getSnapshot } from 'mobx-state-tree';

import { Group } from './models/Group';

let initialState = {
  users: {
    '1': {
      id: '1',
      name: 'Sonni',
      gender: 'f'
    },
    '2': {
      id: '2',
      name: 'Jennilee',
      gender: 'f'
    },
    '3': {
      id: '3',
      name: 'Powell',
      gender: 'm'
    },
    '4': {
      id: '4',
      name: 'Jsandye',
      gender: 'f'
    },
    '5': {
      id: '5',
      name: 'Kinnie',
      gender: 'm'
    }
  }
};

/* if (localStorage.getItem('wishlistapp')) {
  const json = JSON.parse(localStorage.getItem('wishlistapp'));
  if (WishList.is(json)) initialState = json;
} */

let group = Group.create(initialState);
/* onSnapshot(wishList, snapshot => {
  localStorage.setItem('wishlistapp', JSON.stringify(snapshot));
}); */

function renderApp() {
  ReactDOM.render(<App group={group} />, document.getElementById('root'));
}

renderApp();

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    // new components
    renderApp();
  });

  module.hot.accept(['./models/Group'], () => {
    // new model definitions
    const snapshot = getSnapshot(group);
    group = window.group = Group.create(snapshot);
    renderApp();
  });
}

/* setInterval(() => {
  wishList.items[0].changePrice(wishList.items[0].price + 1);
}, 1000);
 */

/* eslint-disable no-undef */
import { createAction } from 'redux-actions';
import reducer, { LOAD_PRODUCTS_SUCCESS } from '../products'; // eslint-disable-line

import Product from '../models/Product';
import ProductMap from '../models/ProductMap';

const factory = (productId, props = {}) => (
  new ProductMap({ [productId]: new Product({ id: productId, ...props }) })
);

jest.mock('bugsnag-react-native', () => 'Bugsnag');
jest.mock('../../utils/api', () => 'Api');


const payload = {
  entities: {
    products: {
      1: {
        courseId: 180,
        currencyCode: 'JPY',
        currencySymbol: '¥',
        description: 'Photoshop初心者だけど、どうやって勉強すればいいのか分からない...。 そんな方向けに初期設定からツール、便利な効果などの基本の使い方を分かりやすく解説します。',
        downloadable: 'false',
        id: 1,
        identifier: 'com.sharewis.courses.180',
        platform: 'ios',
        price: 4000,
        priceString: '¥4,000',
        title: '初心者のためのPhotosho',
      },
    },
  },
};

describe('lectures reducer', () => {
  it('should handle LOAD_PRODUCTS_SUCCESS', () => {
    const productId = 1;
    expect(
      reducer(
        factory(productId),
        createAction(LOAD_PRODUCTS_SUCCESS)(payload),
      ),
    ).toEqual(factory(productId, { ...payload.entities.products[1] }));
  });
});

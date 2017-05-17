/**
 * @flow
 */
import _ from 'lodash';
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

import Product from '../../models/Product';
import ProductMap from '../../models/ProductMap';

const initialState = new ProductMap();

const mergeEntities = (state, newProducts) =>
  state.merge(newProducts.map(product => new Product(product)));

const refreshEntities = newProducts => mergeEntities(initialState, newProducts);

const productsReducer = handleActions({
  FETCH_PRODUCTS_SUCCESS: (state: ProductMap, action) => {
    const products = action.payload.entities.products;
    if (!products) return state;
    return refreshEntities(fromJS(products));
  },
  LOAD_PRODUCTS_SUCCESS: (state: ProductMap, action) => {
    const loadedProducts = action.payload.entities.products;
    if (!loadedProducts) return state;
    return mergeEntities(state, fromJS(loadedProducts));
  },
  // redux-persistのrehydrate用のreducer
  // Immutable.jsを使用する場合、変換が必要
  [REHYDRATE]: (state, action) => {
    if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities')) return state;
    const products = action.payload.entities.products;
    if (_.isEmpty(products)) return initialState;
    return refreshEntities(fromJS(products));
  },
}, initialState);

export default productsReducer;

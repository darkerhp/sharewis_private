/* eslint no-console: ["error", { allow: ["error", "log"] }] */
/* @flow */
import _ from 'lodash';
import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import { createAction, handleActions } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';
import { NativeModules, Platform } from 'react-native';
import Promise from 'bluebird';
import { normalize } from 'normalizr';

import * as Api from '../utils/api';
import * as schema from '../lib/schema';

import Product from './models/Product';
import ProductMap from './models/ProductMap';

// Actions
const FETCH_PRODUCTS_SUCCESS = 'sharewis/products/FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'sharewis/products/FETCH_PRODUCTS_FAILURE';
const LOAD_PRODUCTS_SUCCESS = 'sharewis/products/LOAD_PRODUCTS_SUCCESS';
const LOAD_PRODUCTS_FAILURE = 'sharewis/products/LOAD_PRODUCTS_FAILURE';

// Reducer
const initialState = new ProductMap();

const mergeEntities = (state, newProducts) =>
  state.merge(newProducts.map(product => new Product(product)));

const refreshEntities = newProducts => mergeEntities(initialState, newProducts);

const reducer = handleActions(
  {
    [FETCH_PRODUCTS_SUCCESS]: (state: ProductMap, action) => {
      const products = action.payload.entities.products;
      if (!products) return state;
      return refreshEntities(fromJS(products));
    },
    [LOAD_PRODUCTS_SUCCESS]: (state: ProductMap, action) => {
      const loadedProducts = action.payload.entities.products;
      if (!loadedProducts) return state;
      return mergeEntities(state, fromJS(loadedProducts));
    },
    // redux-persistのrehydrate用のreducer
    // Immutable.jsを使用する場合、変換が必要
    [REHYDRATE]: (state, action) => {
      if (!Object.prototype.hasOwnProperty.call(action.payload, 'entities'))
        return state;
      const products = action.payload.entities.products;
      if (_.isEmpty(products)) return initialState;
      return refreshEntities(fromJS(products));
    }
  },
  initialState
);

export default reducer;

// Action Creators
export const fetchProductsSuccess = createAction(FETCH_PRODUCTS_SUCCESS);
export const fetchProductsFailure = createAction(FETCH_PRODUCTS_FAILURE);
export const loadProductsSuccess = createAction(LOAD_PRODUCTS_SUCCESS);
export const loadProductsFailure = createAction(LOAD_PRODUCTS_FAILURE);

// side effects, only as applicable
// e.g. thunks, epics, etc

// const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

const normalizeProducts = response =>
  normalize(
    response.map(product => Api.keyToCamelcase(product)),
    schema.arrayOfProducts
  );

/**
 * fetchProducts
 * サーバーから商品情報を取得する
 */
export const fetchProducts = () => async dispatch => {
  try {
    const response = await Api.get(`in_app_products?platform=${Platform.OS}`);
    dispatch(fetchProductsSuccess(normalizeProducts(response)));
    return true;
  } catch (error) {
    new Bugsnag().notify(error);
    console.error(error);
    dispatch(fetchProductsFailure());
    throw error;
  }
};

/**
 * loadProducts
 * iTunesから商品情報を取得する
 */
export const loadProducts = () => async (dispatch, getState) => {
  try {
    return true;
    } catch (error) { // eslint-disable-line
    new Bugsnag().notify(error);
    console.error(error);
    dispatch(loadProductsFailure());
    throw error;
  }
};

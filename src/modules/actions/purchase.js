/**
 * @flow
 */
import _ from 'lodash';
import { normalize } from 'normalizr';
import { NativeModules, Platform } from 'react-native';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import * as types from '../ActionTypes';
import * as Api from '../../utils/api';
import * as schema from '../../lib/schema';

const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

// Action Creators
export const fetchProductsSuccess = createAction(types.FETCH_PRODUCTS_SUCCESS);
export const fetchProductsFailure = createAction(types.FETCH_PRODUCTS_FAILURE);
export const loadProductsSuccess = createAction(types.LOAD_PRODUCTS_SUCCESS);
export const loadProductsFailure = createAction(types.LOAD_PRODUCTS_FAILURE);
export const purchaseCourseSuccess = createAction(types.PURCHASE_COURSE_SUCCESS);
export const purchaseCourseFailure = createAction(types.PURCHASE_COURSE_FAILURE);
export const restoreCourseSuccess = createAction(types.RESTORE_COURSE_SUCCESS);
export const restoreCourseFailure = createAction(types.RESTORE_COURSE_FAILURE);

// Thunks
const normalizeProducts = response =>
  normalize(response.map(product => Api.keyToCamelcase(product)), schema.arrayOfProducts);

/**
 * fetchProducts
 * サーバーから商品情報を取得する
 */
export const fetchProducts = () =>
  async (dispatch) => {
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
export const loadProducts = () =>
  async (dispatch, getState) => {
    try {
      const { entities: { products } } = getState();
      const productIdentifiers = _.values(products.map(p => p.identifier).toJS());
      const loadProductsResponse = await InAppUtils.loadProductsAsync(productIdentifiers);
      // idを紐付けてnormalizr
      const loadedProducts = loadProductsResponse.map((lp) => {
        const product = products.find(p => p.identifier === lp.identifier).toJS();
        return { ...product, ...lp };
      });
      dispatch(loadProductsSuccess(normalizeProducts(loadedProducts)));
      return true;
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(loadProductsFailure());
      throw error;
    }
  };

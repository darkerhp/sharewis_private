/**
 * @flow
 */
import { NativeModules } from 'react-native';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import * as types from '../ActionTypes';
import { PRODUCT_IDENTIFIER } from '../../lib/constants';

const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

const products = [
  'com.xyz.abc',
];

// Action Creators
export const loadProductsSuccess = createAction(types.LOAD_PRODUCTS_SUCCESS);
export const loadProductsFailure = createAction(types.LOAD_PRODUCTS_FAILURE);
export const purchasesFailure = createAction(types.PURCHASES_FAILURE);
export const purchasesSuccess = createAction(types.PURCHASES_SUCCESS);
export const receiptDataSuccess = createAction(types.RECEIPT_DATA_SUCCESS);
export const receiptDataFailure = createAction(types.RECEIPT_DATA_FAILURE);
export const restoreFailure = createAction(types.RESTORE_FAILURE);
export const restoreSuccess = createAction(types.RESTORE_SUCCESS);

// Thunks
export const loadProducts = () =>
  async (dispatch) => {
    try {
      const result = await InAppUtils.loadProductsAsync(products);
      dispatch(loadProductsSuccess(result));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(loadProductsFailure());
      throw error;
    }
  };

export const purchaseProduct = productIdentifier =>
  async (dispatch) => {
    try {
      const response = await InAppUtils.purchaseProductAsync(productIdentifier);
      if (!response || !response.productIdentifier) {
        throw new Error('Error purchasing product');
      }
      dispatch(purchasesSuccess(response.productIdentifier));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(purchasesFailure());
      throw error;
    }
  };

export const restorePurchases = () =>
  async (dispatch) => {
    try {
      const result = await InAppUtils.restorePurchasesAsync();
      dispatch(restoreSuccess(result));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(restoreFailure());
      throw error;
    }
  };

export const receiptData = () =>
  async (dispatch) => {
    try {
      const result = InAppUtils.receiptDataAsync();
      dispatch(receiptDataSuccess(result));
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(receiptDataFailure());
      throw error;
    }
  };

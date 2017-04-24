/**
 * @flow
 */
import { NativeModules } from 'react-native';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import * as types from '../ActionTypes';
import * as Api from '../../utils/api';

const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

const products = [
  'com.sharewis.Premium1m',
];

// Action Creators
export const joinPremiumSuccess = createAction(types.JOIN_PREMIUM_SUCCESS);
export const joinPremiumFailure = createAction(types.JOIN_PREMIUM_FAILURE);

// Thunks
export const joinPremium = userId =>
  async (dispatch) => {
    try {
      const loadProductsResponse = await InAppUtils.loadProductsAsync(products);
      console.log('loadProductsResponse:', loadProductsResponse);
      const response = await InAppUtils.purchaseProductAsync(products[0]);
      if (!response || !response.productIdentifier) {
        throw new Error('Error purchasing product');
      }
      const receiptDataResponse = InAppUtils.receiptDataAsync();
      await Api.post('premium_payment_infos/app_store', { receipt_data: receiptDataResponse }, { 'user-id': userId });
      dispatch(joinPremiumSuccess());
      return true;
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(joinPremiumFailure());
      throw error;
    }
  };

/**
 * @flow
 */
import { NativeModules } from 'react-native';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import * as Api from '../utils/api';

// Actions
export const JOIN_PREMIUM_SUCCESS = 'sharewis/premium/JOIN_PREMIUM_SUCCESS';
export const JOIN_PREMIUM_FAILURE = 'sharewis/premium/JOIN_PREMIUM_FAILURE';
export const RESTORE_PREMIUM_SUCCESS =
  'sharewis/premium/RESTORE_PREMIUM_SUCCESS';
export const RESTORE_PREMIUM_FAILURE =
  'sharewis/premium/RESTORE_PREMIUM_FAILURE';

// Action Creators
export const joinPremiumSuccess = createAction(JOIN_PREMIUM_SUCCESS);
export const joinPremiumFailure = createAction(JOIN_PREMIUM_FAILURE);
export const restorePremiumSuccess = createAction(RESTORE_PREMIUM_SUCCESS);
export const restorePremiumFailure = createAction(RESTORE_PREMIUM_FAILURE);

// Thunks
const products = ['com.sharewis.Premium1m'];

export const joinPremium = userId => async dispatch => {
  const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

  try {
    const loadProductsResponse = await InAppUtils.loadProductsAsync(products);
    console.log('loadProductsResponse:', loadProductsResponse);
    const response = await InAppUtils.purchaseProductAsync(products[0]);
    if (!response || !response.productIdentifier) {
      throw new Error('Error purchasing product');
    }
    const receiptDataResponse = await InAppUtils.receiptDataAsync();
    await Api.post(
      'premium_payment_infos/app_store',
      { receipt_data: receiptDataResponse },
      { 'user-id': userId }
    );
    dispatch(joinPremiumSuccess());
    return true;
  } catch (error) {
    new Bugsnag().notify(error);
    console.error(error);
    dispatch(joinPremiumFailure());
    throw error;
  }
};

export const restorePremium = () => async dispatch => {
  const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);

  try {
    const response = await InAppUtils.restorePurchasesAsync();
    if (response.length === 0) {
      return response;
    }
    response.forEach(purchase => {
      if (purchase.productIdentifier === products[0]) {
        console.log('Handle purchased product.');
      }
    });
    dispatch(restorePremiumSuccess());
    return response;
  } catch (error) {
    console.log('itunes Error', 'Could not connect to itunes store.');
    new Bugsnag().notify(error);
    console.error(error);
    dispatch(restorePremiumFailure());
    throw error;
  }
};

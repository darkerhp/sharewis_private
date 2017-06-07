/**
 * @flow
 */
// Courseの下位モジュール的なやつ OS毎に処理が異なるため分離
import _ from 'lodash';
import { normalize } from 'normalizr';
import { NativeModules, Platform } from 'react-native';
import Promise from 'bluebird';
import { createAction } from 'redux-actions';
import { Client as Bugsnag } from 'bugsnag-react-native';

import * as Api from '../utils/api';
import * as schema from '../lib/schema';
import { createPurchasedGuest } from './user';

// Actions
export const PURCHASE_COURSE_SUCCESS = 'sharewis/purchase/PURCHASE_COURSE_SUCCESS';
export const PURCHASE_COURSE_FAILURE = 'sharewis/purchase/PURCHASE_COURSE_FAILURE';
export const CREATE_PURCHASE_STATUS_SUCCESS = 'sharewis/purchase/CREATE_PURCHASE_STATUS_SUCCESS';
export const CREATE_PURCHASE_STATUS_FAILURE = 'sharewis/purchase/CREATE_PURCHASE_STATUS_FAILURE';
export const RESTORE_COURSE_SUCCESS = 'sharewis/purchase/RESTORE_COURSE_SUCCESS';
export const RESTORE_COURSE_FAILURE = 'sharewis/purchase/RESTORE_COURSE_FAILURE';

// Action Creators
export const purchaseCourseSuccess = createAction(PURCHASE_COURSE_SUCCESS);
export const purchaseCourseFailure = createAction(PURCHASE_COURSE_FAILURE);
export const createPurchaseStatusSuccess = createAction(CREATE_PURCHASE_STATUS_SUCCESS);
export const createPurchaseStatusFailure = createAction(CREATE_PURCHASE_STATUS_FAILURE);
export const restoreCourseSuccess = createAction(RESTORE_COURSE_SUCCESS);
export const restoreCourseFailure = createAction(RESTORE_COURSE_FAILURE);

// Thunks
/**
 * コースを購入する
 * @param courseId
 * @return response InAppUtils.purchaseProductのresponse
 */
export const purchaseCourse = courseId =>
  async (dispatch, getState) => {
    const InAppUtils = Promise.promisifyAll(NativeModules.InAppUtils);
    try {
      const { entities: { products } } = getState();
      const product = products.find(p => p.courseId === courseId);

      const response = await InAppUtils.purchaseProductAsync(product.identifier);
      if (!response || !response.transactionIdentifier) {
        throw new Error('Error purchasing product');
      }
      dispatch(purchaseCourseSuccess());
      return response;
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(purchaseCourseFailure());
      throw error;
    }
  };

/**
 * 購入記録を作成する
 * @param courseId
 * @param userId
 * @param response InAppUtils.purchaseProductのresponse
 */
export const createPurchaseStatus = (courseId, response) =>
  async (dispatch, getState) => {
    try {
      const { entities: { products }, user } = getState();
      const product = products.find(p => p.courseId === courseId);
      let userId = user.userId;
      if (!userId || userId === 0) {
        // ゲストユーザーの場合（ユーザーIDが空の場合）購入済みゲストユーザーを作成する
        const purchasedGuest = await createPurchasedGuest();
        userId = purchasedGuest.id; // eslint-disable-line
      }
      await Api.post('purchase_statuses', {
        price: product.price,
        course_id: courseId,
        currency_code: _.lowerCase(product.currencyCode),
        transaction_receipt: response.transactionReceipt,
      }, { 'user-id': userId });
      dispatch(createPurchaseStatusSuccess(courseId)); // isPurchaseをtrueにする
      return true;
    } catch (error) {
      new Bugsnag().notify(error);
      console.error(error);
      dispatch(createPurchaseStatusFailure());
      throw error;
    }
  };

/**
 * @flow
 */
import { Record } from 'immutable';

const ProductRecord = Record({
  id: 0,
  courseId: 0,
  platform: '',
  identifier: '',
  currencyCode: '',
  currencySymbol: '',
  description: '',
  downloadable: false,
  price: 0,
  priceString: '',
  title: '',
});

export default class Product extends ProductRecord {}

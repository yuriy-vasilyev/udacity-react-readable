import * as Api from '../middleware/api';
import * as types from './types';

export function fetchCategoriesAction( categories ) {
  return {
    type: types.RECEIVE_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return function( dispatch ) {
    return Api
      .fetchCategories()
      .then( categories => dispatch( fetchCategoriesAction( categories ) ) );
  }
}

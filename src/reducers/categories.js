import * as types from '../actions/types';

export default function categories( categories = [], action ) {
  switch ( action.type ) {
    case types.RECEIVE_CATEGORIES:
      return [
        ...action.categories
      ]

    default:
      return categories;
  }
}

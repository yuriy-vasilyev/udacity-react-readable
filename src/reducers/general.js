import * as types from '../actions/types';

const initialGeneralState = {
  isModalOpened: false,
  modalAction: null,
  modalData: null,
  currentCategory: null,
  currentPost: null,
  orderBy: 'voteScore'
}

export default function general( state = initialGeneralState, action ) {
  switch ( action.type ) {
    case types.TRIGGER_MODAL:
      return {
        ...state,
        isModalOpened: action.isModalOpened,
        modalAction: action.modalAction,
        modalData: action.modalData
      }

    case types.UPDATE_MODAL_DATA:
      return {
        ...state,
        modalData: action.modalData
      }

    case types.CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      }

    case types.REORDER:
      return {
        ...state,
        orderBy: action.orderBy
      }

    case types.CHANGE_CURRENT_POST:
      return {
        ...state,
        currentPost: action.id
      }

    default:
      return state;
  }
}

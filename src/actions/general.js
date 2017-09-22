import * as types from './types';

export function triggerModal( isModalOpened, modalAction = null, modalData = null ) {
  return {
    type: types.TRIGGER_MODAL,
    isModalOpened,
    modalAction,
    modalData
  }
}

export function changeCurrentPost( id ) {
  return {
    type: types.CHANGE_CURRENT_POST,
    id
  }
}

export function updateModalData( modalData ) {
  return {
    type: types.UPDATE_MODAL_DATA,
    modalData
  }
}

export function changeCategory( category ) {
  return {
    type: types.CHANGE_CATEGORY,
    category
  }
}

export function reorder( orderBy ) {
  return {
    type: types.REORDER,
    orderBy
  }
}

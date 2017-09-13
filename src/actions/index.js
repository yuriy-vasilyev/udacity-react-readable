import * as Api from '../middleware/api';

export const RECEIVE_CATEGORIES     = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS          = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS';
export const CREATE_POST            = 'CREATE_POST';
export const UPDATE_POST            = 'UPDATE_POST';
export const DELETE_POST            = 'DELETE_POST';
export const CREATE_COMMENT         = 'CREATE_COMMENT';
export const UPDATE_COMMENT         = 'UPDATE_COMMENT';
export const DELETE_COMMENT         = 'DELETE_COMMENT';
export const TRIGGER_MODAL          = 'TRIGGER_MODAL';
export const UPDATE_MODAL_DATA      = 'UPDATE_MODAL_DATA';
export const VOTE_POST              = 'VOTE_POST';

export function createPost( data ) {
  return {
    type: CREATE_POST,
    ...data
  }
}

export function pushPost() {
  return function( dispatch, data ) {
    return Api
      .pushPost( data )
      .then( res => dispatch( createPost( data ) ) );
  }
}

export function editPost( data ) {
  return {
    type: UPDATE_POST,
    ...data
  }
}


export function updatePost() {
  return function( dispatch, data ) {
    return Api
      .updatePost( data )
      .then( res => dispatch( editPost( data ) ) );
  }
}

export function votePost( id, option ) {
  return {
    type: VOTE_POST,
    id,
    option
  }
}

export function vote() {
  return function( dispatch, id, option ) {
    return Api
      .vote( id, option )
      .then( res => dispatch( votePost( id, option ) ) );
  }
}

export function deletePost( id ) {
  return {
    type: DELETE_POST,
    id
  }
}

export function removePost() {
  return function( dispatch, id ) {
    return Api
      .deletePost( id )
      .then( res => dispatch( deletePost( id ) ) );
  }
}

export function triggerModal( isModalOpened, modalAction = null, modalData = null ) {
  return {
    type: TRIGGER_MODAL,
    isModalOpened,
    modalAction,
    modalData
  }
}

export function updateModalData( modalData ) {
  return {
    type: UPDATE_MODAL_DATA,
    modalData
  }
}

export function receiveCategories( categories ) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
  return function( dispatch ) {
    return Api
      .fetchCategories()
      .then( categories => dispatch( receiveCategories( categories ) ) );
  }
}

export function receivePosts( posts ) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function fetchPosts() {
  return function( dispatch ) {
    return Api
      .fetchPosts()
      .then( posts => dispatch( receivePosts( posts ) ) );
  }
}

export function receiveCategoryPosts( posts ) {
  return {
    type: RECEIVE_CATEGORY_POSTS,
    posts
  }
}

export function fetchCategoryPosts( category ) {
  return function( dispatch ) {
    return Api
      .fetchCategoryPosts( category )
      .then( posts => dispatch( receiveCategoryPosts( posts ) ) );
  }
}

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

export function createPost( data ) {
  return {
    type: CREATE_POST,
    ...data
  }
}

export function updatePost( data ) {
  return {
    type: UPDATE_POST,
    ...data
  }
}

export function deletePost( id ) {
  return {
    type: DELETE_POST,
    id
  }
}

export function triggerModal( isModalOpened ) {
  return {
    type: TRIGGER_MODAL,
    isModalOpened
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

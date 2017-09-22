import * as Api from '../middleware/api';
import * as types from './types';

export function fetchPostsAction( posts ) {
  return {
    type: types.RECEIVE_POSTS,
    posts
  }
}

export function fetchPosts() {
  return function( dispatch ) {
    return Api
      .fetchPosts()
      .then( posts => {
        dispatch( fetchPostsAction( posts ) );
        return posts;
      });
  }
}

export function createPostAction( data ) {
  return {
    type: types.CREATE_POST,
    ...data
  }
}

export function createPost() {
  return function( dispatch, data ) {
    return Api
      .createPost( data )
      .then( res => dispatch( createPostAction( data ) ) );
  }
}

export function updatePostAction( data ) {
  return {
    type: types.UPDATE_POST,
    ...data
  }
}

export function updatePost() {
  return function( dispatch, data ) {
    return Api
      .updatePost( data )
      .then( res => dispatch( updatePostAction( data ) ) );
  }
}

export function votePostAction( id, option ) {
  return {
    type: types.VOTE_POST,
    id,
    option
  }
}

export function votePost() {
  return function( dispatch, id, option ) {
    return Api
      .votePost( id, option )
      .then( res => dispatch( votePostAction( id, option ) ) );
  }
}

export function deletePostAction( id ) {
  return {
    type: types.DELETE_POST,
    id
  }
}

export function deletePost() {
  return function( dispatch, id ) {
    return Api
      .deletePost( id )
      .then( res => dispatch( deletePostAction( id ) ) );
  }
}

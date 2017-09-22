import * as Api from '../middleware/api';
import * as types from './types';

export function fetchCommentsAction( comments, parentId ) {
  return {
    type: types.RECEIVE_POST_COMMENTS,
    parentId,
    comments
  }
}

export function fetchComments() {
  return function( dispatch, parentId ) {
    return Api
      .fetchComments( parentId )
      .then( comments => dispatch( fetchCommentsAction( comments, parentId ) ) );
  }
}

export function createCommentAction( data ) {
  return {
    type: types.CREATE_COMMENT,
    ...data
  }
}

export function createComment() {
  return function( dispatch, data ) {
    return Api
      .createComment( data )
      .then( res => dispatch( createCommentAction( data ) ) );
  }
}

export function updateCommentAction( data ) {
  return {
    type: types.UPDATE_COMMENT,
    ...data
  }
}

export function updateComment() {
  return function( dispatch, data ) {
    return Api
      .updateComment( data )
      .then( res => dispatch( updateCommentAction( data ) ) );
  }
}

export function voteCommentAction( parentId, id, option ) {
  return {
    type: types.VOTE_COMMENT,
    parentId: parentId,
    id,
    option
  }
}

export function voteComment() {
  return function( dispatch, parentId, id, option ) {
    return Api
      .voteComment( id, option )
      .then( res => dispatch( voteCommentAction( parentId, id, option ) ) );
  }
}

export function deleteCommentAction( parentId, id ) {
  return {
    type: types.DELETE_COMMENT,
    parentId: parentId,
    id
  }
}

export function deleteComment() {
  return function( dispatch, parentId, id ) {
    return Api
      .deleteComment( id )
      .then( res => dispatch( deleteCommentAction( parentId, id ) ) );
  }
}

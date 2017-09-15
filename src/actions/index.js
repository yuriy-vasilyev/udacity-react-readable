import * as Api from '../middleware/api';

export const RECEIVE_CATEGORIES    = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS         = 'RECEIVE_POSTS';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const CREATE_POST           = 'CREATE_POST';
export const UPDATE_POST           = 'UPDATE_POST';
export const DELETE_POST           = 'DELETE_POST';
export const VOTE_POST             = 'VOTE_POST';
export const CREATE_COMMENT        = 'CREATE_COMMENT';
export const UPDATE_COMMENT        = 'UPDATE_COMMENT';
export const DELETE_COMMENT        = 'DELETE_COMMENT';
export const VOTE_COMMENT          = 'VOTE_COMMENT';
export const TRIGGER_MODAL         = 'TRIGGER_MODAL';
export const UPDATE_MODAL_DATA     = 'UPDATE_MODAL_DATA';
export const CHANGE_CATEGORY       = 'CHANGE_CATEGORY';
export const REORDER               = 'REORDER';
export const CHANGE_CURRENT_POST   = 'CHANGE_CURRENT_POST';

export function createPostAction( data ) {
  return {
    type: CREATE_POST,
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
    type: UPDATE_POST,
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
    type: VOTE_POST,
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
    type: DELETE_POST,
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

export function createCommentAction( data ) {
  return {
    type: CREATE_COMMENT,
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
    type: UPDATE_COMMENT,
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
    type: VOTE_COMMENT,
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
    type: DELETE_COMMENT,
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

export function triggerModal( isModalOpened, modalAction = null, modalData = null ) {
  return {
    type: TRIGGER_MODAL,
    isModalOpened,
    modalAction,
    modalData
  }
}

export function changeCurrentPost( id ) {
  return {
    type: CHANGE_CURRENT_POST,
    id
  }
}

export function updateModalData( modalData ) {
  return {
    type: UPDATE_MODAL_DATA,
    modalData
  }
}

export function changeCategory( category ) {
  return {
    type: CHANGE_CATEGORY,
    category
  }
}

export function reorder( orderBy ) {
  return {
    type: REORDER,
    orderBy
  }
}

export function fetchCategoriesAction( categories ) {
  return {
    type: RECEIVE_CATEGORIES,
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

export function fetchPostsAction( posts ) {
  return {
    type: RECEIVE_POSTS,
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

export function fetchCommentsAction( comments, parentId ) {
  return {
    type: RECEIVE_POST_COMMENTS,
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

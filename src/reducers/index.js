import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_CATEGORY_POSTS,
  RECEIVE_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  TRIGGER_MODAL,
  UPDATE_MODAL_DATA
} from '../actions';

const initialGeneralState = {
  isModalOpened: false,
  modalAction: null,
  modalData: null
}

function general( state = initialGeneralState, action ) {
  switch ( action.type ) {
    case TRIGGER_MODAL:
      return {
        ...state,
        isModalOpened: action.isModalOpened,
        modalAction: action.modalAction,
        modalData: action.modalData
      }

    case UPDATE_MODAL_DATA:
      return {
        ...state,
        modalData: action.modalData
      }

    default:
      return state;
  }
}

function categories( categories = [], action ) {
  switch ( action.type ) {
    case RECEIVE_CATEGORIES:
      return [
        ...action.categories
      ]

    default:
      return categories;
  }
}

function posts( posts = {}, action ) {
  switch ( action.type ) {
    case RECEIVE_POSTS:
      return action.posts.reduce( ( posts, post ) => {
          posts[ post.id ] = post;
          return posts;
      }, {} );

    case CREATE_POST:

      return {
        ...posts,
        [ action.id ]: {
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          body: action.body,
          owner: action.owner,
          category: action.category,
          voteScore: action.voteScore,
          deleted: action.deleted
        }
      }

    case UPDATE_POST:
      let updatedPost = {};

      if ( action.title ) {
        updatedPost.title = action.title;
      }
      if ( action.body ) {
        updatedPost.body = action.body;
      }

      return {
        ...posts,
        [ action.id ]: {
          ...posts[ action.id ],
          ...updatedPost
        }
      }

    case DELETE_POST:
      return {
        ...posts,
        [ action.id ]: {
          ...posts[ action.id ],
          deleted: true
        }
      }

    default:
      return posts;
  }
}

function comments( comments = {}, action ) {

  switch ( action.type ) {

    default:
      return comments;
  }
}

export default combineReducers({
  general,
  categories,
  posts,
  comments
})

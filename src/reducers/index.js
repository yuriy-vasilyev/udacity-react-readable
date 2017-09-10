import { combineReducers } from 'redux';

import {
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  TRIGGER_MODAL
} from '../actions';

const initialGeneralState = {
  isModalOpened: false
}

function general( state = initialGeneralState, action ) {
  switch ( action.type ) {
    case TRIGGER_MODAL:
      return {
        ...state,
        isModalOpened: action.isModalOpened
      }

    default:
      return state;
  }
}

function categories( state = {}, action ) {
  switch ( action.type ) {

    default:
      return state;
  }
}

function posts( state = {}, action ) {
  switch ( action.type ) {
    case CREATE_POST:
      const newId = Object.keys( state ).length + 1;

      return {
        ...state,
        [ newId ]: {
          id: newId,
          timestamp: Date.now(),
          title: action.title,
          body: action.body,
          author: action.author,
          category: action.category,
          voteScore: 1,
          deleted: false
        }
      }

    case UPDATE_POST:
      let updatedPost = {};

      if ( action.id ) {
        updatedPost.id = action.id;
      }
      if ( action.title ) {
        updatedPost.title = action.title;
      }
      if ( action.body ) {
        updatedPost.body = action.body;
      }
      if ( action.author ) {
        updatedPost.author = action.author;
      }
      if ( action.category ) {
        updatedPost.category = action.category;
      }
      if ( action.voteScore ) {
        updatedPost.voteScore = action.voteScore;
      }
      return {
        ...state,
        [ action.id ]: {
          ...state[ action.id ],
          ...updatedPost
        }
      }

    case DELETE_POST:
      return {
        ...state,
        [ action.id ]: {
          ...state[ action.id ],
          deleted: true
        }
      }

    default:
      return state;
  }
}

function comments( state = {}, action ) {

  switch ( action.type ) {

    default:
      return state;
  }
}

export default combineReducers({
  general,
  categories,
  posts,
  comments
})

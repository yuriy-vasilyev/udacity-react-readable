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

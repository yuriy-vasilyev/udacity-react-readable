import { combineReducers } from 'redux';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POST_COMMENTS,
  RECEIVE_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  VOTE_POST,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  TRIGGER_MODAL,
  UPDATE_MODAL_DATA,
  CHANGE_CATEGORY,
  REORDER,
  CHANGE_CURRENT_POST
} from '../actions';

const initialGeneralState = {
  isModalOpened: false,
  modalAction: null,
  modalData: null,
  currentCategory: null,
  currentPost: null,
  orderBy: 'voteScore'
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

    case CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      }

    case REORDER:
      return {
        ...state,
        orderBy: action.orderBy
      }

    case CHANGE_CURRENT_POST:
      return {
        ...state,
        currentPost: action.id
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
          voteScore: 1,
          deleted: false
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

    case VOTE_POST:
      return {
        ...posts,
        [ action.id ]: {
          ...posts[ action.id ],
          voteScore: 'upVote' === action.option ? ++posts[ action.id ].voteScore : --posts[ action.id ].voteScore
        }
      }

    default:
      return posts;
  }
}

function comments( comments = {}, action ) {
  switch ( action.type ) {
    case RECEIVE_POST_COMMENTS:
      const postComments = action.comments.reduce( ( comments, comment ) => {
        comments[ comment.id ] = comment;
        return comments;
      }, {} );

      return {
        ...comments,
        [ action.parentId ]: postComments
      }

    case CREATE_COMMENT:
      return {
        ...comments,
        [ action.parentId ]: {
          ...comments[ action.parentId ],
          [ action.id ]: {
            id: action.id,
            timestamp: action.timestamp,
            body: action.body,
            owner: action.owner,
            parentId: action.parentId,
            voteScore: 1,
            deleted: false
          }
        }
      }

    case UPDATE_COMMENT:
      return {
        ...comments,
        [ action.parentId ]: {
          ...comments[ action.parentId ],
          [ action.id ]: {
            ...comments[ action.parentId ][ action.id ],
            body: action.body
          }
        }
      }

    case DELETE_COMMENT:
      return {
        ...comments,
        [ action.parentId ]: {
          ...comments[ action.parentId ],
          [ action.id ]: {
            ...comments[ action.parentId ][ action.id ],
            deleted: true
          }
        }
      }

    case VOTE_COMMENT:
      return {
        ...comments,
        [ action.parentId ]: {
          ...comments[ action.parentId ],
          [ action.id ]: {
            ...comments[ action.parentId ][ action.id ],
            voteScore: 'upVote' === action.option ? ++comments[ action.parentId ][ action.id ].voteScore : --comments[ action.parentId ][ action.id ].voteScore
          }
        }
      }

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

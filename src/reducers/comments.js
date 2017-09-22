import * as types from '../actions/types';

export default function comments( comments = {}, action ) {
  switch ( action.type ) {
    case types.RECEIVE_POST_COMMENTS:
      const postComments = action.comments.reduce( ( comments, comment ) => {
        comments[ comment.id ] = comment;
        return comments;
      }, {} );

      return {
        ...comments,
        [ action.parentId ]: postComments
      }

    case types.CREATE_COMMENT:
      return {
        ...comments,
        [ action.parentId ]: {
          ...comments[ action.parentId ],
          [ action.id ]: {
            id: action.id,
            timestamp: action.timestamp,
            body: action.body,
            author: action.author,
            parentId: action.parentId,
            voteScore: 1,
            deleted: false
          }
        }
      }

    case types.UPDATE_COMMENT:
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

    case types.DELETE_COMMENT:
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

    case types.VOTE_COMMENT:
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

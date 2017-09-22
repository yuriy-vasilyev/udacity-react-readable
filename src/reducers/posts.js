import * as types from '../actions/types';

export default function posts( posts = {}, action ) {
  switch ( action.type ) {
    case types.RECEIVE_POSTS:
      return action.posts.reduce( ( posts, post ) => {
          posts[ post.id ] = post;
          return posts;
      }, {} );

    case types.CREATE_POST:
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

    case types.UPDATE_POST:
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

    case types.DELETE_POST:
      return {
        ...posts,
        [ action.id ]: {
          ...posts[ action.id ],
          deleted: true
        }
      }

    case types.VOTE_POST:
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

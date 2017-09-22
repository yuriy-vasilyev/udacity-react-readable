import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerModal, reorder } from '../actions';
import Comment from './Comment';
import sortBy from 'sort-by';

class ListComments extends Component {
  render() {
    const {
      reorder,
      orderBy,
      triggerModal,
      postId
    } = this.props;

    let { comments } = this.props;

    let commentsToOutput = [];

    if ( comments ) {
      commentsToOutput = comments.sort( sortBy( `-${orderBy}` ) );
    }

    return (
      <div className="comments-wrapper">
        <h3>Comments</h3>
        { commentsToOutput.length && (
          <div className="comments-order">
            Order by
            <select
              onChange={ event => reorder( event.target.value ) }
              value={ orderBy }
            >
              <option key="voteScore" value="voteScore">Vote Scores</option>
              <option key="timestamp" value="timestamp">Date Created</option>
            </select>
            <div className="comments-wrapper">
              { commentsToOutput.map( ( comment, index ) => <Comment key={ index } comment={ comment } postId={ postId } /> ) }
            </div>
          </div>
        )}
        { ! commentsToOutput.length && (
          <p>No comments yet. Be the first one!</p>
        )}
        <div className="buttons-wrapper">
          <button
            onClick={ () => triggerModal( true, 'createComment', { postId } ) }
            className="button"
          >Add New Comment</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps( { general, comments }, props ) {
  let newComments = null;
  if ( comments && comments.hasOwnProperty( props.postId ) ) {
    newComments = Object.keys( comments[ props.postId ] ).reduce( ( commentsArr, commentId ) => {
      if ( comments[ props.postId ][ commentId ].deleted === false ) {
        commentsArr.push( comments[ props.postId ][ commentId ] );
      }

      return commentsArr;
    }, [] );
  }
  return {
    comments: newComments,
    isModalOpened: general.isModalOpened,
    modalAction: general.modalAction,
    modalData: general.modalData,
    orderBy: general.orderBy
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    reorder: ( orderBy ) => dispatch( reorder( orderBy ) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ListComments );

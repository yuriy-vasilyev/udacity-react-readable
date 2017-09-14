import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment, triggerModal, reorder } from '../actions';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TimesIcon from 'react-icons/lib/fa/times-circle';
import Comment from './Comment';
import sortBy from 'sort-by';

class ListComments extends Component {
  render() {
    const {
      createComment,
      reorder,
      orderBy,
      triggerModal
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
              { commentsToOutput.map( ( comment, index ) => <Comment key={ index } comment={ comment } /> ) }
            </div>
          </div>
        )}
        { ! commentsToOutput.length && (
          <p>No comments yet. Be the first one!</p>
        )}
        <div className="buttons-wrapper">
          <button
            onClick={ () => triggerModal( true, 'createComment' ) }
            className="button"
          >Add New Comment</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ general, comments }) {
  let newComments = null;
  if ( comments ) {
    newComments = Object.keys( comments ).reduce( ( commentsArr, commentId ) => {
      if ( comments[ commentId ].deleted === false ) {
        commentsArr.push( comments[ commentId ] );
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
    createComment: ( data ) => createComment()( dispatch, data ),
    reorder: ( orderBy ) => dispatch( reorder( orderBy ) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ListComments );

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateComment, deleteComment, voteComment, triggerModal } from '../actions';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TimesIcon from 'react-icons/lib/fa/times-circle';

class Comment extends Component {
  render() {
    const { comment, updateComment, deleteComment, voteComment, triggerModal } = this.props;
    const commentDate = new Date( comment.timestamp );
    const voteScoreClass = comment.voteScore >= 0 ? ' text-green' : ' text-red'
    return (
      <div className="loop-item">
        <div className="loop-item__buttons">
          <span
            onClick={ () => triggerModal( true, 'updateComment', { id: comment.id, body: comment.body } ) }
            className="loop-item__icon"
          >
            <PencilIcon size={24} />
          </span>
          <span
            onClick={ () => deleteComment( comment.id ) }
            className="loop-item__icon"
          >
            <TimesIcon size={24} />
          </span>
          <div className="loop-item__score">
            <span
              className="loop-item__score-btn"
              onClick={ () => voteComment( comment.id, 'upVote' ) }
            >+</span>
            <span className={ `loop-item__score-value${voteScoreClass}` }>{ comment.voteScore }</span>
            <span
              className="loop-item__score-btn"
              onClick={ () => voteComment( comment.id, 'downVote' ) }
            >-</span>
          </div>
        </div>
        <h2 className="loop-item__title">{ comment.title }</h2>
        <div className="loop-item__content">
          { comment.body }
        </div>
        <div className="loop-item__meta">
          <div className="loop-item__date">{ commentDate.toString() }</div>
          <div className="loop-item__owner">{ comment.owner }</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ general, comments }) {
  return {
    comments,
    isModalOpened: general.isModalOpened,
    modalAction: general.modalAction,
    modalData: general.modalData
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    updateComment: ( data ) => updateComment()( dispatch, data ),
    deleteComment: ( id ) => deleteComment()( dispatch, id ),
    voteComment: ( id, option ) => voteComment()( dispatch, id, option )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Comment );

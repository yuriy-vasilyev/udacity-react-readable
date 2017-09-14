import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, votePost, triggerModal } from '../actions';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TimesIcon from 'react-icons/lib/fa/times-circle';
import { Link } from 'react-router-dom';
import ListComments from './ListComments';

class SinglePost extends Component {
  render() {
    const { post, deletePost, triggerModal, votePost } = this.props;
    const postDate = new Date( post.timestamp );
    const voteScoreClass = post.voteScore >= 0 ? ' text-green' : ' text-red'
    return (
      <div className="loop-item">
        <div className="loop-item__buttons">
          <span
            onClick={ () => triggerModal( true, 'updatePost', { id: post.id, title: post.title, body: post.body } ) }
            className="loop-item__icon"
          >
            <PencilIcon size={24} />
          </span>
          <span
            onClick={ () => deletePost( post.id ) }
            className="loop-item__icon"
          >
            <TimesIcon size={24} />
          </span>
          <div className="loop-item__score">
            <span
              className="loop-item__score-btn"
              onClick={ () => votePost( post.id, 'upVote' ) }
            >+</span>
            <span className={ `loop-item__score-value${voteScoreClass}` }>{ post.voteScore }</span>
            <span
              className="loop-item__score-btn"
              onClick={ () => votePost( post.id, 'downVote' ) }
            >-</span>
          </div>
        </div>
        <h2 className="loop-item__title">{ post.title }</h2>
        <div className="loop-item__content">
          { post.body }
        </div>
        <div className="loop-item__meta">
          <div className="loop-item__category">{ post.category }</div>
          <div className="loop-item__date">{ postDate.toString() }</div>
          <div className="loop-item__owner">{ post.owner }</div>
        </div>
        <ListComments />
      </div>
    );
  }
}

function mapStateToProps({ general, posts }) {
  return {
    post: posts[ general.currentPost ],
    isModalOpened: general.isModalOpened,
    modalAction: general.modalAction,
    modalData: general.modalData
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    deletePost: ( id ) => deletePost()( dispatch, id ),
    votePost: ( id, option ) => votePost()( dispatch, id, option )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( SinglePost );

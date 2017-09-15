import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, votePost, triggerModal, changeCurrentPost } from '../actions';
import { capitalize, getCommentsNumber } from '../utils/helpers';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TimesIcon from 'react-icons/lib/fa/times-circle';
import { Link } from 'react-router-dom';

class LoopPost extends Component {
  render() {
    const {
      post,
      comments,
      deletePost,
      triggerModal,
      votePost,
      changeCurrentPost
    } = this.props;

    const postDate = new Date( post.timestamp );
    const voteScoreClass = post.voteScore >= 0 ? ' text-green' : ' text-red';

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
        <div className="loop-item__meta">{ `Posted by ${post.author} in ${capitalize(post.category)} on ${postDate.toDateString()}` }</div>
        <div className="loop-item__comments">{ getCommentsNumber( comments, post.id ) }</div>
        <div className="">
          <Link
            className="loop-item__read-more"
            to={ `/${post.category}/${post.id}` }
            onClick={ () => {
              changeCurrentPost( post.id );
            }}
          >Read More</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    changeCurrentPost: ( id ) => dispatch( changeCurrentPost( id ) ),
    deletePost: ( id ) => deletePost()( dispatch, id ),
    votePost: ( id, option ) => votePost()( dispatch, id, option )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LoopPost );

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePost, vote, triggerModal } from '../actions';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TimesIcon from 'react-icons/lib/fa/times-circle';
import { Link } from 'react-router-dom';

class Post extends Component {
  render() {
    const { post, removePost, triggerModal, vote } = this.props;
    const postDate = new Date( post.timestamp );
    const voteScoreClass = post.voteScore >= 0 ? ' text-green' : ' text-red'
    return (
      <div className="post-item">
        <div className="post-item__buttons">
          <span
            onClick={ () => triggerModal( true, 'update', { id: post.id, title: post.title, body: post.body } ) }
            className="post-item__icon"
          >
            <PencilIcon size={24} />
          </span>
          <span
            onClick={ () => removePost( post.id ) }
            className="post-item__icon"
          >
            <TimesIcon size={24} />
          </span>
          <div className="post-item__score">
            <span
              className="post-item__score-btn"
              onClick={ () => vote( post.id, 'upVote' ) }
            >+</span>
            <span className={ `post-item__score-value${voteScoreClass}` }>{ post.voteScore }</span>
            <span
              className="post-item__score-btn"
              onClick={ () => vote( post.id, 'downVote' ) }
            >-</span>
          </div>
        </div>
        <h2 className="post-item__title">{ post.title }</h2>
        <div className="post-item__content">
          { post.body }
        </div>
        <div className="post-item__meta">
          <div className="post-item__category">{ post.category }</div>
          <div className="post-item__date">{ postDate.toString() }</div>
          <div className="post-item__owner">{ post.owner }</div>
        </div>
        <div className="">
          <Link
            className="post-item__read-more"
            to={ `/${post.category}/${post.id}` }
          >Read More</Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    removePost: ( id ) => removePost()( dispatch, id ),
    vote: ( id, option ) => vote()( dispatch, id, option )
  }
}

export default connect(
  null,
  mapDispatchToProps
)( Post );

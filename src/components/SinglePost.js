import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, votePost, triggerModal } from '../actions';
import { capitalize, getCommentsNumber } from '../utils/helpers';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TimesIcon from 'react-icons/lib/fa/times-circle';
import ListComments from './ListComments';

class SinglePost extends Component {

  constructor( props ) {
    super();
    this.postId = false;
    if ( props.match.params.hasOwnProperty( 'id' ) ) {
      this.postId = props.match.params.id;
    }
  }

  render() {
    const {
      posts,
      comments,
      deletePost,
      triggerModal,
      votePost
    } = this.props;

    if ( ! this.postId ) {
      return (
        <p>Something went wrong. Post ID is not provided.</p>
      );
    }

    if ( ! posts || ! posts.hasOwnProperty( this.postId ) ) {
      return (
        <p>Something went wrong. There is no post in the DB you are looking for.</p>
      );
    }

    const post = posts[ this.postId ];

    if ( post.deleted ) {
      return (
        <p>Sorry, the post you are looking for is deleted.</p>
      );
    }

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
        <div className="loop-item__meta">{ `Posted by ${post.author} in ${capitalize(post.category)} on ${postDate.toDateString()}` }</div>
        <div className="loop-item__comments">{ getCommentsNumber( comments, post.id ) }</div>
        <ListComments postId={ post.id } />
      </div>
    );
  }
}

function mapStateToProps({ general, posts, comments }) {
  return {
    posts,
    comments,
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerModal, reorder } from '../actions';
import LoopPost from './LoopPost';
import sortBy from 'sort-by';

class ListPosts extends Component {

  render() {
    const {
      reorder,
      orderBy,
      triggerModal,
      category
    } = this.props;

    let { posts } = this.props;

    let postsToOutput = [];
    let orderByValue = '';

    switch ( orderBy ) {
      case 'title':
        orderByValue = orderBy;
        break;

      default:
        orderByValue = `-${orderBy}`;
        break;
    }


    if ( posts ) {
      if ( 'all' !== category ) {
        posts = posts.filter( post => post.category === category );
      }
      postsToOutput = posts.sort( sortBy( orderByValue ) );
    }

    return (
      <div className="posts-wrapper">
        <div className="posts-order">
          Order by
          <select
            onChange={ event => reorder( event.target.value ) }
            value={ orderBy }
          >
            <option key="voteScore" value="voteScore">Vote Scores</option>
            <option key="timestamp" value="timestamp">Date Created</option>
            <option key="title" value="title">Title</option>
          </select>
        </div>
        <div className="posts-wrapper">
          { postsToOutput.map( ( post, index ) => <LoopPost key={ index } post={ post } /> ) }
        </div>
        <div className="buttons-wrapper">
          <button
            onClick={ () => triggerModal( true, 'createPost' ) }
            className="button button--primary"
          >Create New Post</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ general, categories, posts, comments }) {
  let newPosts = null;
  if ( posts ) {
    newPosts = Object.keys( posts ).reduce( ( postsArr, postId ) => {
      if ( posts[ postId ].deleted === false ) {
        if ( general.currentCategory ) {
          if ( posts[ postId ].category === general.currentCategory ) {
            postsArr.push( posts[ postId ] );
          }
        } else {
          postsArr.push( posts[ postId ] );
        }
      }

      return postsArr;
    }, [] );
  }
  return {
    posts: newPosts,
    orderBy: general.orderBy,
    isModalOpened: general.isModalOpened,
    modalAction: general.modalAction,
    modalData: general.modalData
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
)( ListPosts );

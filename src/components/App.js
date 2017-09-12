import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, triggerModal } from '../actions';
import { capitalize } from '../utils/helpers';
import Modal from 'react-modal';
import Post from './Post';
import ModalWindow from './ModalWindow';

class App extends Component {

  render() {
    const { isModalOpened, triggerModal, posts, categories } = this.props;

    return (
      <div className="readable">
        <div className="readable__container">
          <h1 className="readable__heading">Udacity Readable Project</h1>
          <ul className="categories">
            { categories && categories.map( ( category, index ) => (
              <li key={ index }>
                <a href={ category.path }>{ capitalize( category.name ) }</a>
              </li>
            ))}
          </ul>
          <div className="posts-wrapper">
            { posts && posts.map( ( post, index ) => <Post key={ index } post={ post } /> ) }
          </div>
          <div className="buttons-wrapper">
            <button
              onClick={ () => triggerModal( true, 'create' ) }
              className="button button--primary"
            >Create New Post</button>
          </div>
          <Modal
            className="readable-modal__overlay"
            overlayClassName="readable-modal"
            isOpen={ isModalOpened }
            onRequestClose={ () => triggerModal( false ) }
            contentLabel="Modal"
          >
            <ModalWindow />
          </Modal>
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
        postsArr.push( posts[ postId ] );
      }

      return postsArr;
    }, [] );
  }
  return {
    posts: newPosts,
    categories,
    isModalOpened: general.isModalOpened,
    modalAction: general.modalAction,
    modalData: general.modalData
  }
}

function mapDispatchToProps( dispatch ) {
  fetchCategories()( dispatch );
  fetchPosts()( dispatch );

  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( App );

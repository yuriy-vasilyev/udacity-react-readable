import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import uuid from 'react-native-uuid';
import { fetchCategories, fetchPosts, pushPost, updatePost, deletePost, triggerModal } from '../actions';
import { capitalize } from '../utils/helpers';
import Modal from 'react-modal';
import Post from './Post';

class App extends Component {

  render() {
    const { createPost, isModalOpened, triggerModal, posts, categories } = this.props;

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
              onClick={ () => triggerModal( true ) }
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
            <form
              onSubmit={ event => {
                const formData = serializeForm( event.target, { hash: true } );
                const newPost = {
                  ...formData,
                  id: uuid.v1(),
                  timestamp: Date.now(),
                  voteScore: 1,
                  deleted: false
                };
                createPost( newPost );
                triggerModal( false );
                event.preventDefault();
              }}
            >
              <p>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" />
              </p>
              <p>
                <label htmlFor="body">Content</label>
                <textarea name="body"></textarea>
              </p>
              <p>
                <label htmlFor="owner">Author</label>
                <input type="text" name="owner" />
              </p>
              <p>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" />
              </p>
              <p>
                <input type="submit" value="Create New Post" />
              </p>
            </form>
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
    isModalOpened: general.isModalOpened
  }
}

function mapDispatchToProps( dispatch ) {
  fetchCategories()( dispatch );
  fetchPosts()( dispatch );

  return {
    triggerModal: ( isModalOpened ) => dispatch( triggerModal( isModalOpened ) ),
    createPost: ( data ) => pushPost()( dispatch, data ),
    updatePost: ( data ) => dispatch( updatePost( data ) ),
    deletePost: ( id ) => dispatch( deletePost( id ) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( App );

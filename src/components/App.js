import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { fetchCategories, fetchPosts, createPost, updatePost, deletePost, triggerModal } from '../actions';
import { capitalize } from '../utils/helpers';
import Modal from 'react-modal';
import Post from './Post';

class App extends Component {

  render() {
    const { fetchCategories, createPost, isModalOpened, triggerModal, posts, categories } = this.props;

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
            { posts && posts.map( post => <Post key={ post.id } post={ post } /> ) }
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
                createPost( formData );
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
                <label htmlFor="author">Author</label>
                <input type="text" name="author" />
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
    newPosts = Object.keys( posts ).map( postId => {
      if ( posts[ postId ].deleted === false ) {
        return posts[ postId ];
      } else {
        return false;
      }
    });
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
    createPost: ( data ) => dispatch( createPost( data ) ),
    updatePost: ( data ) => dispatch( updatePost( data ) ),
    deletePost: ( id ) => dispatch( deletePost( id ) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( App );

import React, { Component } from 'react';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import { createPost, updatePost, deletePost, triggerModal } from '../actions';
import Modal from 'react-modal';
import Post from './Post';

class App extends Component {

  render() {
    const { createPost, isModalOpened, triggerModal, posts } = this.props;
    console.log( posts );
    return (
      <div className="container">
        <div className="posts-wrapper">
          { posts &&
            posts.map( post => <Post key={ post.id } post={ post } /> )
          }
        </div>
        <button
          onClick={ () => triggerModal( true ) }
          className="button"
        >Create New Post</button>
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
    )
  }
}

function mapStateToProps({ general, categories, posts, comments }) {
  return {
    posts: Object.keys( posts ).map( postId => {
      if ( posts[ postId ].deleted === false ) {
        return posts[ postId ];
      } else {
        return false;
      }
    }),
    isModalOpened: general.isModalOpened
  }
}

function mapDispatchToProps( dispatch ) {
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

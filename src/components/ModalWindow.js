import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPost, updatePost, updateModalData, triggerModal } from '../actions';
import serializeForm from 'form-serialize';
import { capitalize } from '../utils/helpers';
import uuid from 'react-native-uuid';

class ModalWindow extends Component {

  render() {
    const { categories, createPost, updatePost, triggerModal, modalAction, modalData, updateModalData } = this.props;
    return (
      <div className="modal-window">
        { 'create' === modalAction && (
          <form
            onSubmit={ event => {
              const formData = serializeForm( event.target, { hash: true } );
              const newPost = {
                ...formData,
                id: uuid.v1(),
                timestamp: Date.now()
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
              <select
                name="category"
                value={ modalData && modalData.hasOwnProperty( 'category' ) ? modalData.category : categories[0].path }
                onChange={ event => updateModalData( { category: event.target.value } ) }
              >
                { categories.map( cat => <option key={ cat.path } value={ cat.path }>{ capitalize( cat.name ) }</option> ) }
              </select>
            </p>
            <p>
              <input type="submit" value="Create New Post" />
            </p>
          </form>
        )}
        { 'update' === modalAction && (
          <form
            onSubmit={ event => {
              const formData = serializeForm( event.target, { hash: true } );
              const newPost = {
                ...formData,
                id: modalData.id
              };
              updatePost( newPost );
              triggerModal( false );
              event.preventDefault();
            }}
          >
            <p>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={ modalData.title }
                onChange={ event => updateModalData( { id: modalData.id, title: event.target.value } ) }
              />
            </p>
            <p>
              <label htmlFor="body">Content</label>
              <textarea
                name="body"
                onChange={ event => updateModalData( { id: modalData.id, body: event.target.value } ) }
                value={ modalData.body }
              />
            </p>
            <p>
              <input type="submit" value="Save Changes" />
            </p>
          </form>
        )}
      </div>
    )
  }
}

function mapStateToProps({ categories, general }) {
  return {
    categories,
    isModalOpened: general.isModalOpened,
    modalAction: general.modalAction,
    modalData: general.modalData
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    triggerModal: ( isModalOpened ) => dispatch( triggerModal( isModalOpened ) ),
    createPost: ( data ) => pushPost()( dispatch, data ),
    updateModalData: ( data ) => dispatch( updateModalData( data ) ),
    updatePost: ( data ) => updatePost()( dispatch, data )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ModalWindow );

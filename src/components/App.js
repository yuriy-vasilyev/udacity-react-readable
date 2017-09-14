import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, triggerModal, reorder, changeCategory } from '../actions';
import { capitalize } from '../utils/helpers';
import { Route, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import Post from './Post';
import ModalWindow from './ModalWindow';
import sortBy from 'sort-by';

class App extends Component {

  render() {
    const {
      isModalOpened,
      triggerModal,
      categories,
      currentCategory,
      changeCategory,
      reorder,
      orderBy
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

      if ( currentCategory ) {
        posts = posts.filter( post => post.category === currentCategory );
      }

      postsToOutput = posts.sort( sortBy( orderByValue ) );
    }

    return (
      <div className="readable">
        <div className="readable__container">
          <h1 className="readable__heading">Udacity Readable Project</h1>
          <nav role="navigation" className="nav">
            <NavLink
              key="home"
              exact to="/"
              className="nav-link"
              activeClassName="active"
              onClick={ () => changeCategory( null ) }
            >Home</NavLink>
            { categories && categories.map( ( category, index ) => (
              <NavLink
                key={ index }
                to={ `/${category.path}` }
                className="nav-link"
                activeClassName="active"
                onClick={ () => changeCategory( category.path ) }
              >{ capitalize( category.name ) }</NavLink>
            ))}
          </nav>
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
            { postsToOutput.map( ( post, index ) => <Post key={ index } post={ post } /> ) }
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
    modalData: general.modalData,
    currentCategory: general.currentCategory,
    orderBy: general.orderBy
  }
}

function mapDispatchToProps( dispatch ) {
  fetchCategories()( dispatch );
  fetchPosts()( dispatch );

  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    changeCategory: ( category ) => dispatch( changeCategory( category ) ),
    reorder: ( orderBy ) => dispatch( reorder( orderBy ) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( App );

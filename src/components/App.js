import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, fetchComments, triggerModal } from '../actions';
import { capitalize } from '../utils/helpers';
import { withRouter, Route, NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import ListPosts from './ListPosts';
import SinglePost from './SinglePost';
import ModalWindow from './ModalWindow';

class App extends Component {

  render() {
    const {
      isModalOpened,
      triggerModal,
      categories
    } = this.props;

    return (
      <div className="readable">
        <div className="readable__container">
          <h1 className="readable__heading">Udacity Readable Project</h1>
          <nav className="nav">
            <NavLink
              key="home"
              exact to="/"
              className="nav-link"
              activeClassName="active"
            >Home</NavLink>
            { categories && categories.map( ( category, index ) => (
              <NavLink
                key={ index }
                exact to={ `/${category.path}` }
                className="nav-link"
                activeClassName="active"
              >{ capitalize( category.name ) }</NavLink>
            ))}
          </nav>
          <Route
            exact path="/"
            render={ () => <ListPosts category="all" /> }
          />
          <Route
            exact path="/react"
            render={ () => <ListPosts category="react" /> }
          />
          <Route
            exact path="/redux"
            render={ () => <ListPosts category="redux" /> }
          />
          <Route
            exact path="/udacity"
            render={ () => <ListPosts category="udacity" /> }
          />
          <Route
            exact path="/:category/:id"
            component={ SinglePost }
          />
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

function mapStateToProps({ general, categories }) {
  return {
    categories,
    isModalOpened: general.isModalOpened,
    modalAction: general.modalAction,
    modalData: general.modalData
  }
}

function mapDispatchToProps( dispatch ) {
  fetchCategories()( dispatch );
  fetchPosts()( dispatch ).then( posts => {
    posts.map( post => fetchComments()( dispatch, post.id ) );
  });

  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) )
  }
}

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( App ) );

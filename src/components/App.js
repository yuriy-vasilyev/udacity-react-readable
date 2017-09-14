import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts, triggerModal, changeCategory } from '../actions';
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
      categories,
      changeCategory
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
          <Route
            exact path="/:category/:string"
            component={ SinglePost }
          />
          <Route
            exact path="/"
            component={ ListPosts }
          />
          <Route
            exact path="/:category"
            component={ ListPosts }
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

function mapStateToProps({ general, categories, comments }) {
  return {
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
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    changeCategory: ( category ) => dispatch( changeCategory( category ) )
  }
}

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( App ) );

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removePost, triggerModal } from '../actions';
import PencilIcon from 'react-icons/lib/fa/pencil';
import TimesIcon from 'react-icons/lib/fa/times-circle';

class Post extends Component {
  render() {
    const { post, removePost, triggerModal } = this.props;
    const postDate = new Date( post.timestamp );
    return (
      <div className="post-item">
        <div className="post-item__buttons">
          <span
            onClick={ () => triggerModal( true, 'update', { id: post.id, title: post.title, body: post.body } ) }
            className="post-item__icon"
          >
            <PencilIcon size={24} />
          </span>
          <span
            onClick={ () => removePost( post.id ) }
            className="post-item__icon"
          >
            <TimesIcon size={24} />
          </span>
        </div>
        <h2 className="post-item__title">{ post.title }</h2>
        <div className="post-item__content">
          { post.body }
        </div>
        <div className="post-item__meta">
          <div className="post-item__category">{ post.category }</div>
          <div className="post-item__date">{ postDate.toString() }</div>
          <div className="post-item__owner">{ post.owner }</div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    triggerModal: ( isModalOpened, action, data ) => dispatch( triggerModal( isModalOpened, action, data ) ),
    removePost: ( id ) => removePost()( dispatch, id )
  }
}

export default connect(
  null,
  mapDispatchToProps
)( Post );

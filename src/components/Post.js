import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    const { post } = this.props;
    const postDate = new Date( post.timestamp );
    return (
      <div className="post-item">
        <h2 className="post-item__title">{ post.title }</h2>
        <div className="post-item__content">
          { post.body }
        </div>
        <div className="post-item__meta">
          <div className="post-item__category">{ post.category }</div>
          <div className="post-item__date">{ postDate.toString() }</div>
          <div className="post-item__author">{ post.author }</div>
        </div>
      </div>
    );
  }
}

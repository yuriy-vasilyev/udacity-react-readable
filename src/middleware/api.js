const url = 'http://localhost:3001';
const init = {
  headers: {
    'Authorization': 'udacity-readable',
    'Content-Type': 'application/json'
  }
}

export function fetchCategories() {
  return fetch( `${url}/categories`, init )
    .then( res => res.json() )
    .then( data => data.categories );
}

export function fetchPosts() {
  return fetch( `${url}/posts`, init )
    .then( res => res.json() );
}

export function createPost( data ) {
  init.method = 'POST';
  init.body = JSON.stringify( data );
  return fetch( `${url}/posts`, init )
    .then( res => res.json() );
}

export function deletePost( id ) {
  init.method = 'DELETE';
  return fetch( `${url}/posts/${id}`, init );
}

export function updatePost( data ) {
  init.method = 'PUT';
  let params = {};
  if ( data.title ) {
    params.title = data.title;
  }
  if ( data.body ) {
    params.body = data.body;
  }
  init.body = JSON.stringify( params );
  return fetch( `${url}/posts/${data.id}`, init );
}

export function votePost( id, option ) {
  init.method = 'POST';
  init.body = JSON.stringify({ option });
  return fetch( `${url}/posts/${id}`, init );
}

export function fetchComments( postId ) {
  return fetch( `${url}/posts/${postId}/comments`, init )
    .then( res => res.json() );
}

export function createComment( data ) {
  init.method = 'POST';
  init.body = JSON.stringify( data );
  return fetch( `${url}/comments`, init )
    .then( res => res.json() );
}

export function deleteComment( id ) {
  init.method = 'DELETE';
  return fetch( `${url}/comments/${id}`, init );
}

export function updateComment( data ) {
  init.method = 'PUT';
  let params = {};
  if ( data.title ) {
    params.title = data.title;
  }
  if ( data.body ) {
    params.body = data.body;
  }
  init.body = JSON.stringify( params );
  return fetch( `${url}/comments/${data.id}`, init );
}

export function voteComment( id, option ) {
  init.method = 'POST';
  init.body = JSON.stringify({ option });
  return fetch( `${url}/comments/${id}`, init );
}

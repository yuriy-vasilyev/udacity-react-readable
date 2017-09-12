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
    .then( res => res.json() )
    .then( data => data.posts );
}

export function fetchCategoryPosts( category ) {
  return fetch( `${url}/${category}/posts`, init )
    .then( res => res.json() )
    .then( data => data.posts );
}

export function createPost( data ) {
  let formData = new FormData();
  data.append( 'id', data.id );
  data.append( 'timestamp', data.timestamp );
  data.append( 'title', data.title );
  data.append( 'body', data.body );
  data.append( 'owner', data.owner );
  data.append( 'category', data.category );

  init.method = 'POST';
  init.body = formData;
  return fetch( `${url}/posts`, init )
    .then( res => res.json() )
    .then( data => data.posts );
}

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

export function fetchCategoryPosts( category ) {
  return fetch( `${url}/${category}/posts`, init )
    .then( res => res.json() );
}

export function pushPost( data ) {
  init.method = 'POST';
  init.body = JSON.stringify( data );
  return fetch( `${url}/posts`, init )
    .then( res => res.json() );
}

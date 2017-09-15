export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function getCommentsNumber( comments, postId ) {
  let commentsNote = '0 comments';

  if ( comments.hasOwnProperty( postId ) && Object.keys( comments[ postId ] ).length ) {
    const commentsLength = Object.keys( comments[ postId ] ).length;
    if ( 1 === commentsLength ) {
      commentsNote = '1 comment';
    } else {
      commentsNote = `${commentsLength} comments`;
    }
  }

  return commentsNote;
}

export const CREATE_POST    = 'CREATE_POST';
export const UPDATE_POST    = 'UPDATE_POST';
export const DELETE_POST    = 'DELETE_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const TRIGGER_MODAL  = 'TRIGGER_MODAL';

export function createPost( data ) {
  return {
    type: CREATE_POST,
    ...data
  }
}

export function updatePost( data ) {
  return {
    type: UPDATE_POST,
    ...data
  }
}

export function deletePost( id ) {
  return {
    type: DELETE_POST,
    id
  }
}

export function triggerModal( isModalOpened ) {
  return {
    type: TRIGGER_MODAL,
    isModalOpened
  }
}

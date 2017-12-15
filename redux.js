// @flow
export const key = '$$TOAST';

const defaultState = [ ];

function reducer(state = defaultState, action) {
  if(!action || action.type.indexOf('SIMPLEIN.TOAST') !== 0){
    return Array.isArray(state) ? state : defaultState;
  }

  console.log('ActionToast: ', action);

  switch (action.type) {
      case 'SIMPLEIN.TOAST.ADD':
        return state.concat(action.payload);
      case 'SIMPLEIN.TOAST.REMOVE':
          return state.filter(msg=>msg.id !== action.id);
      case 'SIMPLEIN.TOAST.CLEAR':
        return [];
      default:
          return state;
  }
}
reducer.key = key;

export const getToast = state => state[key] || {};

export function send(type:string, body:string, timeout:number =3000){
  return {
    type: 'SIMPLEIN.TOAST.ADD',
  payload: {
    id: '_' + Math.random().toString(36).substr(2, 9),
    body,
    type,
    timeout,
  }
}
}

export function remove(id){
  return {
    type: 'SIMPLEIN.TOAST.REMOVE',
    id,
  }
}

export function clear(){
  return {
    type: 'SIMPLEIN.TOAST.CLEAR',
  }
}


export default reducer;

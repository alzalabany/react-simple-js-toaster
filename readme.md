# Pure javascript react native toaster..

This was developed as a part of a new book in writing,



Thats all, now use redux to dispatch toasts ! they will auto clear when timeout.

no magic simple straight forward.

```
import * as TOAST 'react-native-redux-js-toast';

//then somewhere, anywhere where u want to call toast just dispatch action;
this.props.addToast('warn|info|success|danger','Hello world',3000);

// redux mapActionsToDispatch function;

function mapActionsToDispatch(dispatch){
  return {
    clearAll: () => dispatch(TOAST.clear()),
    removeToast: id => dispatch(TOAST.remove(id)),
    addToast: (type, body, timeout=3000)=>dispatch(TOAST.send(type, body, timeout))
  }
}

export default connect(null, mapActionsToDispatch)(YourComponent);
```

## Setup

u need to include `<TOAST.Toaster fixed={true} />` inside your root view, only once and for all !just under your app..

example

```
import { Toaster } 'react-native-redux-js-toast';

const App = () => <View style={{flex:1,padding:0, margin:0}}>
  <View style={{flex:1}}>
    {/* ... YOUR APPLICATION SHOULD RENDER HERE ... */}
  </View>

  <Toast />
</View>
```

## props
only one **fixed:** if set it will make toasts fixed, otherwise they will push view uppward

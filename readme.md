# Pure javascript toaster..

```JSX

```

Thats all, now use redux to dispatch toasts ! they will automaticly clear when timeout.

no magic simple straight forward.

```
import * as TOAST 'react-simple-js-toaster';
const Toaster = TOAST.default;


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

u need to include `<Toaster fixed={true} />` inside your root view, just under your app..

example

```
<View style={{flex:1,padding:0, margin:0}}>
  <View style={{flex:1}}>
    {this.props.isLoggedIn  ? <RealApplication /> : <AuthApplication />}
  </View>

  <Toast />
</View>
```

## props
1. fixed: if set it will make toasts fixed, otherwise they will push view uppward

import * as TOAST from './redux';
import React from 'react';
import {Dimensions, StyleSheet,Text, TouchableOpacity,View} from 'react-native';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('screen');

class Toaster extends React.Component<{}> {
  state = {que:[]}; // i just keep it for no reason !
  runMe = [];
  componentDidMount(){
    // this.props.startup();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.msgs === this.props.msgs)return;

    const newMsgs = nextProps.msgs.filter(msg=>!!this.props.msgs.findIndex(i=>i.id!==msg.id))
    if(!newMsgs.length)return;

    newMsgs.map(msg=>{
      this.runMe.push(
        ()=>setTimeout(()=>this.props.removeToast(msg.id) ,msg.timeout||7000)
      );
    });
  }

  componentDidUpdate(){
    while(this.runMe.length){
      this.runMe.pop()();
    }
  }
  render() {
    const now = (new Date).getTime();

    return <View style={[styles.container, this.props.fixed && {position:'absolute',bottom:0}]}>
      {this.props.msgs.map(msg=>(<TouchableOpacity key={msg.id} onPress={()=>this.props.removeToast(msg.id)}>
        <Text style={[styles.common,style(msg.type)]}>
          <Text style={styles.highlight}>{msg.type}!</Text>
          {msg.body}
        </Text>
        </TouchableOpacity>
      ))}
    </View>
  }
}

/**
* @@ todo
* fix styling !! this is truely bad styles :D !..
**/
const styles = StyleSheet.create({
  container: {
    width,
    overflow:'hidden',
    borderTopWidth:1,
    borderTopColor:'#CCC'
  },
  common:{
    paddingVertical:8,
    paddingHorizontal: 16,
    minHeight:20,
    color:'#FFF',
  },
  highlight:{
    fontSize:14,
    fontWeight:'500',
    textDecorationLine:'underline',
  }
});

function style(type){
  switch (type) {
    case 'success':
      return {backgroundColor:'green'};
      case 'warn':
        return {backgroundColor:'orange'};
        case 'danger':
          return {backgroundColor:'red'};
    case 'info':
    default:
      return {backgroundColor:'navy'};
  }

}

function mapStateToProps(state){
  return {
    msgs: TOAST.getToast(state)
  }
}

function actions(dispatch){
  return {
    startup: () => dispatch(TOAST.clear()),
    removeToast: id => dispatch(TOAST.remove(id)),
    addToast: (type, body, timeout=3000)=>dispatch(TOAST.send(type, body, timeout))
  }
}

export default connect(mapStateToProps, actions)(Toaster);

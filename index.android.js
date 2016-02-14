'use strict';

var React = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
  processColor,
  AppRegistry,
  Text,
  ListView,
  Picker,
  Animated,
} = React;

var CIRCLE_SIZE = 80;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';


var Org_test2 = React.createClass({

  //default value for picker-component
  getInitialState: function(){
    return{method:'1'};
  },

  render: function() {
    return (
      <View>

        {/* Picker for determining animating method for teh ballls */}
        <Picker
          selectedValue={this.state.method}
          onValueChange={(lang) => this.setState({method: lang})}>
            <Picker.Item label="Move" value="1" />
            <Picker.Item label="Ghost" value="2" />
            <Picker.Item label="Ghost with line" value="3" />
            <Picker.Item label="No effect" value="4" />
        </Picker>

        {/* drawing couple of balls with their animations */}
        <Ball method={this.state.method}>
        </Ball>

        <Ball method={this.state.method}>
        </Ball>

      </View>
    )
  }
});

var Ball = React.createClass({

  //presenting global variables
  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  _circleStylesShadow: {},
  _lineStyles:{},

  getInitialState: function(){
    //setting making showShadow-variable more useable
    //used for determining is ball's shadow is rendered or not (deleted if finger is lifted)
    return{showShadow:true};
  },

  componentWillUpdate: function(){
    //not used
  },

  componentWillMount: function() {

    //animationhandlers:
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    }),

    //variables for current ball
    this._previousLeft = 0;
    this._previousTop = 0;
    this._lineWidth = 0;
    this._lineHeight = 0;
    this._rotationI = 0;
    this._rotationS = '0'
    this._transform = [{rotate:'{this._rotation}'}];

    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };

    this._circleStylesShadow = {
      style: {
        opacity:this.opacity,
        left:this.left,
        top:this.top,
      }
    };

    this._lineStyles = {
      style:{
        transform: this._transform,
      }
    };

  },

  render: function() {

    //these var's are used for displaying (or not, depends the situation) shadows or lines
    //ref makes it possible to use setNativeProps on it
    var cShadow = this.props.method == '2' && this.state.showShadow ? <View style={styles.circleShadow} ref={component => this.Cir2 = component}/>:null;
    var cLine = this.props.method == '3' ? <View style={styles.line} ref={component => this.Line = component}/>:null;

    return (
        <View style={styles.container}>
          {/* shadow is drawn depending on showShadow's state */}
          {cShadow}
          <View ref={component => this.Cir = component}{...this.props}
            style={styles.circle}
            {...this._panResponder.panHandlers}>
          </View>

        </View>
    );
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    //Should responder turn active when user presses circle->
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    //should responder turn active on moving->
    return true;
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {

    //Handling movement:
    //setting coordinates and updatin circles
    //swich case would be maybe better
    //move duplicated code to out of this if-else !!!!!!!!!!!!!!!!!! -> much simpler
    if(this.props.method == '1'){
      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
      this._circleStyles.style.top = this._previousTop + gestureState.dy;
      this.Cir.setNativeProps(this._circleStyles);
    }
    else if(this.props.method == '2'){
      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
      this._circleStyles.style.top = this._previousTop + gestureState.dy;

      //shadow's opacity and location (stays still) during movement:
      this._circleStylesShadow.style.opacity = 0.3;
      this._circleStylesShadow.style.left = this._previousLeft;
      this._circleStylesShadow.style.top = this._previousTop;

      //for "deleting" shadow:
      this.setState({showShadow: true});

      //updates (incl. "delete" for shadow (Cir2)):
      this.Cir.setNativeProps(this._circleStyles);
      this.Cir2.setNativeProps(this._circleStylesShadow);

    }
    //line-action here
    //draws line between shadow and ball, NOT READY!
    else {
      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
      this._circleStyles.style.top = this._previousTop + gestureState.dy;

      this._circleStylesShadow.style.opacity = 0.5;
      this._circleStylesShadow.style.left = this._previousLeft;
      this._circleStylesShadow.style.top = this._previousTop;

      this.Cir.setNativeProps(this._circleStyles);
      this.Cir2.setNativeProps(this._circleStylesShadow);


      //this._rotationI = this._rotationI + 2;
      //this._rotationS = this._rotationI.toString()+'deg';

      //this._lineStyles.style.transform=[{rotate:this._rotationS}];
      //this.Line.setNativeProps(this._lineStyles);

      //  transform:[{rotate:'10deg'}],
    }

  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {

    //save cicle's coordinates where it was

    if(this.props.method == '1'){
      this._previousLeft += gestureState.dx;
      this._previousTop += gestureState.dy;
    }
    else if(this.props.method == '2'){
      this._previousLeft += gestureState.dx;
      this._previousTop += gestureState.dy;

      this._circleStylesShadow.style.opacity = 0.1;
      this.setState({showShadow: false});
    }
    else{
      this._previousLeft += gestureState.dx;
      this._previousTop += gestureState.dy;

      //"delete" shadow, opacity-change is for testing only, doesnt show
      this._circleStylesShadow.style.opacity = 0.1;
      this.setState({showShadow: false});

      //this.Line.setNativeProps(this._lineStyles);
    }
  }
});

//styles
var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  circleShadow: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 100,
    opacity:0.1,
  },
  line: {
    height:1,
    width:200,
    backgroundColor:'#000000',
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  container2: {
    flex: 1,
    paddingTop: 0,
  },
});


AppRegistry.registerComponent('Org_test2', () => Org_test2);

'use strict';

var React = require('react-native');

var {
  PanResponder,
  StyleSheet,
  View,
//  processColor,
//  AppRegistry,
//  Text,
//  ListView,
//  Picker,
//  Animated,
  Dimensions,
} = React;

var Globals = require('./Globals.js');    
    
//var BackgroundLines = require('./BackgroundLines.js');
//
//var CIRCLE_SIZE = 80;
//var CIRCLE_COLOR = 'blue';
//var CIRCLE_HIGHLIGHT_COLOR = 'green';
//var LINE_WIDTH = 0;
//var LINE_HEIGHT = 5;
//var varTEST1;
//var varTEST2;
//var varTEST3;
//var LINE_COUNT = 2;
//var COORDINATES_TO_LOCK = {};

//for advanced animations, not use atm
/*var ReactART = require('ReactNativeART');

var {
  Surface,
  Shape,
  Path,
}=ReactART;*/
    
    
    

var Ball = React.createClass({

  //presenting global variables
  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  _circleStylesShadow: {},
  _circleStylesSnapShadow:{},
  _lineStyles:{},
  _coordinates:{},



  getInitialState: function(){
    //setting making showShadow-variable more useable
    //used for determining is ball's shadow is rendered or not (deleted if finger is lifted)
    return{
      showShadow:false,
      showLine:false,
      showSnapShadow:false,
    };
  },

   shouldComponentUpdate: function(nextProps, nextState) {
    //not used
    return true;
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


    //varTEST1 = this._coordinates[0].toString();
    //variables for current ball
    this._previousLeft = 0;
    this._previousTop = 0;
    this._lineWidth = 0;
    this._rotationI = 0;
    this._rotationS = '0'
    this._previousLeftSnap = 0;
    this._previousTopSnap = 0;


    this._circleStyles = {
      style: {

      }
    };

    this._circleStylesShadow = {
      style: {

      }
    };

    this._lineStyles = {
      style:{
        transform:[{rotate:''}],
        width:this._lineWidth,
      }
    };

    this._circleStylesSnapShadow = {
      style: {

      }
    };

  },

  render: function() {

    //these var's are used for displaying (or not, depends the situation) shadows or lines
    //ref makes it possible to use setNativeProps on it
    var cShadow = (this.props.method == '2' || this.props.method == '3') && this.state.showShadow ? <View style={styles.circleShadow} ref={component => this.Cir2 = component}/>:null;

    {/* Line between shadow & current destination, animated real-time */}
    var cLine = this.props.method == '3' && this.state.showLine ? <View style={styles.line} ref={component => this.Line = component}/>:null;

    var cSnapShadow = this.props.method == '4' && this.state.showSnapShadow ? <View style={styles.circleSnapShadow} ref={component => this.Cir3 = component}/>:null;

    return (
        <View style={styles.container}>
          {/* shadows and lines are drawn depending on showShadow's state */}
          {cLine}
          {cShadow}
          {cSnapShadow}

          <View ref={component => this.Cir = component}{...this.props}
            style={styles.circle}
            {...this._panResponder.panHandlers}>

            {/*tests (not used atm):*/}

            {/*<Text>{numb.toFixed(3)}</Text>*/}
            {/* <Text>{Math.round(Math.tan(1/4))}</Text>*/}
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


    //tests for using custom function with logic
    //not working correctly unless some kind of setstate is declared
    //-> when picker is set to 1 (this.props.method == '1')

    /*
    this._coordinates = this.getCoordinatesForSnap();

    varTEST1 = this._coordinates[0].toString();

    for(var j = 0; j <= this._coordinates.length; j++){
      varTEST3 = 'testi ' + varTEST3;
    }
    */
    //varTEST3++;
    //this.setState({});
    //set coordinates for the moving circle
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;

    if(this.props.method == '1'){
      //this.setState({showShadow: false});

      this.Cir.setNativeProps(this._circleStyles);

    }

    if(this.props.method == '2' || this.props.method == '3'){
      //shadow's opacity and location (stays still) during movement:
      this._circleStylesShadow.style.opacity = 0.3;
      this._circleStylesShadow.style.left = this._previousLeft;
      this._circleStylesShadow.style.top = this._previousTop;

      //for revealing shadow:
      if(this.state.showShadow == false){
        this.setState({showShadow: true});
      }

      //updates
      this.Cir.setNativeProps(this._circleStyles);
      this.Cir2.setNativeProps(this._circleStylesShadow);

    }

    //line-action here
    //draws line between shadow and ball, NOT READY!
    if(this.props.method == '3') {

      if(this.state.showLine == false){
        this.setState({showLine: true});
      }
      //ill keep these comments here if needed somewhere
      //var s_previousAngle = this._lineStyles.style.transform[0].rotate;
      //var _previousAngle = (parseFloat(s_previousAngle.substring(0,s_previousAngle.indexOf('deg')))).toFixed(4);
      var _cLeft = this._circleStyles.style.left;
      var _cTop = this._circleStyles.style.top;
      var _sLeft = this._circleStylesShadow.style.left;
      var _sTop = this._circleStylesShadow.style.top;

      //ill keep these comments here if needed somewhere, sqrt = squareroot & pow is in x potence, returns real nro
      //var x = (Math.sqrt(Math.pow(_sLeft, 2))) - (Math.sqrt(Math.pow(_cLeft,2)));
      //var y = (Math.sqrt(Math.pow(_sTop, 2))) - (Math.sqrt(Math.pow(_cTop,2)));

      //x, y are points for the center of the line
      //theta is the angle of the line
      var x = 0;
      var y = 0;
      var theta = 0;

      //x = half-point for x of 2 points:
      if(_sLeft < _cLeft){
        x = _cLeft - (_cLeft - _sLeft)/2;
      }
      else {
        x = _sLeft - (_sLeft - _cLeft)/2;
      }

      //y = half-point for y of 2 points
      if(_sTop < _cTop){
        y = _cTop - (_cTop - _sTop)/2;
      }
      else{
        y = _sTop - (_sTop - _cTop)/2;
      }

      //a & b are used for measuring the length of the line
      var a = _sTop - _cTop;
      var b = _cLeft - _sLeft;

      theta = Math.atan2(b, a) * 180 / Math.PI + 180; // range (-PI, PI] + 180 -> 0 - 360

      //set to right place:
      //weird calculation for position of the line:
      //y seems to always have to be y + 40
      //linewidth seems to affect the needed position for x
      //if line lenght is 40, x have to be x + 20 and fo forth (*):
      //40:  +20
      //60:  +10
      //80:   0
      //100: -10
      //120: -20
      //140: -30
      //160: -40
      //180: -50
      //200: -60
      //apparently rotation happends from the middle of the line (ofcource), so the startingpoint has to be always corrected to the right place

      //varTEST3 = this._lineStyles.style.width;

      //hypotenuse (length of the line, length between of the shadow & ball):
      this._lineStyles.style.width = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

      //y seems to vary if the line_height is changed so to correct this:
      //+40 is try-error value
      this._lineStyles.style.top = y + 40 - Globals.LINE_HEIGHT;

      //width/2-40 is directed from the list above (*)
      this._lineStyles.style.left = x + (this._lineStyles.style.width/2-40)*-1;

      //-90 is neede to turn the line to its correct angle
      this._lineStyles.style.transform = [{rotate:(theta-90).toString()+'deg'}];

      this.Line.setNativeProps(this._lineStyles);
    }

    //green shadow to lock-grid
    if(this.props.method == '4'){

      if(this.state.showSnapShadow == false){
        this.setState({showSnapShadow: true});
      }

      this._circleStylesSnapShadow.style.left = parseFloat(this.props.COORDINATES_TO_LOCK[0][0]);
      this._circleStylesSnapShadow.style.top = parseFloat(this.props.COORDINATES_TO_LOCK[0][0]);

      this.Cir.setNativeProps(this._circleStyles);
      this.Cir3.setNativeProps(this._circleStylesSnapShadow);
    }
  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {

    //save cicle's coordinates where it was
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;

    if(this.props.method == '1'){

    }

    if(this.props.method == '2' || this.props.method == '3'){
      //"delete" shadow, opacity-change is for testing only, doesnt show
      if(this.state.showShadow == true){
        this.setState({showShadow: false});
      }
    }

    if(this.props.method == '3'){
      if(this.state.showLine == true){

        this.setState({showLine: false});

      }
    }

    if(this.props.method == '4'){
      if(this.state.showSnapShadow == true){
        this.setState({showSnapShadow: false});
      }

    }
  },


});
    
    
//styles
var styles = StyleSheet.create({
  circle: {
    width: Globals.CIRCLE_SIZE,
    height: Globals.CIRCLE_SIZE,
    borderRadius: Globals.CIRCLE_SIZE / 2,
    backgroundColor: Globals.CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 0,
    borderColor:'#000000',
    borderWidth:1,

  },
  circleShadow: {
    width: Globals.CIRCLE_SIZE,
    height: Globals.CIRCLE_SIZE,
    borderRadius: Globals.CIRCLE_SIZE / 2,
    backgroundColor: Globals.CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity:0,
    borderColor:'#000000',
    borderWidth:1,
  },
  circleSnapShadow: {
    width: Globals.CIRCLE_SIZE,
    height: Globals.CIRCLE_SIZE,
    borderRadius: Globals.CIRCLE_SIZE / 2,
    backgroundColor: 'green',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity:0.5,
    borderColor:'#000000',
    borderWidth:1,
  },
  line: {
    height: Globals.LINE_HEIGHT,
    width: Globals.LINE_WIDTH,
    position: 'absolute',
    left: 0,
    top: 0,
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
  backScreen:{
    top: 0,
    backgroundColor:'#000000',
    height:1,
  },
  backLine1:{
    position: 'absolute',
    backgroundColor:'black',
    height:1,
    width:Dimensions.get('window').width, top:Dimensions.get('window').height/2
  },
  backLine2:{
    position: 'absolute',
    backgroundColor:'black',
    width:1,
    height:Dimensions.get('window').height, left:Dimensions.get('window').width/2
  },
});



module.exports = Ball;
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
} = React;

var CIRCLE_SIZE = 80;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';


var Org_test2 = React.createClass({

  getInitialState: function(){
    return{method:'1'};
  },

  render: function() {
    return (
      <View>

        <Picker
          selectedValue={this.state.method}
          onValueChange={(lang) => this.setState({method: lang})}>
            <Picker.Item label="Move" value="1" />
            <Picker.Item label="Ghost" value="2" />
            <Picker.Item label="Ghost with line" value="3" />
            <Picker.Item label="No effect" value="4" />
        </Picker>

        <Ball method={this.state.method}>

        </Ball>
        <Ball method={this.state.method}>

        </Ball>



      </View>
    )
  }
});

var Ball = React.createClass({

  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  _circleStylesShadow: {},

  componentWillUpdate: function(){

  },

  componentWillMount: function() {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    }),

    this._previousLeft = 0;
    this._previousTop = 0;

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

  },

  render: function() {
    return (
        <View style={styles.container}>
          <View ref={component => this.asd = component}{...this.props}
            style={styles.circle}
            {...this._panResponder.panHandlers}>
          </View>
          <View style={styles.circleShadow} ref={component => this.asd2 = component}></View>
        </View>
    );
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    return true;
  },

  _handlePanResponderMove: function(e: Object, gestureState: Object) {

    if(this.props.method == '1'){
      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
      this._circleStyles.style.top = this._previousTop + gestureState.dy;
      this.asd.setNativeProps(this._circleStyles);
    }
    else {
      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
      this._circleStyles.style.top = this._previousTop + gestureState.dy;


      this._circleStylesShadow.style.opacity = 0.3;
      this._circleStylesShadow.style.left = this._previousLeft;
      this._circleStylesShadow.style.top = this._previousTop;

      this.asd.setNativeProps(this._circleStyles);
      this.asd2.setNativeProps(this._circleStylesShadow);
    }

  },

  _handlePanResponderEnd: function(e: Object, gestureState: Object) {

    if(this.props.method == '1'){
      this._previousLeft += gestureState.dx;
      this._previousTop += gestureState.dy;
    }
    else {
      this._previousLeft += gestureState.dx;
      this._previousTop += gestureState.dy;

      this._circleStylesShadow.style.opacity = 0;
      this.asd2.setNativeProps(this._circleStylesShadow);
    }

  }
});

var createShadow = React.createClass({
  render: function() {
    return(
      <View style={styles.container}>
        <View style={styles.circleShadow}>
        </View>
      </View>
    )
  }
});

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
    opacity:0
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

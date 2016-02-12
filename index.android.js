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

  _panResponder: {},
  _panResponder2: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},

  getInitialState: function(){
    return{language:'1'};
  },

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
    this._previousTop = 20;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };

  },


  render: function() {
    return (

      <View>
        <Picker
          selectedValue={this.state.language}
          onValueChange={(lang) => this.setState({language: lang})}>
            <Picker.Item label="Move" value="1" />
            <Picker.Item label="Ghost" value="2" />
            <Picker.Item label="Ghost with line" value="3" />
            <Picker.Item label="No effect" value="4" />
        </Picker>


        <View style={styles.container}>
          <View ref={component => this.asd = component}{...this.props}
            style={styles.circle}
            {...this._panResponder.panHandlers}>
          </View>
        </View>


        {/* miten tähän omat animaatiohookit, koko hoito kun toimii vaan 1 objektille

          https://facebook.github.io/react-native/docs/panresponder.html
          http://blog.zmxv.com/2016/01/lets-write-a-mobile-game-with-react-native-part-2.html

          */}
        <View style={styles.container}>
          <View ref={component => this.asd = component}{...this.props}
            style={styles.circle}
            {...this._panResponder.panHandlers}>
          </View>
        </View>


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

      this._circleStyles.style.left = this._previousLeft + gestureState.dx;
      this._circleStyles.style.top = this._previousTop + gestureState.dy;
      this.asd.setNativeProps(this._circleStyles);

  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {

      this._previousLeft += gestureState.dx;
      this._previousTop += gestureState.dy;

  },
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
  container: {
    flex: 1,
    paddingTop: 64,
  },
  container2: {
    flex: 1,
    paddingTop: 100,
  },
});


AppRegistry.registerComponent('Org_test2', () => Org_test2);

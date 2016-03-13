'use strict';

var React = require('react-native');

var {
  //PanResponder,
  StyleSheet,
  View,
  processColor,
  AppRegistry,
  Text,
  ListView,
  Picker,
  Animated,
  Dimensions,
} = React;

var BackgroundLines = require('./BackgroundLines.js');
var Ball = require('./Ball.js');
var Globals = require('./Globals.js');
    

//var CIRCLE_SIZE = 80;
//var CIRCLE_COLOR = 'blue';
//var CIRCLE_HIGHLIGHT_COLOR = 'green';
//var LINE_WIDTH = 0;
//var LINE_HEIGHT = 5;
//var LINE_COUNT = 2;
//var COORDINATES_TO_LOCK = {};

var varTEST1;
var varTEST2;
var varTEST3;
    

//for advanced animations, not use atm
var ReactART = require('ReactNativeART');

var {
  Surface,
  Shape,
  Path,
}=ReactART;

var Org_test2 = React.createClass({

  //default value for picker-component
  getInitialState: function(){

    return{
      method:'1',
      COORDINATES_TO_LOCK: this.getCoordinatesForSnap(),
    };
  },

  getCoordinatesForSnap: function(){

    var lineCount = parseInt(Globals.LINE_COUNT)
    var id = 0;

    var height = Dimensions.get('window').height;
    var width = Dimensions.get('window').width;
    var verticalSegment = height/(Globals.LINE_COUNT+1);
    var horizontalSegment = width/(Globals.LINE_COUNT+1);
    var coordinates = [];

    //var testCoordinates = [[1,2,3],[4,5,6],[7,8,9]];

    var i = 0;
    var j = 0;

    for(i = 0; i <= Globals.LINE_COUNT; i++){

      coordinates[i] = [];

      for(j = 0; j <= Globals.LINE_COUNT; j++){


        if(j==0){
          /*
             a b c
             | | |
          1 -0 0 0
          2 -0 0 0
          3 -0 0 0

          */

          //1 & a
          coordinates[i].push((verticalSegment/2 + (horizontalSegment * i)).toFixed(2));
          coordinates[i].push((horizontalSegment/2).toFixed(2));
        }
        else{
          //everything else, row 1 and column a are only meaningful ones
          coordinates[i].push((horizontalSegment/2 + (horizontalSegment * j)).toFixed(2));
        }
      }
    }


    //for visual tests:
    var k = 0;
    var l = 0;

    for(k = 0; k < coordinates.length; k++){
      for(l = 0; l < coordinates[k].length; l++){
        if(k == 0 && l == 0){
          varTEST1 = coordinates[k][l] + ' ';
        }
        else{
          varTEST1 += coordinates[k][l] + ' ';
        }
      }

      varTEST1 += '\n';
    }
    varTEST3 = coordinates.length;
    Globals.COORDINATES_TO_LOCK = coordinates;
    varTEST3 += ' ' + Globals.COORDINATES_TO_LOCK[0][0];
    return coordinates;
  },


  render: function() {

    return (
      <View>

        {/* draws grid for the background */}
        <BackgroundLines lineCount={Globals.LINE_COUNT}></BackgroundLines>

        {/* Picker for determining animating method for teh ballls */}
        <Picker
          selectedValue={this.state.method}
          onValueChange={(lang) => this.setState({method: lang})}>
            <Picker.Item label="Move" value="1" />
            <Picker.Item label="Shadow" value="2" />
            <Picker.Item label="Shadow with line" value="3" />
            <Picker.Item label="Lock" value="4" />
        </Picker>

        {/* drawing couple of balls with their animations */}
        <Ball method={this.state.method} >
        </Ball>

        <Ball method={this.state.method}>
        </Ball>

        <Text style={{top:100}}>{varTEST1}</Text>
        <Text>{varTEST2}</Text>
        <Text>{varTEST3}</Text>
      </View>
    )
  }
});

//returns views for backgroundlines




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


AppRegistry.registerComponent('Org_test2', () => Org_test2);

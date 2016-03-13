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
  Dimensions,
} = React;

var BackgroundLines  = React.createClass({

  //width:Dimensions.get('window').width, top:Dimensions.get('window').height/2
  //height:Dimensions.get('window').height, left:Dimensions.get('window').width/2


  render: function(){

    var lineCount = parseInt(this.props.lineCount);
    var id = 0;

    var height = Dimensions.get('window').height;
    var width = Dimensions.get('window').width;
    var verticalSegment = height/(lineCount+1);
    var horizontalSegment = width/(lineCount+1);


    var _backLines = [];

    //horizontal lines:
    for(var i = 1; i <= lineCount; i++){
      _backLines.push(<View style={{position: 'absolute', top:verticalSegment*i, height:1, width:width, backgroundColor:'black'}} key={id}></View>);
      id++;
    }

    //vertical lines:
    for(var i = 1; i <= lineCount; i++){
      _backLines.push(<View style={{position: 'absolute', left:horizontalSegment*i, height:height, width:1, backgroundColor:'black'}} key={id}></View>);
      id++;
    }

    return (
        <View>{_backLines}</View>
    )
  }

});

module.exports = BackgroundLines;

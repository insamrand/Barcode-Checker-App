import React from "react";
import { View } from "react-native";
import { Content, List, ListItem, Text, Body, Button, Icon } from "native-base";

export default class HomePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>Home</Text>,
      headerRight: (
        <Button transparent onPress={() => alert("open scan page")}>
          <Icon name="barcode" />
        </Button>
      )
    };
  };

  render() {
    return <Content></Content>;
  }
}

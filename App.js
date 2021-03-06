import React from "react";
import { AppLoading } from "expo";
import { View } from "react-native";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./pages/home-page/HomePage";
import ScanPage from "./pages/scan-page/ScanPage";

// config ส่วน redux
import { Provider } from "react-redux";
import configureStore from "./redux/store";
const store = configureStore();

// config ส่วน navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomePage
  }
});

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: AppNavigator
    },
    ScanPopup: {
      screen: ScanPage
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

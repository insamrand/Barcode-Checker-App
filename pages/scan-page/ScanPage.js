import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Right,
  Left,
  Button,
  Icon,
  Text,
  Body
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permission from "expo-permissions";



export default class ScanPage extends Component {
  state = {
    hasCameraPermission: null
  };

  // ใช้ Life cycle method `componentDidMount`
  // เพื่อรันโค้ดหลังจาก ScanPage render ครั้งแรกเสร็จแล้ว
  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    // ขอ permission ใช้งานกล้อง
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // set State ใหม่โดยกำหนดค่า hasCameraPermission เพื่อใช้งานใน method render()
    this.setState({ hasCameraPermission: status === "granted" });
  };
  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  closePopUp = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { hasCameraPermission } = this.state;
    // ถ้าค่า hasCameraPermission เป็น false
    // เราจะแสดง UI เป็นข้อความแทน
    if (hasCameraPermission === false) {
      return <Text> No Access To Camera</Text>;
    }
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>Scanner</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.closePopUp}>
              <Icon name="close" />
            </Button>
          </Right>
        </Header>
        {/*
                 ลบส่วน Content component ของ Nativebase ออกไป 
                 เพื่อเอา View component ของ react-native มาใช้แทน

                 - ค่า flex: 1 หมายถึงขยายให้เต็มพื้นที่
                */}
        <View
          style={{
            flex: 1
          }}
        >
          {/* แสดงตัวอ่านบาร์โค้ด */}
          <BarCodeScanner style={StyleSheet.absoluteFillObject} />
        </View>
      </Container>
    );
  }
}

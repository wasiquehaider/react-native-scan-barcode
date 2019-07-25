import React, { Component } from "react";
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import * as RNLBarCode from "@yyyyu/react-native-barcode";

const Scanner = RNLBarCode.Scanner;
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class MyScanner extends Component {
  state = {
    visible: true,
    scanEnable: true,
    scannerSize: 300,
    decoder: RNLBarCode.Decoder.Auto,
    formats: RNLBarCode.Type.Common.BAR_CODE,
    torch: RNLBarCode.TorchMode.Off,
    BarcodeContent: "",
    BarcodeFormat: ""
  };

  render() {
    const { BarcodeContent, BarcodeFormat } = this.state;
    return (
      <View style={styles.container}>
        {this.state.visible && (
          <Scanner
            enable={this.state.scanEnable}
            decoder={this.state.decoder}
            formats={this.state.formats}
            torch={this.state.torch}
            onResult={this.handleResult}
            style={{
              width: WIDTH,
              height: HEIGHT / 2
            }}
          />
        )}
        <Button onPress={this.toggleVisible} title={"Toggle Visible"} />
        <Button onPress={this.toggleScanEnable} title={"Toggle ScanEnable"} />
        <Button onPress={this.toggleTorch} title={"Toggle Torch"} />
        {BarcodeContent === "" && BarcodeFormat === "" ? null : (
          <View>
            <Text>{`Format: ${BarcodeFormat}`}</Text>
            <Text>{`Content: ${BarcodeContent}`}</Text>
            <Text>{`Scan Enabble : ${this.state.scanEnable}`}</Text>
          </View>
        )}
      </View>
    );
  }

  handleResult = (result, error) => {
    this.setState({ scanEnable: false });
    if (error) {
      Alert.alert(RNLBarCode.Errors[error.code], error.message, [
        { text: "Ok" }
      ]);
    } else {
      //   Alert.alert(
      //     "Success!",
      //     `format: ${RNLBarCode.Type.Common[result.format]}, content: ${
      //       result.content
      //     }`,
      //     [{ text: "Ok", onPress: () => this.setState({ scanEnable: true }) }]
      //   );
      this.setState({
        BarcodeFormat: RNLBarCode.Type.Common[result.format],
        BarcodeContent: result.content
      });
    }
  };

  toggleVisible = () => {
    this.setState({ visible: !this.state.visible });
  };

  toggleScanEnable = () => {
    this.setState({ scanEnable: !this.state.scanEnable });
  };

  toggleTorch = () => {
    this.setState({
      torch:
        this.state.torch === RNLBarCode.TorchMode.Off
          ? RNLBarCode.TorchMode.On
          : RNLBarCode.TorchMode.Off
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

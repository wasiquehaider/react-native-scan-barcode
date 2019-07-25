import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import ItemBarcodeScanContainer from "./src/ItemBarcodeScanContainer";
import MyScanner from "./src/MyScanner";
import CodeDecoder from "./src/CodeDecoder";

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyScanner />
        {/* <CodeDecoder /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

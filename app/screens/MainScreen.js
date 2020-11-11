import React from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import colors from '../config/Colors.js';
import { radius, height, iconButtonSize } from '../config/StyleProperties.js';
import { logoLinx, homeIcon } from '../config/Images';
import DateAndClock from '../components/DateAndClock';
import WeatherMainView from './WeatherMainView.js';

export default function MainScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.mainBar}>
        <Image source={logoLinx} style={styles.logoLinx} />
        <TouchableHighlight>
          <Image source={homeIcon} style={styles.homeButton} />
        </TouchableHighlight>
        <View style={styles.dateAndClock}>
          <DateAndClock />
        </View>
      </View>
      <View style={styles.mainView}>
        <WeatherMainView />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
    flexDirection: 'row',
  },
  dateAndClock: {
    ...iconButtonSize,
  },
  homeButton: {
    ...iconButtonSize,
  },
  logoLinx: {
    ...iconButtonSize,
  },
  mainBar: {
    backgroundColor: colors.primaryDark,
    width: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...height,
    ...radius,
  },
  mainView: {
    //backgroundColor: colors.secondary,
    flex: 1,
    padding: 60,
    ...height,
    ...radius,
  },
});

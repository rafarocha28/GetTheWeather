import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Text,
  TextInput,
} from 'react-native';

import {
  normalText,
  bigText,
  bigTextBold,
  radius,
  centerAllFlexRow,
} from '../config/StyleProperties';
import colors from '../config/Colors';
import { rainIcon, cloudIcon, thunderIcon, sunIcon } from '../config/Images';
import WeatherType from '../enums/WeatherType';

export default function WeatherWeek({ data }) {
  getWeatherIcon = () => {
    if (data && data.weather) {
      switch (Math.floor(data.weather.id / 100)) {
        case WeatherType.Thunderstorm:
          return thunderIcon;
        case WeatherType.Drizzle:
        case WeatherType.Rain:
        case WeatherType.Snow:
          return rainIcon;
        case WeatherType.Clear:
          return sunIcon;
        default:
          return cloudIcon; // Atmosphere and Clouds
      }
    }
    return cloudIcon;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={getWeatherIcon()} style={styles.weatherIcon} />
        <Text style={styles.weekDay}>{data.weekDay}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGray,
    borderWidth: 1,
    ...radius,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  weatherIcon: {
    width: 30,
    height: 30,
  },
  weekDay: {
    ...normalText,
  },
});

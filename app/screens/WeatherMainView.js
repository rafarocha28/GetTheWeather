import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  normalText,
  bigText,
  bigTextBold,
  radius,
  centerAllFlexRow,
  centerAllFlexColumn,
} from '../config/StyleProperties';
import colors from '../config/Colors';
import { searchIcon } from '../config/Images';
import WeatherWeek from '../components/WeatherWeek';
import { GetNextWeekForecast } from '../services/WeatherService';

export default function WeatherMainView(props) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [searching, setSearching] = useState(false);

  searchForecast = async (city) => {
    setSearching(true);
    try {
      const nextWeekForecast = await GetNextWeekForecast(city);
      if (nextWeekForecast) {
        return nextWeekForecast;
      }
      Alert.alert(
        'GetTheWeather',
        `Dados para a cidade "${city}" não encontrados.`,
        [{ text: 'OK' }],
        { onDismiss: () => {} }
      );
    } finally {
      setSearching(false);
    }
    return null;
  };

  handleSubmitCity = ({ nativeEvent }) => {
    const city = nativeEvent.text;
    let nextWeekForecast = null;
    if (city) {
      nextWeekForecast = searchForecast(city);
    }
    if (nextWeekForecast) {
      Alert.alert('GetTheWeather', nextWeekForecast.toString());
    }
    setWeatherData(nextWeekForecast);
  };

  return (
    <View>
      <Text style={styles.welcome}>Seja bem-vindo</Text>
      <Text style={styles.searchCaption}>Selecione uma cidade</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setCity(text)}
          value={city}
          clearButtonMode="while-editing"
          maxLength={30}
          underlineColorAndroid="transparent"
          placeholder="Pesquisar por cidade"
          onSubmitEditing={handleSubmitCity}
        />
        <Image source={searchIcon} style={styles.searchIcon} />
      </View>
      {searching && (
        <View style={styles.searchIndicator}>
          <ActivityIndicator
            animating={searching}
            color={colors.secondary}
            size="large"
          />
        </View>
      )}
      {weatherData && weatherData.length && (
        <View style={styles.forecastView}>
          <Text style={styles.forecastText}>Previsão para a semana:</Text>
          <View style={styles.weatherData}>
            {weatherData.map((w, index) => (
              <WeatherWeek data={w} key={index} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  forecastText: {
    ...normalText,
  },
  forecastView: {
    paddingTop: 20,
  },
  searchCaption: { ...bigTextBold },
  searchContainer: {
    height: 40,
    borderColor: colors.lightGray,
    borderWidth: 1,
    ...centerAllFlexRow,
    ...radius,
  },
  searchIcon: {
    padding: 10,
    margin: 15,
    width: 25,
    height: 25,
  },
  searchIndicator: {
    ...centerAllFlexColumn,
  },
  searchInput: {
    flex: 1,
    height: 40,
    margin: 10,
  },
  weatherData: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  welcome: { ...bigText },
});

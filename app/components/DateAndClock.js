import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

import { normalText, normalTextBold } from '../config/StyleProperties';

export default function DateAndClock() {
  const now = moment().utcOffset(-3);
  const [date, setDate] = useState(now.format('DD/MM'));
  const [time, setTime] = useState(now.format('HH:mm'));
  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().utcOffset(-3);
      setDate(now.format('DD/MM'));
      setTime(now.format('HH:mm'));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.clock}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  clock: {
    ...normalText,
  },
  container: {
    alignItems: 'center',
  },
  date: {
    ...normalTextBold,
  },
});

import { View, StyleSheet } from 'react-native';
import React from 'react';

export const HRline: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#adacac',
    borderBottomWidth: 0.8,
  },
});

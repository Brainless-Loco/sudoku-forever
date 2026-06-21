import { StyleSheet, View } from 'react-native';
import React from 'react';
import { MediumSquare } from './MediumSquare';

interface BigSquareProps {
  selectedBtn?: number;
}

export const BigSquare: React.FC<BigSquareProps> = ({ selectedBtn }) => {
  const MediumComp = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.bigSquare}>
      {MediumComp.map((item) => (
        <MediumSquare selectedBtn={selectedBtn} id={item} key={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bigSquare: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 'auto',
    maxHeight: '60%',
    width: 'auto',
    maxWidth: '100%',
    paddingVertical: '2%',
  } as any,
  row: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '100%',
  },
});

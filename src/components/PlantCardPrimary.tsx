import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface DataPlantProps {
  name: string;
  photo: string;
}

interface PlantProps extends RectButtonProps {
  data: DataPlantProps
}

export default function PlantCardPrimary({ data, ...rest }: PlantProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <SvgFromUri
        uri={data.photo}
        width={110}
        height={100}
      />

      <Text style={styles.title}>
        {data.name}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 6,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 15,
    lineHeight: 23,
    marginVertical: 16,
  },
});

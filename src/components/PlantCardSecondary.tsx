import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface DataPlantProps {
	name: string;
	photo: string;
	hour: string;
}

interface PlantProps extends RectButtonProps {
	plant: DataPlantProps
}

export default function PlantCardSecondary({ plant, ...rest }: PlantProps) {
	return (
		<RectButton style={styles.container} {...rest}>
			<View style={styles.leftSide}>
				<SvgFromUri
					uri={plant.photo}
					width={60}
					height={60}
				/>

				<Text style={styles.title}>
					{plant.name}
				</Text>
			</View>

			<View style={styles.rightSide}>
        <Text style={styles.waterd}>Regar às</Text>
        <Text style={styles.hour}>{plant.hour}</Text>
      </View>
		</RectButton>
	);
}

const styles = StyleSheet.create({
	container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: colors.shape,
    marginVertical: 6,
	},
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.heading,
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 23,
    marginLeft: 12
  },
  rightSide: {
    alignItems: 'flex-start',

  },
  waterd: {
    color: colors.body_light,
    fontSize: 13,
    fontFamily: fonts.text
  },
  hour: {
    fontFamily: fonts.heading,
    fontSize: 13,
    color: colors.heading,
  }
});

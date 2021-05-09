import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { loadPlants, PlantProps } from '../libs/storage';
import Header from '../components/Header';
import PlantCardSecondary from '../components/PlantCardSecondary';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterDrop from '../assets/waterdrop.png';

export default function MyPlants() {
	const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [nextWaterd, setNextWaterd] = useState<string>('');

	useEffect(() => {
		async function loadStorageData() {
			const plantsStoraged = await loadPlants();

			const nextTime = formatDistance(
				new Date(plantsStoraged[0].dateNotification).getTime(),
				new Date().getTime(),
				{ locale: ptBR }
			);

			setNextWaterd(
				`Regue a sua ${plantsStoraged[0].name} em ${nextTime}`
			);

      setMyPlants(plantsStoraged);
      setLoading(false);
		}

		loadStorageData();
	}, []);

	return (
		<View style={styles.container}>
			<Header>
				<Text style={styles.headerTitle}>Minhas</Text>
				<Text style={styles.headerTitleBold}>Plantinhas</Text>
			</Header>

			<View style={styles.spotlight}>
				<Image source={waterDrop} style={styles.spotlightImage} />

				<Text style={styles.spotlightText}>{nextWaterd}</Text>
			</View>

			<View style={styles.plantsContainer}>
				<Text style={styles.mainTitle}>Plantas Regadas</Text>

				<FlatList
					data={myPlants}
					keyExtractor={(item) => String(item.id) }
					renderItem={({ item }) => (
            <PlantCardSecondary plant={item}/>
          )}
          showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 30,
		paddingTop: 28,
		backgroundColor: colors.background
	},
	headerTitle: {
		fontSize: 32,
		lineHeight: 36,
		color: colors.heading,
		fontFamily: fonts.light,
	},
	headerTitleBold: {
		fontFamily: fonts.heading,
		color: colors.heading,
		fontSize: 32,
		lineHeight: 36,
	},
	spotlight: {
		flexDirection: 'row',
		alignItems: 'center',
    height: 100,
		borderRadius: 12,

		backgroundColor: colors.blue_light,
		paddingLeft: 16,
		paddingRight: 38,
    marginVertical: 20,
		marginHorizontal: 40,
	},
	spotlightImage: {
		width: 58,
		height: 58,
		marginRight: 20
	},
	spotlightText: {
		fontFamily: fonts.text,
		color: colors.blue,
		fontSize: 15,
		lineHeight: 18,
	},
	plantsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 40,
  },
	mainTitle: {
    fontSize: 26,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 28,
    marginBottom: 24,
  },
});

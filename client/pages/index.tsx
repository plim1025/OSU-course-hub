import { useQuery } from '@apollo/client';
import Head from 'next/head';
import React from 'react';
import { PROFESSORS } from 'utils/graphql';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import RecentComments from '../components/RecentComments';
import HighestRatedProfessor from '../components/HighestRatedProfessor';

const container = {
	marginTop: 100,
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
	flexFlow: 'center',
	alignContent: 'flex-start',
	justifyContent: 'center'
}

const item = {
	maxWidth: 1000,
}

const Home: React.FC = () => {
	const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={false} />
			<Searchbar showButton={true} size='lg' />
			<div style={container}>
				<HighestRatedProfessor style={item} />
				<RecentComments style={item} />
			</div>
		</>
	);
};

export default Home;

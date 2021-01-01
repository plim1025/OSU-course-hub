import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React from 'react';
import { PROFESSORS } from 'utils/graphql';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import RecentComments from '../components/RecentComments';
import HighestRatedProfessor from '../components/HighestRatedProfessor';

const container = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
	flexFlow: 'center',
	alignContent: 'flex-start',
	//margin: 'auto',
}

const Home: React.FC = () => {
	const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	console.log(data);
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={false} />
			<Searchbar showButton={true} size='lg' />
			<div style={container}>
				<HighestRatedProfessor />
				<RecentComments />
			</div>
		</>
	);
};

export default Home;

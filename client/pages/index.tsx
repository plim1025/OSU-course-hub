import { useQuery } from '@apollo/client';
import Head from 'next/head';
import React, {CSSProperties} from 'react';
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
} as React.CSSProperties

const Home: React.FC = () => {
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

import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import MainSearchbar from '../components/MainSearchbar';

const Home: React.FC = () => {
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true}/>
			<MainSearchbar />

		</>
	);
};

export default Home;

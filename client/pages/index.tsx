import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';

const Home: React.FC = () => {
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={false} />
			<Searchbar showButton={true} size='lg' />
		</>
	);
};

export default Home;

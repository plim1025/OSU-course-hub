import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import ProfessorInfo from '../components/ProfessorInfo';

const Home: React.FC = () => {
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={false} />
            <ProfessorInfo />   
		</>
	);
};

export default Home;

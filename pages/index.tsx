import React from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
	return (
		<div>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			Hello World
		</div>
	);
};

export default Home;

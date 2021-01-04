import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import ProfessorInfo from '../components/ProfessorInfo';
import TestingAPI from '../components/TestingAPI';
import { useQuery } from '@apollo/client';
import {PROFESSORS} from 'utils/graphql';

const Info: React.FC = () => {
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
            {/*<ProfessorInfo professor={data.professors[0]}/>*/}
			<TestingAPI professors={data.professors}/>  
		</>
	);
};

export default Info;
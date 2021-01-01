import ProfessorInfo from '../../components/ProfessorInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React from 'react';
import Header from '../../components/Header';
import TestingAPI from '../../components/TestingAPI';
import { ApolloClient, getApolloContext, useQuery } from '@apollo/client';
import {PROFESSORS} from 'utils/graphql';

export default function Professor() {
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
            <ProfessorInfo professors={data.professors}/>
			{/*<TestingAPI professors={data.professors}/>*/}     
		</>
	);
}

export async function getStaticPaths() {
	const { data } = await apolloClient.query({
		query: PROFESSORS,
	});
	const paths = data.professors.map((professor) => `professor/${professor.id}`);
	console.log(paths);
    return {
      paths,
      fallback: false
    }
}
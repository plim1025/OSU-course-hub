import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'react-bootstrap';
import { PROFESSOR, PROFESSOR_COMMENTS } from 'utils/graphql';
import Error from '../../components/404';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import ProfessorInfo from '../../components/ProfessorInfo';

const ProfessorComments = ({ id }) => {
	const { loading, error, data } = useQuery(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(id) },
	});
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const comments = data.professorComments;
	return (
		<Container>
			<h3>Comments:</h3>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</Container>
	);
};

const ProfessorPage = () => {
	const router = useRouter();
	const { loading, error, data } = useQuery(PROFESSOR, {
		variables: { professorID: parseInt(router.query.id as string) },
		skip: !router?.query?.id,
	});

	if (error) {
		return <Error props='professor' />;
	} else if (loading || !data) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<ProfessorInfo professor={data.professor.professor} />
			<ProfessorComments id={data.professor.professor.id} />
		</>
	);
};

export default ProfessorPage;

import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'react-bootstrap';
import { PROFESSOR, PROFESSOR_COMMENTS } from 'utils/graphql';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';
import { CommentData, ProfessorType } from '../../utils/types';

const ProfessorComments = ({ id }) => {
	const { loading, data } = useQuery<CommentData>(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(id) },
	});

	if (loading || !data) {
		return <></>;
	}
	return (
		<Container>
			<h3>Comments:</h3>
			{data.comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</Container>
	);
};

const ProfessorPage = () => {
	const router = useRouter();
	const { loading, data } = useQuery<ProfessorType>(PROFESSOR, {
		variables: {
			professorID: /^\d+$/.test(router.query.id as string)
				? parseInt(router.query.id as string)
				: null,
		},
		skip: !router.query.id,
	});

	if (loading || !router.query.id) {
		return <></>;
	} else if (!data) {
		return <Error statusCode={404} />;
	}
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<Info professor={data.professor} />
			<ProfessorComments id={data.professor.id} />
		</>
	);
};

export default ProfessorPage;

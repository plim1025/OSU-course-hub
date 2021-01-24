import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { PROFESSOR, PROFESSOR_COMMENTS } from 'utils/graphql';
import { CommentType, ProfessorType, CommentData } from '../../utils/types';
import Error from '../../components/404';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';
import AddComment from '../../components/AddComment';

const ProfessorComments = ({ id }) => {
	const { loading, error, data } = useQuery<CommentData>(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(id) },
	});
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
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
	const { loading, error, data } = useQuery<ProfessorType>(PROFESSOR, {
		variables: { professorID: parseInt(router.query.id as string) },
		skip: !router.query.id,
	});

	if (error || !data) {
		return <Error props='professor' />;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<Info professor={data.professor} />
			<AddComment />
			<ProfessorComments id={data.professor.id} />
		</>
	);
};

export default ProfessorPage;

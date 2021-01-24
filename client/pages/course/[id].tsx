import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { COURSE, COURSE_COMMENTS } from 'utils/graphql';
import { CommentData, CourseType } from '../../utils/types';
import Error from '../../components/404';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';
import AddComment from '../../components/AddComment';

const CourseComments = ({ id }) => {
	const { loading, error, data } = useQuery<CommentData>(COURSE_COMMENTS, {
		variables: { courseID: parseInt(id) },
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

const CoursePage = () => {
	const router = useRouter();
	const { loading, error, data } = useQuery<CourseType>(COURSE, {
		variables: { courseID: parseInt(router.query.id as string) },
		skip: !router.query.id,
	});

	if (error || !data) {
		return <Error props='course' />;
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
			<Info course={data.course} />
			<AddComment />
			<CourseComments id={data.course.id} />
		</>
	);
};

export default CoursePage;

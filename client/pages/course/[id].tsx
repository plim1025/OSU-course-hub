import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'react-bootstrap';
import { COURSE, COURSE_COMMENTS } from 'utils/graphql';
import Error from '../../components/404';
import Comment from '../../components/Comment';
import CourseInfo from '../../components/CourseInfo';
import Header from '../../components/Header';

const CourseComments = ({ id }) => {
	const { loading, error, data } = useQuery(COURSE_COMMENTS, {
		variables: { courseID: parseInt(id) },
	});
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const comments = data.courseComments;
	return (
		<Container>
			<h3>Comments:</h3>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} />
			))}
		</Container>
	);
};

const CoursePage = () => {
	const router = useRouter();
	const { loading, error, data } = useQuery(COURSE, {
		variables: { courseID: parseInt(router.query.id as string) },
	});

	if (error) {
		return <Error props='course' />;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<CourseInfo course={data.course.course} />
			<CourseComments id={data.course.course.id} />
		</>
	);
};

export default CoursePage;

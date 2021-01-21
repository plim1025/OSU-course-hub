import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import { useQuery } from '@apollo/client';
import {COURSES, COURSE, COURSE_COMMENTS} from 'utils/graphql';
import Comment from '../../components/Comment';
import { useRouter } from 'next/router'
import { Container, Spinner } from 'react-bootstrap';
=======
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'react-bootstrap';
import { COURSE, COURSE_COMMENTS } from 'utils/graphql';
import { CommentData, CourseType } from '../../utils/types';
>>>>>>> 03772be3945398d75ef7cdc63b9d68818871ff2b
import Error from '../../components/404';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';

const CourseComments = ({ id }) => {
	const { loading, error, data } = useQuery<CommentData>(COURSE_COMMENTS, {
		variables: { courseID: parseInt(id) },
	});

	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
<<<<<<< HEAD
		return <Spinner animation="border" size="sm" />;
    }
    const comments = data.courseComments;
=======
		return <div>Loading...</div>;
	}
>>>>>>> 03772be3945398d75ef7cdc63b9d68818871ff2b
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
<<<<<<< HEAD
	const {id} = router.query;
	const { loading, error, data } = useQuery(COURSES);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}	
	var course = null;
	if(data){
		const courses = data.courses.filter((course) => course.id == id);
		course = courses[0];
	}
	if(course){
		return (
			<>
				<Head>
					<title>OSU Course Hub</title>
					<link rel='icon' href='/favicon.png' />
				</Head>
				<Header searchbarToggled={true} />
				<CourseInfo course={course}/>
                <CourseComments id={course.id}/>
			</>
		);
	}
	else {
		return (
			<Error props="course"/>
		)
=======
	const { loading, error, data } = useQuery<CourseType>(COURSE, {
		variables: { courseID: parseInt(router.query.id as string) },
		skip: !router.query.id,
	});

	if (error || !data) {
		return <Error props='course' />;
	} else if (loading) {
		return <div>Loading...</div>;
>>>>>>> 03772be3945398d75ef7cdc63b9d68818871ff2b
	}
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<Info course={data.course} />
			<CourseComments id={data.course.id} />
		</>
	);
};

export default CoursePage;

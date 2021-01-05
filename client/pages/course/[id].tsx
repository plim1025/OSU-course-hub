import CourseInfo from '../../components/CourseInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import TestingAPI from '../../components/TestingAPI';
import { ApolloClient, getApolloContext, useQuery } from '@apollo/client';
import {COURSES, COURSE, COURSE_COMMENTS} from 'utils/graphql';
import Comment from '../../components/Comment';
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap';

const CourseComments = () => {
    const { loading, error, data } = useQuery(COURSE_COMMENTS, {
        variables: {courseID: 1}
    });
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.courseComments;
    console.log(comments);
	return (
		<Container style={{ height: '1000px' }}>
			{comments.map((comment, i: number) => {
				return <Comment key={i} props={comment} />;
			})}
		</Container>
	);
}

export default function Course() {
	const router = useRouter();
	/*const [queryId, setQueryId] = useState(null)
	useEffect(() => {
		if(router && router.query) {
		setQueryId(router.query.id)
		}
	}, [router]);
	console.log(queryId);*/
	const {id} = router.query;
	console.log(id);
    /*const {data} = useQuery(COURSE, {
        variables: {courseID: id},
    });
	console.log(data);
	const course = null;
	if(data){
		course = data.course.course;
		console.log(course);
	}*/
	const { loading, error, data } = useQuery(COURSES);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}	
	console.log(data);
	var course = null;
	if(data){
		const courses = data.courses.filter(course => course.id == id);
		course = courses[0];
	}
	if(course){
		return (
			<>
				<Head>
					<title>OSU Course Hub</title>
					<link rel='icon' href='/favicon.png' />
				</Head>
				<Header searchbarToggled={false} />
				<CourseInfo course={course}/>
                <CourseComments />
			</>
		);
	}
	else {
		return (
			<div>
				<h3>404 Error: Page does not exist</h3>
			</div>
		)
	}
}
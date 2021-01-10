import CourseInfo from '../../components/CourseInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import { useQuery } from '@apollo/client';
import {COURSES, COURSE, COURSE_COMMENTS} from 'utils/graphql';
import Comment from '../../components/Comment';
import { useRouter } from 'next/router'
import { Container, Spinner } from 'react-bootstrap';
import Error from '../../components/404';
interface CommentI {
    ONID: number;
    baccCore: boolean;
    campus: string;
    courseID: number;
    createdAt: Date;
    dislikes: number;
    gradeReceived: string;
    id: string;
    likes: number;
    professorID: number;
    recommend: boolean;
    tags: string[];
    text: string;
    quality: number;
    difficulty: number;
}

interface Course {
    id: number,
    department: string,
    number: number,
}

const CourseComments = ({id}) => {
    const { loading, error, data } = useQuery(COURSE_COMMENTS, {
        variables: {courseID: parseInt(id)}
    });
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
    }
    const comments = data.courseComments;
	return (
		<Container>
            <h3>Comments:</h3>
			{comments.map((comment: CommentI, i: number) => {
				return <Comment key={i} props={comment} />;
			})}
		</Container>
	);
}

export default function Course() {
	const router = useRouter();
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
	}
}
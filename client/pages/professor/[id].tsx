import ProfessorInfo from '../../components/ProfessorInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import { useQuery } from '@apollo/client';
import {PROFESSORS, PROFESSOR, PROFESSOR_COMMENTS} from 'utils/graphql';
import { useRouter } from 'next/router'
import Comment from '../../components/Comment';
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

const ProfessorComments = ({id}) => {
    const { loading, error, data } = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: parseInt(id)}
    });
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
    }
    const comments = data.professorComments;
    console.log(comments);
	return (
		<Container>
			<h3>Comments:</h3>
			{comments.map((comment: CommentI, i: number) => {
				return <Comment key={i} props={comment} />;
			})}
		</Container>
	);
}

export default function Professor() {
	const router = useRouter();
	const {id} = router.query;
	const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}	
	var professor = null;
	if(data){
		const professors = data.professors.filter((professor) => professor.id == id);
		professor = professors[0];
	}
	if(professor){
		return (
			<>
				<Head>
					<title>OSU Course Hub</title>
					<link rel='icon' href='/favicon.png' />
				</Head>
				<Header searchbarToggled={true} />
				<ProfessorInfo professor={professor}/>
				<ProfessorComments id={professor.id} />
			</>
		);
	}
	else {
		return (
			<Error props="professor"/>
		)
	}
}
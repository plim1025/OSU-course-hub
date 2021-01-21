import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import { useQuery } from '@apollo/client';
import {PROFESSORS, PROFESSOR, PROFESSOR_COMMENTS} from 'utils/graphql';
import { useRouter } from 'next/router'
import Comment from '../../components/Comment';
import { Container, Spinner } from 'react-bootstrap';
=======
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from 'react-bootstrap';
import { PROFESSOR, PROFESSOR_COMMENTS } from 'utils/graphql';
import { CommentType, ProfessorType } from '../../utils/types';
>>>>>>> 03772be3945398d75ef7cdc63b9d68818871ff2b
import Error from '../../components/404';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';

const ProfessorComments = ({ id }) => {
	const { loading, error, data } = useQuery<CommentType>(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(id) },
	});
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
<<<<<<< HEAD
		return <Spinner animation="border" size="sm" />;
    }
    const comments = data.professorComments;
    console.log(comments);
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

const ProfessorPage = () => {
	const router = useRouter();
<<<<<<< HEAD
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
=======
	const { loading, error, data } = useQuery<ProfessorType>(PROFESSOR, {
		variables: { professorID: parseInt(router.query.id as string) },
		skip: !router.query.id,
	});

	if (error || !data) {
		return <Error props='professor' />;
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
			<Info professor={data.professor} />
			<ProfessorComments id={data.professor.id} />
		</>
	);
};

export default ProfessorPage;

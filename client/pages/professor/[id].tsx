import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { PROFESSOR, PROFESSOR_COMMENTS } from 'utils/graphql';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';
import { CommentData, ProfessorType } from '../../utils/types';
import AddComment from '../../components/AddComment';

const ProfessorComments = ({ prof_comments, updateProfessor }) => {
	/*const { loading, data } = useQuery<CommentData>(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(id) },
	});*/
	const [comments, setComments] = useState(prof_comments);

	console.log("here")

	useEffect(() => {
		console.log("here2")
	
		setComments(prof_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
	})
	
	console.log(prof_comments)
	console.log(comments)

	const deleteOneComment = (commentID: number) => {
		console.log(commentID)
		console.log("here")

		setComments(comments.filter((comment) => commentID != parseInt(comment['id'])))
		updateProfessor(comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
	}

	return (
		<Container>
			<AddComment />
			<h3>Comments:</h3>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} deleteOneComment={deleteOneComment} />
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

	const { loading: loading_comments, data: data_comments } = useQuery<CommentData>(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(router.query.id as string) },
	});

	const [professor, setProfessor] = useState()
	const [comments, setComments] = useState([])
	const [update, setUpdate] = useState(0)

	useEffect(() => {
		if(data){
			setProfessor(data.professor)
		}
		if(data_comments){
			setComments(data_comments.comments)
		}
	}, [data, data_comments])

	if (loading || loading_comments || !router.query.id) {
		return <></>;
	} else if (!data) {
		return <Error statusCode={404} />;
	}

	const updateProfessor = (updated_comments) => {
		console.log("here3")
		//setUpdate(1)
		setComments(updated_comments)
	}

	console.log("here4")
	console.log(professor)

	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<Info professor={data.professor} comments={comments} />
			<ProfessorComments prof_comments={comments} updateProfessor={updateProfessor} />
		</>
	);
};

export default ProfessorPage;

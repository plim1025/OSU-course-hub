import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from 'next/error';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';
import { PROFESSOR, PROFESSOR_COMMENTS, STUDENT_COMMENTS, COMMENTS } from 'utils/graphql';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';
import { CommentData, ProfessorType, CommentType } from '../../utils/types';
import AddComment from '../../components/AddComment';

const ProfessorComments = ({ prof_comments, updateProfessor, updateAllComments, all_comments }) => {
	const [comments, setComments] = useState(prof_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
	const [allComments, setAllComments] = useState(all_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)).reverse());
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {	
		setComments(prof_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
		setAllComments(all_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)).reverse());
	}, [prof_comments, all_comments])
	
	if (!comments) {
		return <></>;
	}

	const newComment = {
		marginBottom: '30px',
	}

	const addOneComment = (comment: CommentType) => {
		comments.unshift(comment)
		allComments.unshift(comment)
		updateProfessor(comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
		updateAllComments(allComments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
	}

	const deleteOneComment = (commentID: number) => {
		//setComments(comments.filter((comment) => commentID != parseInt(comment['id'])))
		const updated_comments = comments.filter((comment) => commentID != parseInt(comment['id']))
		updateProfessor(updated_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
	}

	const checkIfStudentComment = () => {
		const studentID = window.sessionStorage.getItem('request-onid');

		if(comments.filter((comment) => comment.ONID == studentID).length == 0)
			return false
		else
			return true

	}

	console.log(allComments)

	return (
		<Container>
			{!checkIfStudentComment() &&
			(<Button variant='outline-info' onClick={handleShow} style={newComment}>
				New Comment
			</Button>)}
			<AddComment show={show} setShow={setShow} handleClose={handleClose} addOneComment={addOneComment} comments={allComments}/>
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

	const { loading: loading_all_comments, data: data_all_comments } = useQuery<CommentData>(COMMENTS);

	const [professor, setProfessor] = useState()
	const [comments, setComments] = useState([])
	const [allComments, setAllComments] = useState([])

	useEffect(() => {
		if(data){
			setProfessor(data.professor)
		}
		if(data_comments){
			setComments(data_comments.comments)
		}
		if(data_all_comments){
			setAllComments(data_all_comments.comments);
		}
	}, [data, data_comments])

	if (loading || loading_comments  || loading_all_comments || !router.query.id) {
		return <></>;
	} else if (!data) {
		return <Error statusCode={404} />;
	}

	const updateAllComments = (updated_comments) => {
		setAllComments(updated_comments)
	}

	const updateProfessor = (updated_comments) => {
		setComments(updated_comments)
	}

	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<Info professor={data.professor} comments={comments} />
			<ProfessorComments prof_comments={comments} updateProfessor={updateProfessor} 
				updateAllComments={updateAllComments} all_comments={allComments} />
		</>
	);
};

export default ProfessorPage;

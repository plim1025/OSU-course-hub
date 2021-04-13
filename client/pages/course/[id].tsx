import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import { Container, Button } from 'react-bootstrap';
import { COURSE, COURSE_COMMENTS, COMMENTS } from 'utils/graphql';
import Comment from '../../components/Comment';
import Header from '../../components/Header';
import Info from '../../components/Info';
import { CommentData, CourseType, CommentType } from '../../utils/types';
import AddComment from '../../components/AddComment';

const CourseComments = ({ course_comments, all_comments, updateComments, updateAllComments }) => {
	const [comments, setComments] = useState(course_comments);
	const [allComments, setAllComments] = useState(all_comments);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {	
		setComments(course_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
		setAllComments(all_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)).reverse());
	}, [course_comments, all_comments])
	
	if (!comments) {
		return <></>;
	}

	const newComment = {
		marginBottom: '30px',
	}

	const addOneComment = (comment: CommentType) => {
		comments.unshift(comment)
		allComments.unshift(comment)
		updateComments(comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
		updateAllComments(allComments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
	}

	const deleteOneComment = (commentID: number) => {
		const updated_comments = comments.filter((comment) => commentID != parseInt(comment['id']))
		updateComments(updated_comments.slice().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
	}

	const checkIfStudentHasComment = () => {
		const studentID = window.sessionStorage.getItem('request-onid');

		return comments.filter((comment) => comment.ONID == studentID).length == 0 ? false : true

	}

	return (
		<Container>
			{!checkIfStudentHasComment() &&
			(<Button variant='outline-info' onClick={handleShow} style={newComment}>
				New Comment
			</Button>)}
			<AddComment show={show} setShow={setShow} handleClose={handleClose} addOneComment={addOneComment} />
			<h3>Comments:</h3>
			{comments.map(comment => (
				<Comment key={comment.id} comment={comment} deleteOneComment={deleteOneComment} />
			))}
		</Container>
	);
};

const CoursePage = () => {
	const router = useRouter();
	const { loading, data } = useQuery<CourseType>(COURSE, {
		variables: {
			courseID: /^\d+$/.test(router.query.id as string)
				? parseInt(router.query.id as string)
				: null,
		},
		skip: !router.query.id,
	});

	const { loading: loading_comments, data: data_comments } = useQuery<CommentData>(COURSE_COMMENTS, {
		variables: { courseID: parseInt(router.query.id as string) },
	});

	const { loading: loading_all_comments, data: data_all_comments } = useQuery<CommentData>(COMMENTS);

	const [course, setCourse] = useState<any>()
	const [comments, setComments] = useState<any>([])
	const [allComments, setAllComments] = useState<any>([])

	useEffect(() => {
		if(data){
			setCourse(data.course)
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

	const updateComments = (updated_comments) => {
		setComments(updated_comments)
	}

	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<Info course={course} comments={comments} />
			<CourseComments course_comments={comments} all_comments={allComments} 
				updateComments={updateComments} updateAllComments={updateAllComments} />
		</>
	);
};

export default CoursePage;

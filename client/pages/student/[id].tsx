import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import StudentInfo from '../../components/StudentInfo';
import { STUDENT, STUDENT_COMMENTS } from '../../utils/graphql';
import { StudentType, CommentData } from '../../utils/types';
import Comment from '../../components/Comment';

const StudentPage = () => {
	const router = useRouter();
	console.log(router.query.id)
	const { loading, data } = useQuery<StudentType>(STUDENT, {
		variables: {
			ONID: router.query.id
			/*ONID: /^\d+$/.test(router.query.id as string)
				? parseInt(router.query.id as string)
				: null,*/
		},
		skip: !router.query.id,
	});

	const { loading: loading_comments, data: data_comments } = useQuery<CommentData>(STUDENT_COMMENTS, {
		variables: { ONID: router.query.id },
	});

	const [student, setStudent] = useState()
	const [comments, setComments] = useState([])

	useEffect(() => {
		if(data){
			setStudent(data.student)
		}
		if(data_comments){
			setComments(data_comments.comments)
		}
	}, [data, data_comments])

	if (loading || loading_comments ||  !router.query.id) {
		return <></>;
	} else if (!data) {
		return <Error statusCode={404} />;
	}

	const deleteOneComment = (commentID: number) => {
		setComments(comments.filter((comment) => commentID != parseInt(comment['id'])))
	}

	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<Container>
				<StudentInfo student={student} comments={comments} />
				{comments.slice().reverse().map(comment => <Comment key={comment.id} comment={comment} deleteOneComment={deleteOneComment} />)}
			</Container>
		</>
	);
};

export default StudentPage;

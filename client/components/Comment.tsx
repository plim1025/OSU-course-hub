import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Spinner } from 'react-bootstrap';
import { DISLIKE_COMMENT, LIKE_COMMENT, DELETE_COMMENT, STUDENT, COURSE, PROFESSOR } from 'utils/graphql';
import { CommentType, StudentType } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';

/*
var styles = {
	delete_icon: {
		marginLeft: '10px',
		marginTop: '3px',
		color: 'red',
		':hover': {
			cursor: 'pointer',
			color: '#943984',
		}
	}
}*/

interface Props {
	comment: CommentType;
	deleteOneComment: (commentID: number) => void;
}

const Comment: React.FC<Props> = ({ comment, deleteOneComment }) => {
	const studentID = window.sessionStorage.getItem('request-onid');
	const { loading, data } = useQuery<StudentType>(STUDENT, {
		variables: { ONID: studentID },
		skip: !studentID,
	});

	const { loading: prof_course_loading, data: prof_course_data } = useQuery(comment.courseID ? COURSE : PROFESSOR, {
		variables: {
			...(comment.courseID && { courseID: comment.courseID }),
			...(comment.professorID && { professorID: comment.professorID }),
		},
	});

	const [initLikeOrDislike, setInitLikeOrDislike] = useState(0);
	const [likeOrDislike, setLikeOrDislike] = useState(0);
	const [addLike] = useMutation(LIKE_COMMENT);
	const [addDislike] = useMutation(DISLIKE_COMMENT);
	const [deleteComment] = useMutation(DELETE_COMMENT);
	useEffect(() => {
		if (data) {
			if (data.student.likedCommentIDs.indexOf(parseInt(comment.id)) !== -1) {
				setInitLikeOrDislike(1)
				setLikeOrDislike(1);
			} else if (data.student.dislikedCommentIDs.indexOf(parseInt(comment.id)) !== -1) {
				setInitLikeOrDislike(-1)
				setLikeOrDislike(-1);
			} else {
				setInitLikeOrDislike(0)
				setLikeOrDislike(0);
			}
		}
	}, [data]);

	if (loading || prof_course_loading || (studentID && !data) || !prof_course_data) {
		return <></>;
	}

	return (
		<Card className='shadow mt-5 mb-4 p-4 w-75'>
			<Row className='pl-3 pr-4'>
				{(Router.pathname !== "/student/[id]") ? 
				<Card.Title className='lead' style={{ fontSize: '1.5rem' }}>
					{comment.anonymous ? 'Anonymous' : comment.ONID}
				</Card.Title> : ((comment.professorID) ? 
				<Card.Title className='lead' style={{ fontSize: '1.5rem' }}>
					{prof_course_data.professor.firstName} {prof_course_data.professor.lastName}
				</Card.Title> : 
				<Card.Title className='lead' style={{ fontSize: '1.5rem' }}>
					{prof_course_data.course.department} {prof_course_data.course.number}
				</Card.Title>)}
				<Card.Text className='text-right ml-auto text-muted'>
					<strong>Created At</strong> {new Date(comment.createdAt).toDateString()}
				</Card.Text>
				{studentID === comment.ONID ? <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => {
					console.log(comment)
					deleteComment({variables: {commentID: parseInt(comment.id)}})
					deleteOneComment(parseInt(comment.id))
					//window.location.reload(true)
				}} /> : null}
			</Row>
			<Card.Text className='mt-2 text-left' style={{ whiteSpace: 'pre-wrap' }}>
				<strong>Campus: </strong>
				{comment.campus ? comment.campus : 'N/A'}
				{'  '}
				<strong>Recommend: </strong>
				{comment.recommend ? 'Yes' : 'No'}
				{'  '}
				<strong>Grade Received: </strong>
				{comment.gradeReceived ? comment.gradeReceived : 'N/A'}
				{'  '}
				<strong>Bacc Core: </strong>
				{comment.baccCore ? 'Yes' : 'No'}
			</Card.Text>
			<Card.Text className='h4 pt-1 pb-2' style={{ whiteSpace: 'pre-wrap' }}>
				Quality: {comment.quality}
				{'  '}Difficulty: {comment.difficulty}
			</Card.Text>
			<div className='mt-2'>
				<span>Tags: {comment.tags.length == 0 ? 'No tags found' : null}</span>
				{comment.tags.map(tag => (
					<span key={tag} className='border rounded border-info ml-2 p-1'>
						<span style={{ marginRight: 5 }}>{tag}</span>
					</span>
				))}
			</div>
			<Card.Text className='mt-3'>Text: {comment.text}</Card.Text>
			<Card.Text>
				Likes: {comment.likes + (initLikeOrDislike === 1 ? -1 : 0) + (likeOrDislike === 1 ? 1 : 0)} Dislikes:{' '}
				{comment.dislikes + (initLikeOrDislike === -1 ? -1 : 0) + (likeOrDislike === -1 ? 1 : 0)}
			</Card.Text>
			{studentID && (
				<Row className='pl-3'>
					{(comment.ONID === studentID) ?
					null :
						<div>
						<Button
						className='mr-3'
						variant={likeOrDislike === 1 ? 'primary' : 'outline-primary'}
						onClick={() => {
							addLike({
								variables: { ONID: studentID, commentID: parseInt(comment.id) },
							});
							setLikeOrDislike(likeOrDislike === 1 ? 0 : 1);
						}}
						>
							Like
						</Button>
						<Button
						className='mr-3'
						variant={likeOrDislike === -1 ? 'primary' : 'outline-primary'}
						onClick={() => {
							addDislike({
								variables: { ONID: studentID, commentID: parseInt(comment.id) },
							});
							setLikeOrDislike(likeOrDislike === -1 ? 0 : -1);
						}}
						>
							Dislike
						</Button></div>			
					}
				</Row>
			)}
		</Card>
	);
};

export default Comment;

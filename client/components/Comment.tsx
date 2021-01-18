import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { DISLIKECOMMENT, LIKECOMMENT, STUDENT } from 'utils/graphql';
import { CommentType, StudentData } from '../utils/types';

interface Props {
	comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
	const studentID = window.sessionStorage.getItem('request-onid');
	const { loading, error, data } = useQuery<StudentData>(STUDENT, {
		variables: { ONID: studentID },
		skip: !studentID,
	});
	// const { loading, error, data } = useQuery(comment.courseID ? COURSE : PROFESSOR, {
	// 	variables: {
	// 		...(comment.courseID && { courseID: comment.courseID }),
	// 		...(comment.professorID && { professorID: comment.professorID }),
	// 	},
	// });

	const [likeOrDislike, setLikeOrDislike] = useState(0);
	const [addLike] = useMutation(LIKECOMMENT);
	const [addDislike] = useMutation(DISLIKECOMMENT);

	useEffect(() => {
		if (data) {
			if (data.student.student.likedCommentIDs.indexOf(parseInt(comment.id)) !== -1) {
				setLikeOrDislike(1);
			} else if (
				data.student.student.dislikedCommentIDs.indexOf(parseInt(comment.id)) !== -1
			) {
				setLikeOrDislike(-1);
			} else {
				setLikeOrDislike(0);
			}
		}
	}, [data]);

	if (loading) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>Error in Comment component</div>;
	}
	return (
		<Card className='shadow mt-5 mb-4 p-4 w-75'>
			<Row className='pl-3 pr-4'>
				<Card.Title className='lead' style={{ fontSize: '1.5rem' }}>
					{/* {comment.anonymous ? '' : comment.ONID} */}
					{comment.ONID}
				</Card.Title>
				<Card.Text className='text-right ml-auto text-muted'>
					<strong>Created At</strong> {new Date(comment.createdAt).toDateString()}
				</Card.Text>
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
				Likes: {comment.likes} Dislikes: {comment.dislikes}
			</Card.Text>
			{studentID && (
				<Row className='pl-3'>
					<Button
						className='mr-3'
						variant={likeOrDislike === 1 ? 'primary' : 'outline-primary'}
						onClick={() => {
							console.log(studentID, parseInt(comment.id));
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
					</Button>
				</Row>
			)}
		</Card>
	);
};

export default Comment;

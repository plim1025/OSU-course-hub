import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { COURSE, PROFESSOR, STUDENT, LIKECOMMENT, DISLIKECOMMENT } from 'utils/graphql';

interface Props {
	props: {
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
	};
}

const Comment: React.FC<Props> = props => {
	const studentID = window.sessionStorage.getItem('request-onid');
	let student = useQuery(STUDENT, { variables: { ONID: studentID } });
	const data = props.props;

	const [likeOrDislike, setLikeOrDislike] = useState(0);
	const [addLike, { likedStudent }] = useMutation(LIKECOMMENT);
	const [addDislike, { dislikedStudent }] = useMutation(DISLIKECOMMENT);

	const date = new Date(data.createdAt);

	// Fetch professor name or course name
	let fetchedData;
	if (data.courseID) {
		fetchedData = useQuery(COURSE, {
			variables: { courseID: data.courseID },
		});
		if (fetchedData.data) {
			fetchedData = fetchedData.data.course;
		}
	}

	if (data.professorID) {
		fetchedData = useQuery(PROFESSOR, {
			variables: { professorID: data.professorID },
		});
		if (fetchedData.data) {
			fetchedData = fetchedData.data.professor;
		}
	}

	useEffect(() => {
		if (student && student.data) {
			if (student?.data.student.student.likedComments.indexOf(parseInt(data.id)) !== -1) {
				setLikeOrDislike(1);
			} else if (
				student?.data.student.student.dislikedComments.indexOf(parseInt(data.id)) !== -1
			) {
				setLikeOrDislike(-1);
			} else {
				setLikeOrDislike(0);
			}
		}
	}, [student]);

	return (
		<Card className='shadow mt-5 mb-4 p-4 w-75'>
			<Row className='pl-3 pr-4'>
				{fetchedData.course && (
					<Card.Title className='lead' style={{ fontSize: '1.5rem' }}>
						{fetchedData.course.department} {fetchedData.course.number}
					</Card.Title>
				)}
				{fetchedData.professor && (
					<Card.Title className='lead' style={{ fontSize: '1.5rem' }}>
						{fetchedData.professor.firstName} {fetchedData.professor.lastName}
					</Card.Title>
				)}
				<Card.Text className='text-right ml-auto text-muted'>
					<strong>Created At</strong> {date.toDateString()}
				</Card.Text>
			</Row>
			<Card.Text className='mt-2 text-left' style={{ whiteSpace: 'pre-wrap' }}>
				<strong>Campus:</strong> {data.campus ? data.campus : 'N/A'}
				{'  '}
				<strong>Recommend:</strong> {data.recommend ? 'Yes' : 'No'}
				{'  '}
				<strong>Grade Received</strong>: {data.gradeReceived ? data.gradeReceived : 'N/A'}
				{'  '}
				<strong>Bacc Core:</strong> {data.baccCore ? 'Yes' : 'No'}
			</Card.Text>
			<Card.Text className='h4 pt-1 pb-2' style={{ whiteSpace: 'pre-wrap' }}>
				Quality: {data.quality}
				{'  '}Difficulty: {data.difficulty}
			</Card.Text>
			<div className='mt-2'>
				<span>Tags: </span>
				{data.tags.map((tag: string, i) => {
					return (
						<span key={i} className='border rounded border-info ml-2 p-1'>
							{tag}{' '}
						</span>
					);
				})}
			</div>
			<Card.Text className='mt-3'>Text: {data.text}</Card.Text>
			<Card.Text>
				Likes: {data.likes} Dislikes: {data.dislikes}
			</Card.Text>
			{studentID && (
				<Row className='pl-3'>
					<Button
						className='mr-3'
						variant={likeOrDislike === 1 ? 'primary' : 'outline-primary'}
						onClick={() => {
							const id = parseFloat(data.id);
							addLike({ variables: { ONID: studentID, commentID: id } });
							setLikeOrDislike(likeOrDislike === 1 ? 0 : 1);
						}}
					>
						Like
					</Button>
					<Button
						className='mr-3'
						variant={likeOrDislike === -1 ? 'primary' : 'outline-primary'}
						onClick={() => {
							const id = parseFloat(data.id);
							addDislike({ variables: { ONID: studentID, commentID: id } });
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

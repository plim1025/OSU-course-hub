import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { COURSE, PROFESSOR, LIKE, DISLIKE } from 'utils/graphql';

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

const Searchbar: React.FC<Props> = props => {
	const data = props.props;
	const date = new Date(data.createdAt);
	const [addLike, { likeCount }] = useMutation(LIKE);
	const [addDislike, { dislikeCount }] = useMutation(DISLIKE);

	// Fetch professor name or course name
	let fetchedData;
	if (data.courseID) {
		fetchedData = useQuery(COURSE, {
			variables: { id: data.courseID },
		});
		if (fetchedData.data) {
			fetchedData = fetchedData.data.course;
		}
	}

	if (data.professorID) {
		fetchedData = useQuery(PROFESSOR, {
			variables: { id: data.professorID },
		});
		if (fetchedData.data) {
			fetchedData = fetchedData.data.professor;
		}
	}

	// Issue: Connect to login, user can only choose like or dislike and clicking like/dislike 2nd time should cancel it.
	// 		  Add quality and difficulty (done)
	//        Style the Components (done)
	//		  Display N/A for the field (done)
	//		  Change to Card (done)

	return (
		<Card className='shadow mt-5 mb-4 p-4 w-75' /*style={{ width: '1000px' }}*/>
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
				<strong>Campus:</strong> {data.campus}
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
			<Row className='pl-3'>
				<Button
					className='mr-3'
					variant='outline-primary'
					onClick={() => {
						const id = parseFloat(data.id);
						addLike({ variables: { id } });
					}}
				>
					Like
				</Button>
				<Button
					className='mr-3'
					variant='outline-primary'
					onClick={() => {
						const id = parseFloat(data.id);
						addDislike({ variables: { id } });
					}}
				>
					Dislike
				</Button>
			</Row>
		</Card>
	);
};

export default Searchbar;

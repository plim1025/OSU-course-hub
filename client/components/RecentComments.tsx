import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Row, Spinner } from 'react-bootstrap';
import { CommentData } from '../utils/types';
import { COMMENTS } from '../utils/graphql';
import RecentCommentTitle from './RecentCommentTitle';

const date = {
	margin: 0,
	color: '#4a4a4a',
}

const RecentComments: React.FC = () => {
	const { loading, data } = useQuery<CommentData>(COMMENTS);

	if (loading || !data) {
		return <></>;
	}

	var comments = [...data.comments]
	comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

	return (
		<div
			style={{
				width: '50%',
				padding: '10px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				maxWidth: '1000px',
			}}
			className='border'
		>
			<h4 style={{ textAlign: 'center', padding: '10px' }}>Recent Comments:</h4>
			{comments
				.slice(0, Math.min(4, data.comments.length))
				.map(comment => (
					<Card
						style={{ width: '80%', padding: '10px', marginTop: '10px' }}
						bg='light'
						border='dark'
						key={comment.id}
					>
						<Row className='pl-3 pr-4'>
							<RecentCommentTitle
								courseID={comment.courseID}
								professorID={comment.professorID}
							/>
							<Card.Text style={date} className='text-right ml-auto'>
								{new Date(comment.createdAt).toDateString()}
							</Card.Text>
						</Row>
						<br />
						<Card.Text>{comment.text}</Card.Text>
					</Card>
				))}
		</div>
	);
};

export default RecentComments;

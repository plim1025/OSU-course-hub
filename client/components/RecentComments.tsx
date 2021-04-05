import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Row, Spinner } from 'react-bootstrap';
import { CommentData } from '../utils/types';
import { COMMENTS } from '../utils/graphql';
import RecentCommentTitle from './RecentCommentTitle';

const RecentComments: React.FC = () => {
	const { loading, data } = useQuery<CommentData>(COMMENTS);

	if (loading || !data) {
		return <></>;
	}
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
			{data.comments
				.slice(0, Math.min(4, data.comments.length))
				.reverse()
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
							<Card.Text className='text-right ml-auto'>
								Created on: <b>{new Date(comment.createdAt).toDateString()}</b>
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

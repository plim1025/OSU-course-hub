import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { STUDENT_COMMENTS } from '../utils/graphql';
import { CommentData, Student } from '../utils/types';
import Comment from './Comment';

interface Props {
	student: Student;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const StudentInfo: React.FC<Props> = props => {
	const { student } = props;
	const { loading, error, data } = useQuery<CommentData>(STUDENT_COMMENTS, {
		variables: { ONID: student.ONID },
	});

	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<Container>
				<Card className='mt-5 mb-4 p-4 w-75'>
					<h3>ONID: {student.ONID}</h3>
					<h5>Comments: {data ? data.comments.length : 0}</h5>
					<h5>
						Liked comments: {student.likedComments ? student.likedComments.length : 0}
					</h5>
					<h5>
						Disliked comments:{' '}
						{student.dislikedComments ? student.dislikedComments.length : 0}
					</h5>
				</Card>
				{data
					? data.comments.map(comment => <Comment key={comment.id} comment={comment} />)
					: null}
			</Container>
		</div>
	);
};

export default StudentInfo;

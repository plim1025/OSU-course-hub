import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { COMMENTS, COURSE, PROFESSOR } from '../utils/graphql';
import { CommentType } from '../utils/types';

interface SpecificTitleProps {
	id: number;
}

interface TitleProps {
	comment: CommentType;
}

const ProfessorTitle = ({ id }: SpecificTitleProps) => {
	const { loading, error, data } = useQuery(PROFESSOR, {
		variables: { professorID: parseInt(id) },
	});
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const professor = data.professor.professor;
	return (
		<div>
			<h5>
				<b>
					{professor.firstName} {professor.lastName}
				</b>
			</h5>
		</div>
	);
};

const CourseTitle = ({ id }: SpecificTitleProps) => {
	const { loading, error, data } = useQuery(COURSE, { variables: { courseID: parseInt(id) } });
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const course = data.course.course;
	return (
		<div>
			<h5>
				<b>
					{course.department} {course.number}
				</b>
			</h5>
		</div>
	);
};

const Title = ({ comment }: TitleProps) => {
	if (comment.courseID === null) {
		return <ProfessorTitle id={comment.professorID} />;
	} else {
		return <CourseTitle id={comment.courseID} />;
	}
};

const RecentComments: React.FC = () => {
	const { loading, error, data } = useQuery(COMMENTS);
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const recentComments = data.comments.slice(0, Math.min(4, data.comments.length));
	recentComments.reverse();
	let time, formattedDate;
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
			{recentComments.map((comment: CommentType) => {
				time = Date.parse(comment.createdAt);
				formattedDate = new Date(time);
				return (
					<Card
						style={{ width: '80%', padding: '10px', marginTop: '10px' }}
						bg='light'
						border='dark'
						key={comment.id}
					>
						<Row className='pl-3 pr-4'>
							<Title comment={comment} />
							<Card.Text className='text-right ml-auto'>
								Created on: <b>{formattedDate.toDateString()}</b>
							</Card.Text>
						</Row>
						<br />
						<Card.Text>{comment.text}</Card.Text>
					</Card>
				);
			})}
		</div>
	);
};

export default RecentComments;

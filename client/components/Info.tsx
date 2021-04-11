import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { COURSE_COMMENTS, PROFESSOR_COMMENTS } from '../utils/graphql';
import { CommentData, Course, Professor } from '../utils/types';
import CourseProfessors from './CourseProfessors';
import ProfessorCourses from './ProfessorCourses';
import Tags from './Tags';

const mainInfo = {
	fontWeight: 600,
	marginBottom: 0,
};

const variable = {
	marginLeft: 5,
	fontWeight: 700,
	fontSize: 32,
};

const constant = {
	fontSize: 20,
};

interface Props {
	course?: Course;
	professor?: Professor;
	comments: CommentData;
}

const Info: React.FC<Props> = ({ course, professor, comments }) => {
	/*const { loading, data } = useQuery<CommentData>(course ? COURSE_COMMENTS : PROFESSOR_COMMENTS, {
		variables: {
			...(course && { courseID: parseInt(course.id) }),
			...(professor && { professorID: parseInt(professor.id) }),
		},
	});*/

	/*if (loading || !data) {
		return <></>;
	}*/

	//console.log(data.comments)
	console.log(comments)
	let qualities = [], difficulties = [];
	if(comments){
		qualities = comments.map(comment => comment.quality);
		difficulties = comments.map(comment => comment.difficulty);
	}
	return (
		<Container className='mt-3'>
			<Card className='mb-5 p-4 w-75'>
				<h1 style={mainInfo}>
					{course ? `${course.department} ${course.number}` : null}
					{professor ? `${professor.firstName} ${professor.lastName}` : null}
				</h1>
				<h3>
					Quality:
					<span style={variable}>
						{qualities.length
							? (qualities.reduce((a, b) => a + b, 0) / qualities.length).toFixed(1)
							: 0}
					</span>
					<span style={constant}>/5</span>
				</h3>
				<h3>
					Difficulty:
					<span style={variable}>
						{difficulties.length
							? (difficulties.reduce((a, b) => a + b, 0) / difficulties.length).toFixed(1)
							: 0}
					</span>
					<span style={constant}>/5</span>
				</h3>
				<h5>
					Based on <b>{qualities.length}</b> ratings.
				</h5>
				{course ? <CourseProfessors id={course.id} /> : null}
				{professor ? <ProfessorCourses id={professor.id} /> : null}
				{course ? <Tags id={course.id} type='course' comments={comments} /> : null}
				{professor ? <Tags id={professor.id} type='professor' comments={comments} /> : null}
			</Card>
		</Container>
	);
};

export default Info;

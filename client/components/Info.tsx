import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { CommentData, Course, Professor, CommentType } from '../utils/types';
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
	comments: CommentType[];
}

const Info: React.FC<Props> = ({ course, professor, comments }) => {
	let qualities: number[] = [], difficulties: number[] = [];
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
				{course ? <Tags comments={comments} /> : null}
				{professor ? <Tags comments={comments} /> : null}
			</Card>
		</Container>
	);
};

export default Info;

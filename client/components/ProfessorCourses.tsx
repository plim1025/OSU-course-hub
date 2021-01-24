import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { CourseData } from '../utils/types';
import { PROFESSOR_COURSES } from '../utils/graphql';
import { Spinner } from 'react-bootstrap';

const courseBlock = {
	marginTop: 10,
};

const courseList = {
	marginRight: 10,
	display: 'inline',
};

interface Props {
	id: string;
}

const ProfessorCourses: React.FC<Props> = ({ id }) => {
	const { loading, error, data } = useQuery<CourseData>(PROFESSOR_COURSES, {
		variables: { professorID: parseInt(id) },
	});

	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}
	return (
		<div style={courseBlock}>
			<h4>Courses: </h4>
			{data.courses.length > 0 ? (
				data.courses.map(course => (
					<Link key={course.id} href={`/course/${course.id}`}>
						<p style={courseList}>
							<b>
								{course.department} {course.number}
							</b>
						</p>
					</Link>
				))
			) : (
				<b>N/A</b>
			)}
		</div>
	);
};

export default ProfessorCourses;

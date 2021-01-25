import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { COURSE_PROFESSORS } from '../utils/graphql';
import { ProfessorData } from '../utils/types';

const professorBlock = {
	marginTop: 10,
};

const professorList = {
	marginRight: 10,
	display: 'inline',
	':hover': {
		cursor: 'pointer',
	},
};

interface Props {
	id: string;
}

const CourseProfessors: React.FC<Props> = ({ id }) => {
	const { loading, data } = useQuery<ProfessorData>(COURSE_PROFESSORS, {
		variables: { courseID: parseInt(id) },
	});

	if (loading || !data) {
		return <></>;
	}
	return (
		<div style={professorBlock}>
			<h4>Professors: </h4>
			{data.professors.length > 0 ? (
				data.professors.map(professor => (
					<Link key={professor.id} href={`/professor/${professor.id}`}>
						<p style={professorList}>
							<b>
								{professor.firstName} {professor.lastName}
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

export default CourseProfessors;

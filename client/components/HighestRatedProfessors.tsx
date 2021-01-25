import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { HIGHEST_RATED_PROFESSORS, PROFESSOR_COMMENTS } from '../utils/graphql';
import { ProfessorData } from '../utils/types';

const variable = {
	marginLeft: 5,
	fontWeight: 700,
	fontSize: 25,
};

const constant = {
	fontSize: 15,
};

const department = {
	margin: 0,
	color: '#4a4a4a',
};

const item = {
	margin: 0,
};

interface Props {
	id: string;
}

const ProfessorQuality: React.FC<Props> = ({ id }) => {
	const { loading, data } = useQuery(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(id) },
	});

	if (loading || !data) {
		return <></>;
	}
	const qualities: number[] = [];
	data.comments.forEach(comment => {
		qualities.push(comment.quality);
	});
	return (
		<Card.Text style={item}>
			Quality:
			<span style={variable}>{qualities.reduce((a, b) => a + b, 0) / qualities.length}</span>
			<span style={constant}>/5</span>
		</Card.Text>
	);
};

const HighestRatedProfessors: React.FC = () => {
	const { loading, data } = useQuery<ProfessorData>(HIGHEST_RATED_PROFESSORS);

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
			<h4 style={{ textAlign: 'center', padding: '10px' }}>Highest Rated Professors:</h4>
			{data.professors.map(professor => (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						width: '80%',
						marginRight: '30px',
					}}
					key={professor.id}
				>
					<Card
						style={{ width: '90%', padding: '10px', marginTop: '10px' }}
						bg='light'
						border='dark'
					>
						<Row className='pl-3 pr-4'>
							<Card.Title>
								<Link href={`/professor/${professor.id}`}>
									<b>
										{professor.firstName} {professor.lastName}
									</b>
								</Link>
							</Card.Title>
							<Card.Text style={department} className='text-right ml-auto'>
								{professor.college}
							</Card.Text>
						</Row>
						<ProfessorQuality id={professor.id} />
					</Card>
				</div>
			))}
		</div>
	);
};

export default HighestRatedProfessors;

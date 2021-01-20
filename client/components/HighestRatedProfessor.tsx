import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import { Card, Row } from 'react-bootstrap';
import { COMMENTS, PROFESSORS, PROFESSOR_COMMENTS } from '../utils/graphql';
import { CommentType, Professor } from '../utils/types';

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

interface ProfessorRating {
	professor: Professor;
	rating: number;
}

const GetDifficulty = (difficulty: number[], id: string) => {
	const { loading, error, data } = useQuery(PROFESSOR_COMMENTS, {
		variables: { professorID: parseInt(id) },
	});
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const comments = data.professorComments;
	comments.forEach((comment: CommentType) => {
		difficulty.push(comment.difficulty);
	});
	return;
};

const Info = (topProfessors: ProfessorRating) => {
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
			{topProfessors.topProfessors.map((object: ProfessorRating, index: number) => {
				let professor = object.professor;
				let difficulty: number[] = [];
				GetDifficulty(difficulty, professor.id);
				let averageDifficulty;
				if (difficulty.length > 0) {
					averageDifficulty = difficulty.reduce((a, b) => a + b, 0) / difficulty.length;
				} else {
					averageDifficulty = 0;
				}
				return (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							width: '80%',
							marginRight: '30px',
						}}
						key={professor.id}
					>
						<div style={{ margin: 'auto', fontSize: '30px' }}>
							<b>{index + 1}</b>
						</div>
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
							<Card.Text style={item}>
								Quality:
								<span style={variable}>{object.rating}</span>
								<span style={constant}>/5</span>
							</Card.Text>
							<Card.Text style={item}>
								Difficulty:
								<span style={variable}>{averageDifficulty}</span>
								<span style={constant}>/5</span>
							</Card.Text>
						</Card>
					</div>
				);
			})}
		</div>
	);
};

const RenderTopProfessors = ({ professors }) => {
	const { loading, error, data } = useQuery(COMMENTS);
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const comments = data.comments.filter((comment: CommentType) => comment.professorID != null);
	let professorRatings = [];
	for (let i = 0; i < professors.length; i++) {
		let ratings = [];
		for (let j = 0; j < comments.length; j++) {
			if (comments[j].professorID == professors[i].id) {
				ratings.push(comments[j].quality);
			}
		}
		let averageQuality;
		if (ratings.length > 0) {
			averageQuality = ratings.reduce((a, b) => a + b, 0) / ratings.length;
		} else {
			averageQuality = 0;
		}
		let currProfessor = {
			professor: professors[i],
			rating: averageQuality,
		};
		professorRatings.push(currProfessor);
	}
	let topProfessors = professorRatings
		.slice()
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 3);
	return <Info topProfessors={topProfessors} />;
};

const HighestRatedProfessor: React.FC = () => {
	const { loading, error, data } = useQuery(PROFESSORS);
	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	return <RenderTopProfessors professors={data.professors} />;
};

export default HighestRatedProfessor;

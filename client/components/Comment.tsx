import { useQuery } from '@apollo/client';
import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { COURSE, PROFESSOR } from 'utils/graphql';

interface Props {
	props: {
		ONID: number;
		baccCore: boolean;
		campus: string;
		courseID: number;
		createdAt: Date;
		dislikes: number;
		gradeReceived: string;
		id: string;
		likes: number;
		professorID: number;
		recommend: boolean;
		tags: string[];
		text: string;
	};
}

const Searchbar: React.FC<Props> = props => {
	const data = props.props;
	const date = new Date(data.createdAt);

	let fetchedData;
	if (data.courseID) {
		fetchedData = useQuery(COURSE, {
			variables: { id: data.courseID },
		});
		if (fetchedData.data) {
			fetchedData = fetchedData.data.course;
		}
	}

	if (data.professorID) {
		fetchedData = useQuery(PROFESSOR, {
			variables: { id: data.professorID },
		});
		if (fetchedData.data) {
			fetchedData = fetchedData.data.professor;
		}
	}

	return (
		<Container
			className='shadow mb-4 p-3'
			style={{ height: '300px', backgroundColor: '#e6e6e6' }}
			fluid
		>
			{fetchedData.course && (
				<h5>
					{fetchedData.course.department} {fetchedData.course.number}
				</h5>
			)}
			{fetchedData.professor && (
				<h5>
					{fetchedData.professor.firstName} {fetchedData.professor.lastName}
				</h5>
			)}
			<p className='mt-2'>Created At: {date.toDateString()}</p>
			{data.campus && <p>Campus: {data.campus}</p>}
			{data.recommend && <p>Recommend: {data.recommend ? 'yes' : 'no'}</p>}
			{data.gradeReceived && <p>Grade Received: {data.gradeReceived}</p>}
			<span>Tags: </span>
			{data.tags.map((tag: string, i) => {
				return <span key={i}>'{tag}' </span>;
			})}
			<p className='mt-3'>Text: {data.text}</p>
		</Container>
	);
};

export default Searchbar;

import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Professor, CommentType, Course } from '../utils/types';
import { COURSE_COMMENTS, COURSE_PROFESSORS } from '../utils/graphql';

const courseName = {
	fontWeight: 600,
	marginBottom: 0,
};

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

const tagBlock = {
	marginTop: 10,
};

const tagList = {
	marginTop: 5,
	marginRight: 5,
	fontSize: 12,
	fontWeight: 600,
	display: 'inline',
};

const aTag = {
	padding: 5,
	backgroundColor: '#d9d7d7',
	borderRadius: 20,
};

const rateBtn = {
	marginLeft: 20,
	background: '#d73f09',
};

const variable = {
	marginLeft: 5,
	fontWeight: 700,
	fontSize: 32,
};

const constant = {
	fontSize: 20,
};

const CourseProfessors = ({ id }: { id: string }) => {
	const { loading, error, data } = useQuery(COURSE_PROFESSORS, {
		variables: { courseID: parseInt(id) },
	});
	if (error) {
		return <div>Course Professors Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const professors = data.courseProfessors;
	return (
		<div style={professorBlock}>
			<h4>Professors: </h4>
			{professors.length > 0 ? (
				professors.map((professor: Professor) => {
					return (
						<Link href={`/professor/${professor.id}`}>
							<p style={professorList}>
								<b>
									{professor.firstName} {professor.lastName}
								</b>
							</p>
						</Link>
					);
				})
			) : (
				<b>N/A</b>
			)}
		</div>
	);
};

const CourseTags = ({ id }) => {
	const { loading, error, data } = useQuery(COURSE_COMMENTS, {
		variables: { courseID: parseInt(id) },
	});
	if (error) {
		return <div>Course Tags Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	const comments = data.courseComments;
	let tags: string[] = [];
	comments.forEach(comment => comment.tags.forEach(tag => tags.push(tag)));

	function onlyUnique(value: any, index: any, self: any) {
		return self.indexOf(value) === index;
	}
	tags = tags.filter(onlyUnique);

	return (
		<div style={tagBlock}>
			<h4>Tags: </h4>
			{tags.length > 0 ? (
				tags.map(tag => {
					return (
						<p style={tagList}>
							<span style={aTag}>{tag}</span>
						</p>
					);
				})
			) : (
				<b>N/A</b>
			)}
		</div>
	);
};

const GetDifficultyQuality = (difficulty: number[], quality: number[], id: string) => {
	if (id) {
		const { loading, error, data } = useQuery(COURSE_COMMENTS, {
			variables: { courseID: parseInt(id) },
		});
		if (error) {
			return <div>Course Comments Error</div>;
		} else if (loading) {
			return <div>Loading...</div>;
		}
		const comments = data.courseComments;
		comments.forEach((comment: CommentType) => {
			quality.push(comment.quality);
			difficulty.push(comment.difficulty);
		});
	}
	return;
};

interface Props {
	course: Course;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const CourseInfo: React.FC<Props> = props => {
	const { course } = props;
	let difficulty: number[] = [];
	let quality: number[] = [];
	GetDifficultyQuality(difficulty, quality, course.id);
	let averageQuality, averageDifficulty;
	if (quality.length > 0) {
		averageQuality = quality.reduce((a, b) => a + b, 0) / quality.length;
	} else {
		averageQuality = 0;
	}
	if (difficulty.length > 0) {
		averageDifficulty = difficulty.reduce((a, b) => a + b, 0) / difficulty.length;
	} else {
		averageDifficulty = 0;
	}
	return (
		<Container className='mt-3'>
			<Card key={course.id} className='mb-5 p-4 w-75'>
				<h1 style={courseName}>
					{course.department} {course.number}
					<Button style={rateBtn}>Rate</Button>
				</h1>
				<h3>
					Quality:
					<span style={variable}>{averageQuality}</span>
					<span style={constant}>/5</span>
				</h3>
				<h3>
					Difficulty:
					<span style={variable}>{averageDifficulty}</span>
					<span style={constant}>/5</span>
				</h3>
				<h5>
					Based on <b>{quality.length}</b> ratings.
				</h5>
				<CourseProfessors id={course.id} />
				<CourseTags id={course.id} />
			</Card>
		</Container>
	);
};

export default CourseInfo;

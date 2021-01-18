import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
	CREATE_PROFESSOR,
	PROFESSOR,
	PROFESSOR_COURSES,
	ADD_COURSE_TO_PROFESSOR,
	COURSES,
	COURSE,
	CREATE_COURSE,
	COURSE_TEXTBOOKS,
	ADD_TEXTBOOK_TO_COURSE,
	STUDENTS,
	STUDENT,
	CREATE_STUDENT,
	COURSE_COMMENTS,
	PROFESSOR_COMMENTS,
	STUDENT_COMMENTS,
	CREATE_COMMENT,
	DELETE_COMMENT,
} from '../utils/graphql';

//CSS
const info = {
	margin: 'auto',
	width: '70%',
	paddingTop: '50px',
	//textAlign: 'center',
};

const professorName = {
	fontWeight: 600,
	marginBottom: 0,
};

const courseBlock = {
	marginTop: 10,
};

const courseList = {
	marginRight: 10,
	display: 'inline',
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

const department = {
	marginTop: 0,
	color: '#6b6a6a',
};

//graphQL

interface Professor {
	id: number;
	firstName: string;
	lastName: string;
	college: string;
	difficulty: number[];
	averageDifficulty: number;
	quality: number[];
	averageQuality: number;
}
interface Props {
	professors: Professor[];
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const TestingAPI: React.FC<Props> = props => {
	const { professors } = props;
	const [createProfessor] = useMutation(CREATE_PROFESSOR);
	const [addCourseToProfessor] = useMutation(ADD_COURSE_TO_PROFESSOR, {
		variables: {
			professorID: 1,
			courseID: 1,
			termTaught: 'Fall',
			yearTaught: 2020,
		},
	});
	const [createCourse] = useMutation(CREATE_COURSE);
	const [addTextbookToCourse] = useMutation(ADD_TEXTBOOK_TO_COURSE, {
		variables: {
			ISBN: '893269546',
			title: 'Cool',
			author: 'Test',
			edition: 4,
			copyrightYear: 2010,
			priceNewUSD: 80,
			priceUsedUSD: 30,
			courseID: 1,
			termUsed: 'Fall',
			yearUsed: 2020,
		},
	});
	const [createStudent] = useMutation(CREATE_STUDENT, {
		variables: {
			ONID: '784567464',
		},
	});
	const [createComment] = useMutation(CREATE_COMMENT, {
		variables: {
			comment: {
				text: 'hey',
				ONID: '523365498',
				professorID: 1,
				campus: 'Corvallis',
				recommend: true,
				baccCore: false,
				gradeReceived: 'A',
				tags: ['Lots of homework', 'Lots of reading'],
			},
		},
	});
	const [deleteComment] = useMutation(DELETE_COMMENT, {
		variables: { id: 3 },
	});
	/*const {loading, error, data} = useQuery(PROFESSOR, {
        variables: {professorID: 1},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	/*const {loading, error, data} = useQuery(PROFESSOR_COURSES, {
        variables: {professorID: 1},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	/*const {loading, error, data} = useQuery(COURSES);
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	/*const {loading, error, data} = useQuery(COURSE, {
        variables: {courseID: 1}
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	const { loading, error, data } = useQuery(COURSE_TEXTBOOKS, {
		variables: { courseID: 1 },
	});
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	/*const {loading, error, data} = useQuery(STUDENTS);
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	/*const {loading, error, data} = useQuery(STUDENT, {
        variables: {ONID: "523345498"}
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	/*const {loading, error, data} = useQuery(COURSE_COMMENTS, {
        variables: {courseID: 1}
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	/*const {loading, error, data} = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: 1}
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/
	/*const {loading, error, data} = useQuery(STUDENT_COMMENTS, {
        variables: {ONID: "523365498"}
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }*/

	//Print the data from a query and the list of professors

	return (
		<div>
			<h2>Testing mutations:</h2>
			<form
				onSubmit={e => {
					e.preventDefault();
					createProfessor({
						variables: { firstName: 'Hey', lastName: 'Test2', college: 'Science' },
					});
				}}
			>
				<button type='submit'>Create Professor</button>
			</form>
			<form
				onSubmit={e => {
					e.preventDefault();
					addCourseToProfessor();
				}}
			>
				<button type='submit'>Add Course to Professor</button>
			</form>
			<form
				onSubmit={e => {
					e.preventDefault();
					createCourse({ variables: { department: 'CS', number: '261' } });
				}}
			>
				<button type='submit'>Create Course</button>
			</form>
			<form
				onSubmit={e => {
					e.preventDefault();
					addTextbookToCourse();
				}}
			>
				<button type='submit'>Add Textbook to Course</button>
			</form>
			<form
				onSubmit={e => {
					e.preventDefault();
					createStudent();
				}}
			>
				<button type='submit'>Create Student</button>
			</form>
			<form
				onSubmit={e => {
					e.preventDefault();
					createComment();
				}}
			>
				<button type='submit'>Create Comment</button>
			</form>
			<form
				onSubmit={e => {
					e.preventDefault();
					deleteComment();
				}}
			>
				<button type='submit'>Delete Comment</button>
			</form>
			{/*<Button onClick={props.onClick}>Create Course</Button>*/}
			{professors.map((professor: Professor) => {
				return (
					<div key={professor.id} style={info}>
						<h1 style={professorName}>
							{professor.firstName} {professor.lastName}
							<Button style={rateBtn}>Rate</Button>
						</h1>
						<h5 style={department}>{professor.college}</h5>
						<h3>
							Quality:
							<span style={variable}>{professor.averageQuality}</span>
							<span style={constant}>/5</span>
						</h3>
						<h3>
							Difficulty:
							<span style={variable}>{professor.averageDifficulty}</span>
							<span style={constant}>/5</span>
						</h3>
						<h5>
							Based on <b>{professor.quality.length}</b> ratings.
						</h5>
						<h4>
							Ratings:{' '}
							{professor.quality.map(rating => {
								return <p>{rating}</p>;
							})}
						</h4>
					</div>
				);
			})}
		</div>
		/*{professors.forEach(professor => <h1>{professor.firstName}</h1>)}
            {professors.map((professor: Professor) => {
              <h1 style={professorName}>
                {professor.firstName} {professor.lastName}
                <Button style={rateBtn}>Rate</Button>
              </h1>  
            })}*/
		/*<div style={courseBlock}>
                <h4>Courses: </h4>
                {professor.course.map((course) => {
                    return (
                        <p style={courseList}>{course.abbr} {course.num}</p>
                    );
                })}
            </div>
            <div style={tagBlock}>
                <h4>Tags: </h4>
                {tags.map((tag) => {
                    return (
                        <p style={tagList}><span style={aTag}>{tag}</span></p>
                    );
                })}
            </div>
        </div>*/
	);
};

export default TestingAPI;

import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';
import {PROFESSOR_COURSES, PROFESSOR_COMMENTS} from '../utils/graphql';

//CSS
const info = {
    margin: 'auto',
    width: '70%',
    paddingTop: '50px',
    //textAlign: 'center',
}

const professorName = {
    fontWeight: 600,
    marginBottom: 0,
}

const courseBlock = {
    marginTop: 10,
}

const courseList = {
    marginRight: 10,
    display: 'inline',
}

const tagBlock = {
    marginTop: 10,
}

const tagList = {
    marginTop: 5,
    marginRight: 5,
    fontSize: 12,
    fontWeight: 600,
    display: 'inline',
}

const aTag = {
    padding: 5,
    backgroundColor: '#d9d7d7',
    borderRadius: 20
}

const rateBtn = {
    marginLeft: 20,
    background: '#d73f09',
}

const variable = {
    marginLeft: 5,
    fontWeight: 700,
    fontSize: 32,
}

const constant = {
    fontSize: 20,
}

const department = {
    marginTop: 0,
    color: '#6b6a6a',
}
interface Professor {
    id: number,
    firstName: string,
    lastName: string,
    college: string,
    difficulty: number[],
    averageDifficulty: number,
    quality: number[],
    averageQuality: number

}
interface Course {
    id: number,
    department: string,
    number: number
}
interface Comment {
    id: number,
    text: string,
    ONID: string,
    campus: string,
    tags: string[]
}
interface Props {
    professors: Professor[],
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const ProfessorCourses = () => {
    const {loading, error, data} = useQuery(PROFESSOR_COURSES, {
        variables: {professorID: 1},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const courses = data.professorCourses;
    return (
        <div style={courseBlock}>
            <h4>Courses: </h4>
            {courses.map((course: Course) => {
                return (
                    <p style={courseList}>{course.department} {course.number}</p>
                );
            })}
        </div>
    );
}

const ProfessorComments = () => {
    const {loading, error, data} = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: 1},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.professorComments;
    var tags: string[] = [];
    comments.forEach(comment => comment.tags.forEach(tag => tags.push(tag)));
    
    function onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }
    tags = tags.filter(onlyUnique);
    console.log(tags);

    return (
        <div style={tagBlock}>
            <h4>Tags: </h4>
            {tags.map((tag) => {
                return (
                    <p style={tagList}><span style={aTag}>{tag}</span></p>
                );
            })}
        </div>
    );
}

const ProfessorInfo: React.FC<Props> = (props) => {
    const {professors} = props;
    console.log("Professors: ", professors);
    console.log(professors.length);
	return (
        <div>
            {/*<Button onClick={props.onClick}>Create Course</Button>*/}
            {professors.map((professor: Professor) => {
                return (
                    <div key={professor.id} style={info}>
                        <h1 style={professorName}>
                            {professor.firstName} {professor.lastName}
                            <Button style={rateBtn}>Rate</Button>
                        </h1>
                        <h5 style={department}>{professor.college}</h5>
                        <h3>Quality: 
                            <span style={variable}>{professor.averageQuality}</span>
                            <span style={constant}>/5</span>
                        </h3>
                        <h3>Difficulty: 
                            <span style={variable}>{professor.averageDifficulty}</span>
                            <span style={constant}>/5</span>
                        </h3>
                        <h5>Based on <b>{professor.quality.length}</b> ratings.</h5>
                        <ProfessorCourses />
                        <ProfessorComments />
                    </div> 
                )
            })}
        </div>
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

export default ProfessorInfo;
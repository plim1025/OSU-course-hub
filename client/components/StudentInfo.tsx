import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';
import {STUDENT_COMMENTS} from '../utils/graphql';
import {Card} from 'react-bootstrap';

//CSS
const info = {
    margin: 'auto',
    marginTop: 50,
    padding: 10,
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
interface Student {
    ONID: string
}
interface Props {
    student: Student,
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const StudentComments = () => {
    //make the studentID dynamic
    const {loading, error, data} = useQuery(STUDENT_COMMENTS, {
        variables: {ONID: "387347385"},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.studentComments;
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

const StudentInfo: React.FC<Props> = (props) => {
    const {student} = props;
    console.log("Student: ", student);
	return (
        <div>
            {/*<Button onClick={props.onClick}>Create Course</Button>*/}
            <Card key={student.ONID} style={info} bg="light" border="dark">
                <h1>ONID: {student.ONID}</h1>
                <StudentComments />
            </Card> 
        </div>
	);
};

export default StudentInfo;
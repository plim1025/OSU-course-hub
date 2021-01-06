import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';
import {STUDENT_COMMENTS} from '../utils/graphql';
import {Card} from 'react-bootstrap';
import Comment from './Comment';
interface CommentI {
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
    quality: number;
    difficulty: number;
}
interface Student {
    ONID: string
}
interface Props {
    student: Student,
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const StudentComments = ({id}) => {
    //make the studentID dynamic
    const {loading, error, data} = useQuery(STUDENT_COMMENTS, {
        variables: {ONID: id},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.studentComments;
    return (
        <Container style={{ height: '1000px' }}>
            {comments.map((comment: CommentI, i: number) => {
                return <Comment key={i} props={comment} />;
            })}
	    </Container>
    )
}

const StudentInfo: React.FC<Props> = (props) => {
    const {student} = props;
    console.log("Student: ", student);
	return (
        <div>
            <Container>
                <h3>ONID: {student.ONID}</h3>
                <StudentComments id={student.ONID} />
            </Container> 
        </div>
	);
};

export default StudentInfo;
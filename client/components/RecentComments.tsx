import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {COMMENTS, COURSE, PROFESSOR} from '../utils/graphql';
import {Card, Row} from 'react-bootstrap';

interface Comment {
    id: number,
    professorID: number,
    courseID: number,
    text: string,
    createdAt: string
}

interface SpecificTitleProps {
    id: number
}

interface TitleProps {
    comment: Comment
}

const ProfessorTitle = ({id}: SpecificTitleProps) => {
    const { loading, error, data } = useQuery(PROFESSOR, {variables: {professorID: parseInt(id)}});
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const professor = data.professor.professor
    console.log(professor)
    return (
        <div>
            <h5><b>{professor.firstName} {professor.lastName}</b></h5>
        </div>
    )
}

const CourseTitle = ({id}: SpecificTitleProps) => {
    const { loading, error, data } = useQuery(COURSE, {variables: {courseID: parseInt(id)}});
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const course = data.course.course
    console.log(course)
    return (
        <div>
            <h5><b>{course.department} {course.number}</b></h5>
        </div>
    )
}

const Title = ({comment}: TitleProps) => {
    if(comment.courseID === null){
        return (
            <ProfessorTitle id={comment.professorID}/>
        )
    }
    else {
        return (
            <CourseTitle id={comment.courseID}/>
        )
    }
};

const RecentComments: React.FC = () => {
    const { loading, error, data } = useQuery(COMMENTS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const recentComments = data.comments.slice(0, Math.min(4, data.comments.length));
    console.log(recentComments);
    recentComments.reverse();
    let time, formattedDate;
    return (
        <div style={{"width": "50%", "padding": "10px", "display": "flex",
        "flexDirection": "column", "alignItems": "center", "maxWidth": "1000px"}} className="border">
            <h4 style={{"textAlign": "center", "padding": "10px"}}>Recent Comments:</h4>
            {recentComments.map((comment: Comment) => {
                time = Date.parse(comment.createdAt);
                formattedDate = new Date(time);
                return (
                    <Card style={{"width": "80%", "padding": "10px", 
                    "marginTop": "10px"}} bg="light" border="dark" key={comment.id}>
                        <Row className='pl-3 pr-4'>
                            <Title comment={comment}/>
                            <Card.Text className='text-right ml-auto'>
                                Created on: <b>{formattedDate.toDateString()}</b>
                            </Card.Text>
                        </Row>
                        <br />
                        <Card.Text>{comment.text}</Card.Text>
                    </Card>
                );
            })}
        </div>
    );
}

export default RecentComments;
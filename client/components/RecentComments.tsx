import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {COMMENTS, COURSE, PROFESSOR} from '../utils/graphql';
import {Card} from 'react-bootstrap';

const commentBox = {
    marginLeft: 100,
    marginRight: 50,
    marginTop: 10,
    borderSize: 2,
    //borderColor: '#eb8934',
    borderRadius: 15,
    borderStyle: 'solid',
    minWidth: 300,
    padding: 10,
    paddingRight: 0,
}

const details = {
    display: 'inline',
}

const item = {
    marginRight: 10
}

const ProfessorTitle = ({id}) => {
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

const CourseTitle = ({id}) => {
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

const Title = ({comment}) => {
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
    const recentComments = data.comments.slice(Math.max(data.comments.length - 4, 1));
    console.log(recentComments);
    recentComments.reverse();
    let time, formattedDate;
    return (
        <div>
            {recentComments.map((comment) => {
                time = Date.parse(comment.createdAt);
                formattedDate = new Date(time);
                return (
                    <Card style={commentBox} bg="light" border="dark">
                        <div style={details}>
                            <Title comment={comment}/>
                            <span style={item}>Created on: <b>{formattedDate.toDateString()}</b></span>
                        </div>
                        <br />
                        <Card.Text>{comment.text}</Card.Text>
                    </Card>
                );
            })}
        </div>
    );
}

export default RecentComments;
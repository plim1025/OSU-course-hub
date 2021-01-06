import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {COMMENTS, COURSES, PROFESSORS} from '../utils/graphql';
import { isInlineFragment } from '@apollo/client/utilities';
import {Card, CardColumns} from 'react-bootstrap';

const block = {
    position: 'absolute' as 'absolute',
    bottom: -250,
    right: 100
}
const commentBlock = {
    marginLeft: 100,
    marginRight: 50,
    marginTop: 10,
    borderSize: 2,
    //borderColor: '#eb8934',
    borderRadius: 15,
    borderStyle: 'solid',
    width: 500,
    padding: 10,
    paddingRight: 0,
}

const details = {
    display: 'inline',
}

const item = {
    marginRight: 10
}

const GetProfessor = ({id}) => {
    const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    console.log(id);
    console.log(data.professors);
    const professor = data.professors.filter((professor) => professor.id == id);
    console.log(professor);
    return (
        <div>
            <h5><b>{professor[0].firstName} {professor[0].lastName}</b></h5>
        </div>
    )
}

const GetCourse = ({id}) => {
    const { loading, error, data } = useQuery(COURSES);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    console.log(data.courses);
    const course = data.courses.filter((course) => course.id == id);
    console.log(course);
    return (
        <div>
            <h5><b>{course[0].department} {course[0].number}</b></h5>
        </div>
    )
}

const CourseOrProfessor = ({comment}) => {
    if(comment.courseID === null){
        return (
            <GetProfessor id={parseInt(comment.professorID)}/>
        )
    }
    else {
        return (
            <GetCourse id={parseInt(comment.courseID)}/>
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
    const comments = data.comments;
    const recentComments = comments.slice(Math.max(comments.length - 4, 1));
    console.log(recentComments);
    recentComments.reverse();
    var time, formattedDate;
    console.log(comments);
    return (
        <div style={block}>
            {recentComments.map((comment) => {
                time = Date.parse(comment.createdAt);
                formattedDate = new Date(time);
                return (
                    <Card style={commentBlock} bg="light" border="dark">
                        <div style={details}>
                            <CourseOrProfessor comment={comment}/>
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
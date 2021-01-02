import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {COMMENTS, COURSES, PROFESSORS} from '../utils/graphql';
import { isInlineFragment } from '@apollo/client/utilities';

const comment = {
    marginLeft: 100,
    marginRight: 50,
    marginTop: 50,
    borderSize: 2,
    borderColor: '#eb8934',
    borderRadius: 15,
    borderStyle: 'solid',
    width: "40%",
    padding: 10,
    paddingRight: 0,
    backgroundColor: '#f2f2f2',
}

const details = {
    display: 'inline',
}

const item = {
    marginRight: 10
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
            <h4><b>{professor[0].firstName} {professor[0].lastName}</b></h4>
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
            <h4><b>{course[0].department} {course[0].number}</b></h4>
        </div>
    )
}

const CourseOrProfessor = ({comment}) => {
    if(comment.courseID === null){
        return (
            <GetProfessor id={comment.professorID}/>
        )
    }
    else {
        return (
            <GetCourse id={comment.courseID}/>
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
    const recentComment = comments[comments.length - 1];
    const time = Date.parse(recentComment.createdAt);
    const formattedDate = new Date(time);
    console.log(comments);
    return (
        <div style={comment}>
            <h3>Recent Comment:</h3>
            <div style={details}>
                <CourseOrProfessor comment={recentComment}/>
                <span style={item}>Grade: <b>{recentComment.gradeReceived ? 
                    (recentComment.gradeReceived) : ('N/A')}</b></span>
                <span style={item}>Created on: <b>{formattedDate.toDateString()}</b></span>
                <span style={item}>Campus: <b>{recentComment.campus ? 
                    (recentComment.campus) : ('N/A')}</b></span>
            </div>
            <br />
            <br />
            {recentComment.tags.map((tag) => {
                return (
                    <p style={tagList}><span style={aTag}>{tag}</span></p>
                );
            })}
            <br />
            <br />
            <h5>{recentComment.text}</h5>
        </div>
    );
}

export default RecentComments;
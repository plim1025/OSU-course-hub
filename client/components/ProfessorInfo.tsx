import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'react-bootstrap';

//Dummy data
var tags = ['Easy Grader', 'Caring', 'Heavy Accent', 'Clear Instructions', 'Lecture-Heavy'];
var courses = [];

var course1 = {
    abbr: "CS",
    num: "161"
};

var course2 = {
    abbr: "CS",
    num: "261"
};

courses.push(course1);
courses.push(course2);

var professor = {
    firstName: "James",
    lastName: "Chance",
    department: "College of Engineering",
    avgDifficulty: 3.2,
    avgQuality: 4.1,
    numRatings: 27,
    course: courses,
};

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

const ProfessorInfo: React.FC = () => {
	return (
        <div style={info}>
            <h1 style={professorName}>
                {professor.firstName} {professor.lastName}
                <Button style={rateBtn}>Rate</Button>
            </h1>
            <h5 style={department}>{professor.department}</h5>
            <h3>Quality: 
                <span style={variable}>{professor.avgQuality}</span>
                <span style={constant}>/5</span>
            </h3>
            <h3>Difficulty: 
                <span style={variable}>{professor.avgDifficulty}</span>
                <span style={constant}>/5</span>
            </h3>
            <h5>Based on <b>{professor.numRatings}</b> ratings.</h5>
            <div style={courseBlock}>
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
        </div>
	);
};

export default ProfessorInfo;
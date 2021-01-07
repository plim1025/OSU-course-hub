import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';
import {PROFESSOR_COURSES, PROFESSOR_COMMENTS} from '../utils/graphql';
import {Card, Container} from 'react-bootstrap';
import Link from 'next/link'

//CSS
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
    tags: string[],
    quality: number,
    difficulty: number
}
interface Props {
    professor: Professor,
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const ProfessorCourses = ({id}) => {
    const {loading, error, data} = useQuery(PROFESSOR_COURSES, {
        variables: {professorID: parseInt(id)},
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
                    <Link href={`/course/${course.id}`}>
                        <p style={courseList} key={course.id}><b>{course.department} {course.number}</b></p>
                    </Link>
                );
            })}
        </div>
    );
}

const ProfessorTags = ({id}) => {
    const {loading, error, data} = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: parseInt(id)},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.professorComments;
    let tags: string[] = [];
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
                    <p style={tagList} key={tag}><span style={aTag}>{tag}</span></p>
                );
            })}
        </div>
    );
}

const GetDifficultyQuality = (difficulty: number[], quality: number[], id: number) => {
    if(id){
        const {loading, error, data} = useQuery(PROFESSOR_COMMENTS, {
            variables: {professorID: parseInt(id)},
        });
        if (error) {
            return <div>Error</div>;
        } else if (loading) {
            return <div>Loading...</div>;
        }
        const comments = data.professorComments;
        comments.forEach((comment: Comment) => {
            quality.push(comment.quality)
            difficulty.push(comment.difficulty)
        });
    }
    return
}

const ProfessorInfo: React.FC<Props> = (props) => {
    const {professor} = props;
    console.log("Professor: ", professor);
    let difficulty: number[] = []
    let quality: number[] = []
    GetDifficultyQuality(difficulty, quality, professor.id)
    let averageQuality, averageDifficulty
    if(quality.length > 0){
        averageQuality = (quality.reduce((a, b) => a + b, 0) / quality.length)
    }
    else {
        averageQuality = 0
    }
    if(difficulty.length > 0){
        averageDifficulty = (difficulty.reduce((a, b) => a + b, 0) / difficulty.length)
    }
    else {
        averageDifficulty = 0
    }
	return (
        <Container className="mt-3">
            <Card key={professor.id} className='mb-5 p-4 w-75'>
                <h1 style={professorName}>
                    {professor.firstName} {professor.lastName}
                    <Button style={rateBtn}>Rate</Button>
                </h1>
                <h5 style={department}>{professor.college}</h5>
                <h3>Quality: 
                    <span style={variable}>{averageQuality}</span>
                    <span style={constant}>/5</span>
                </h3>
                <h3>Difficulty: 
                    <span style={variable}>{averageDifficulty}</span>
                    <span style={constant}>/5</span>
                </h3>
                <h5>Based on <b>{quality.length}</b> ratings.</h5>
                <ProfessorCourses id={professor.id}/>
                <ProfessorTags id={professor.id}/>
            </Card> 
        </Container>
	);
};

export default ProfessorInfo;
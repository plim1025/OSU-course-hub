import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {PROFESSORS, PROFESSOR_COMMENTS} from '../utils/graphql';
import {Card} from 'react-bootstrap';
import Link from 'next/link'
import { isAbsolute } from 'path';

const block = {
    position: 'absolute' as 'absolute',
    bottom: -200,
    left: 100
}

const container = {
    marginLeft: 50,
    marginTop: 10,
    borderSize: 2,
    borderColor: '#eb8934',
    borderRadius: 15,
    borderStyle: 'solid',
    width: 500,
    padding: 10,
    paddingRight: 0,
    backgroundColor: '#f2f2f2',
}

const variable = {
    marginLeft: 5,
    fontWeight: 700,
    fontSize: 25,
}

const constant = {
    fontSize: 15,
}

const department = {
    margin: 0,
    color: '#4a4a4a',
}

const item = {
    margin: 0
}

interface Comment {
    quality: number,
    difficulty: number
}

interface Professor {
    id: number,
    firstName: string,
    lastName: string,
    college: string
}

const GetProfessorComments = (professor: Professor, professorQuality) => {
    console.log(professor.id)
    const {loading, error, data} = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: parseInt(professor.id)},
    });
    if (error) {
        return <div>Error</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    }
    var quality: number[] = []
    console.log(data)
    data.professorComments.forEach((comment: Comment) => {
        quality.push(comment.quality);
    })
    var averageQuality
    /*if(quality.length > 0)
        averageQuality = (quality.reduce((a, b) => a + b, 0) / quality.length)
    else
        averageQuality = 0*/
    if(data.professorComments.length > 0){
        for(var i = 0; i < data.professorComments.length; i++){
            averageQuality += data.professorComments[i].quality
        }
    }
    else {
        averageQuality = 0
    }
    console.log(averageQuality)
    professorQuality = {
        professor: professor,
        averageQuality: averageQuality
    }
    return
}

const GetHighestRatedProfessors = (professors: Professor[]) => {
    var professorsRatings = []
    var professorQuality
    professors.forEach((professor) => {
        GetProfessorComments(professor, professorQuality)
        console.log(professorQuality)
        professorsRatings.push(professorQuality)
    })

    return professorsRatings
}

const GetDifficultyQuality = (difficulty: number[], quality: number[], id: number) => {
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
    console.log(quality)
    console.log(difficulty)
    return
}

const HighestRatedProfessor: React.FC = () => {
    const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const professors = data.professors;
    var topProfessors = GetHighestRatedProfessors(professors)
    const sortedProfessors = topProfessors.slice().sort((a, b) => b.averageQuality - a.averageQuality);
    var topProfessors = professors.slice(professors.length - 3);
    console.log(topProfessors)
    return (
        <div style={block}>
            {topProfessors.map((professor) => {
                var difficulty: number[] = []
                var quality: number[] = []
                GetDifficultyQuality(difficulty, quality, professor.id)
                var averageQuality
                var averageDifficulty
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
                console.log(averageQuality)
                return (
                    <Card style={container} bg="light" border="dark">
                        <Card.Title>                    
                            <Link href={`/professor/${professor.id}`}>
                                <b>{professor.firstName} {professor.lastName}</b>
                            </Link>
                        </Card.Title>
                        <Card.Text style={department}>{professor.college}</Card.Text>
                        <Card.Text style={item}>Quality: 
                            <span style={variable}>{averageQuality}</span>
                            <span style={constant}>/5</span>
                        </Card.Text>
                        <Card.Text style={item}>Difficulty: 
                            <span style={variable}>{averageDifficulty}</span>
                            <span style={constant}>/5</span>
                        </Card.Text>
                    </Card>
                );
            })}
        </div>
    );
}

export default HighestRatedProfessor;
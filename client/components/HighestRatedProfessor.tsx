import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {PROFESSORS, PROFESSOR_COMMENTS, COMMENTS} from '../utils/graphql';
import {Card} from 'react-bootstrap';
import Link from 'next/link'

const professorBlock = {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    borderSize: 2,
    borderColor: '#eb8934',
    borderRadius: 15,
    borderStyle: 'solid',
    minWidth: 300,
    maxWidth: 600,
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

const Info = (professorRatings) => {
    console.log(professorRatings)
    return (
        <div style={{"width": "50%", "padding": "10px", "display": "flex",
         "flex-direction": "column", "align-items": "center"}} className="border">
            <h4 style={{"text-align": "center", "padding": "10px"}}>Highest Rated Professors:</h4>
            {professorRatings.professorRatings.map((object, index) => {
                let professor = object.professor
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
                    <Card style={professorBlock} style={{"width": "80%", "padding": "10px", 
                    "margin-top": "10px"}} bg="light" border="dark">
                        {index + 1}
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
    )
}

const RenderTopProfessors = ({professors}: Professor[]) => {
    const { loading, error, data } = useQuery(COMMENTS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.comments.filter((comment) => comment.professorID != null)
    let professorRatings = []
    for(let i = 0; i < professors.length; i++){
        let ratings = []
        for(let j = 0; j < comments.length; j++){
            if(comments[j].professorID == professors[i].id){
                ratings.push(comments[j].quality)
            }
        }
        let averageQuality
        if(ratings.length > 0){
            averageQuality = (ratings.reduce((a, b) => a + b, 0) / ratings.length)
        }
        else {
            averageQuality = 0
        }
        let currProfessor = {
            professor: professors[i],
            rating: averageQuality
        }
        professorRatings.push(currProfessor)
    }
    let sortedProfessors = professorRatings.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
    console.log(comments)
    console.log(sortedProfessors)

    return (
        <Info professorRatings={sortedProfessors}/>
    )
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
    return
}

const HighestRatedProfessor: React.FC = () => {
    const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    return (
        <RenderTopProfessors professors={data.professors}/>
    );
}

export default HighestRatedProfessor;
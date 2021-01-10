import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {PROFESSORS, PROFESSOR_COMMENTS, COMMENTS} from '../utils/graphql';
import {Card, Row, Spinner} from 'react-bootstrap';
import Link from 'next/link'

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
    professorID: number,
    quality: number,
    difficulty: number
}

interface Professor {
    id: number,
    firstName: string,
    lastName: string,
    college: string
}

interface ProfessorRating {
    professor: Professor,
    rating: number
}

const GetDifficulty = (difficulty: number[], id: number) => {
    const {loading, error, data} = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: parseInt(id)},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
    }
    const comments = data.professorComments;
    comments.forEach((comment: Comment) => {
        difficulty.push(comment.difficulty)
    });
    return
}

const Info = (topProfessors: ProfessorRating) => {
    console.log(topProfessors)
    return (
        <div style={{"width": "50%", "padding": "10px", "display": "flex",
         "flexDirection": "column", "alignItems": "center", "maxWidth": "1000px"}} className="border">
            <h4 style={{"textAlign": "center", "padding": "10px"}}>Highest Rated Professors:</h4>
            {topProfessors.topProfessors.map((object: ProfessorRating, index: number) => {
                let professor = object.professor
                let difficulty: number[] = []
                GetDifficulty(difficulty, professor.id)
                let averageDifficulty
                if(difficulty.length > 0){
                    averageDifficulty = (difficulty.reduce((a, b) => a + b, 0) / difficulty.length)
                }
                else {
                    averageDifficulty = 0
                }
                return (
                    <div style={{"display": "flex", "justifyContent": "center", 
                    "width": "80%", "marginRight": "30px"}} key={professor.id}>
                        <div style={{"margin": "auto", "fontSize": "30px"}}>
                            <b>{index + 1}</b>
                        </div>
                        <Card style={{"width": "90%", "padding": "10px", 
                        "marginTop": "10px"}} bg="light" border="dark">
                                <Row className='pl-3 pr-4'>
                                    <Card.Title>
                                        <Link href={`/professor/${professor.id}`}>
                                            <b>{professor.firstName} {professor.lastName}</b>
                                        </Link>
                                    </Card.Title>
                                    <Card.Text style={department} className='text-right ml-auto'>{professor.college}</Card.Text>
                                </Row>                    
                            <Card.Text style={item}>Quality: 
                                <span style={variable}>{object.rating}</span>
                                <span style={constant}>/5</span>
                            </Card.Text>
                            <Card.Text style={item}>Difficulty: 
                                <span style={variable}>{averageDifficulty}</span>
                                <span style={constant}>/5</span>
                            </Card.Text>
                        </Card>
                    </div>
                );
            })}
        </div>
    )
}

const RenderTopProfessors = ({professors}) => {
    const { loading, error, data } = useQuery(COMMENTS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
    }
    const comments = data.comments.filter((comment: Comment) => comment.professorID != null)
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
    let topProfessors = professorRatings.slice().sort((a, b) => b.rating - a.rating).slice(0, 3);
    console.log(comments)
    return (
        <Info topProfessors={topProfessors}/>
    )
}

const HighestRatedProfessor: React.FC = () => {
    const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
    }
    return (
        <RenderTopProfessors professors={data.professors}/>
    );
}

export default HighestRatedProfessor;
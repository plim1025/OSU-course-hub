import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {PROFESSORS, PROFESSOR_COMMENTS} from '../utils/graphql';
import {Card} from 'react-bootstrap';
import Link from 'next/link'
import { isAbsolute } from 'path';

const block = {
    position: 'absolute',
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

const HighestRatedProfessor: React.FC = () => {
    const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const professors = data.professors;
    console.log(professors);
    const sortedProfessors = professors.slice().sort((a,b) => b.averageQuality - a.averageQuality);
    const topProfessors = sortedProfessors.slice(sortedProfessors.length - 3);
    console.log(topProfessors);
    const averageQuality = (professor.quality.reduce((a, b) => a + b, 0) / professor.quality.length)
    console.log(averageQuality)
    const averageDifficulty = (professor.difficulty.reduce((a, b) => a + b, 0) / professor.difficulty.length)
    console.log(averageDifficulty)
    return (
        <div style={block}>
            {topProfessors.map((professor) => {
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
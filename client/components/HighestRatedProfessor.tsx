import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {PROFESSORS, PROFESSOR_COMMENTS} from '../utils/graphql';

const container = {
    marginLeft: 50,
    marginTop: 50,
    borderSize: 2,
    borderColor: '#eb8934',
    borderRadius: 15,
    borderStyle: 'solid',
    width: "40%",
    padding: 10,
    paddingRight: 0,
    backgroundColor: '#f2f2f2'
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
    marginTop: 0,
    color: '#4a4a4a',
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

const ProfessorTags = () => {
    const {loading, error, data} = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: 1},
    });
    if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.professorComments;
    var tags: string[] = [];
    comments.forEach(comment => comment.tags.forEach(tag => tags.push(tag)));
    
    function onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }
    tags = tags.filter(onlyUnique);
    console.log(tags);

    return (
        <div style={tagBlock}>
            <h5>Tags: </h5>
            {tags.map((tag) => {
                return (
                    <p style={tagList}><span style={aTag}>{tag}</span></p>
                );
            })}
        </div>
    );
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
    const sortedProfessors = professors.slice().sort((a,b) => a.averageQuality > b.averageQuality);
    const professor = sortedProfessors[sortedProfessors.length - 1];
    console.log(sortedProfessors);
    return (
        <div style={container}>
            <h4>Highest Rated Professor: </h4>
            <h4><b>{professor.firstName} {professor.lastName}</b></h4>
            <h5 style={department}>{professor.college}</h5>
            <h5>Quality: 
                <span style={variable}>{professor.averageQuality}</span>
                <span style={constant}>/5</span>
            </h5>
            <h5>Difficulty: 
                <span style={variable}>{professor.averageDifficulty}</span>
                <span style={constant}>/5</span>
            </h5>
            <ProfessorTags />
        </div>
    );
}

export default HighestRatedProfessor;
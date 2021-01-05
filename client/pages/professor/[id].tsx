import ProfessorInfo from '../../components/ProfessorInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import TestingAPI from '../../components/TestingAPI';
import { ApolloClient, getApolloContext, useQuery } from '@apollo/client';
import {PROFESSORS, PROFESSOR, PROFESSOR_COMMENTS} from 'utils/graphql';
import { useRouter } from 'next/router'
import Comment from '../../components/Comment';
import { Container } from 'react-bootstrap';

interface CommentI {
    ONID: number;
    baccCore: boolean;
    campus: string;
    courseID: number;
    createdAt: Date;
    dislikes: number;
    gradeReceived: string;
    id: string;
    likes: number;
    professorID: number;
    recommend: boolean;
    tags: string[];
    text: string;
    quality: number;
    difficulty: number;
}

const ProfessorComments = () => {
    const { loading, error, data } = useQuery(PROFESSOR_COMMENTS, {
        variables: {professorID: 1}
    });
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
    }
    const comments = data.professorComments;
    console.log(comments);
	return (
		<Container style={{ height: '1000px' }}>
			{comments.map((comment: CommentI, i: number) => {
				return <Comment key={i} props={comment} />;
			})}
		</Container>
	);
}

export default function Professor() {
	const router = useRouter();
	/*const [queryId, setQueryId] = useState(null)
	useEffect(() => {
		if(router && router.query) {
		setQueryId(router.query.id)
		}
	}, [router]);
	console.log(queryId);*/
	const {id} = router.query;
	console.log(id);
    /*const {data} = useQuery(PROFESSOR, {
        variables: {professorID: id},
    });
	console.log(data);
	const professor = null;
	if(data){
		professor = data.professor.professor;
		console.log(professor);
	}*/
	const { loading, error, data } = useQuery(PROFESSORS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}	
	console.log(data);
	var professor = null;
	if(data){
		const professors = data.professors.filter(professor => professor.id == id);
		professor = professors[0];
	}
	if(professor){
		return (
			<>
				<Head>
					<title>OSU Course Hub</title>
					<link rel='icon' href='/favicon.png' />
				</Head>
				<Header searchbarToggled={false} />
				<ProfessorInfo professor={professor}/>
				<ProfessorComments />
			</>
		);
	}
	else {
		return (
			<div>
				<h3>404 Error: Page does not exist</h3>
			</div>
		)
	}
}

/*export async function getStaticPaths() {
	const { data } = await apolloClient.query({
		query: PROFESSORS,
	});
	const paths = data.professors.map((professor) => `professor/${professor.id}`);
	console.log(paths);
    return {
      paths,
      fallback: false
    }
}*/
import StudentInfo from '../../components/StudentInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import { useQuery } from '@apollo/client';
import {STUDENTS, STUDENT} from 'utils/graphql';
import { useRouter } from 'next/router';
import Error from '../../components/404';
import {Spinner} from 'react-bootstrap';

interface Student {
    ONID: string
}

export default function Student({students}) {
	const router = useRouter();
	const {id} = router.query;
	const { loading, error, data } = useQuery(STUDENTS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}	
	var student = null;
	if(data){
		const students = data.students.filter((student: Student) => student.ONID == id);
		student = students[0];
    }
    //const theStudents = students.filter((student: Student) => student.ONID == id);
    //let student = theStudents[0];
	if(student){
		return (
			<>
				<Head>
					<title>OSU Course Hub</title>
					<link rel='icon' href='/favicon.png' />
				</Head>
				<Header searchbarToggled={true} />
				<StudentInfo student={student}/>
			</>
		);
	}
	else {
		return (
			<Error props="student"/>
		)
	}
}

/*export function getStaticPaths(){
    const { data } = useQuery(STUDENTS);
    const paths = data.students.map((student) => `/student/${student.id}`);

    return {paths, fallback: false}
}

export const getStaticProps = async () => {
    const { data } = useQuery(STUDENTS);
    return {
        props: {
            students: data.students
        }
    }
}*/
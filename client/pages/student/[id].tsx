import StudentInfo from '../../components/StudentInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import { useQuery } from '@apollo/client';
import {STUDENTS, STUDENT} from 'utils/graphql';
import { useRouter } from 'next/router';
import Error from '../../components/404';

interface Student {
    ONID: string
}

export default function Professor() {
	const router = useRouter();
	const {id} = router.query;
	console.log(id);
	const { loading, error, data } = useQuery(STUDENTS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}	
	console.log(data);
	var student = null;
	if(data){
		const students = data.students.filter((student: Student) => student.ONID == id);
		student = students[0];
    }
    console.log(student)
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
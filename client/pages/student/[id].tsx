import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { STUDENT } from '../../utils/graphql';
import { StudentType } from '../../utils/types';
import Error from '../../components/404';
<<<<<<< HEAD
import {Spinner} from 'react-bootstrap';

interface Student {
    ONID: string
}

export default function Student(props) {
	const router = useRouter();
	const {id} = router.query;
	/*const { loading, error, data } = useQuery(STUDENTS);
	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}	
	var student = null;
	if(data){
		const students = data.students.filter((student: Student) => student.ONID == id);
		student = students[0];
	}*/
	//const {data} = useQuery('STUDENTS', getStudents, {initialData: props.students})
    const theStudents = props.filter((student: Student) => student.ONID == id);
    let student = theStudents[0];
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
	//const { data } = useQuery(STUDENTS);
	const students = await getStudents();
    return {
        props: {students}
    }
}*/

/*export const getServerSideProps = async () => {
	const { data } = useQuery(STUDENTS);
	const students = data.students
    return {
        props: {students}
    }
}*/
=======
import Header from '../../components/Header';
import StudentInfo from '../../components/StudentInfo';

const StudentPage = () => {
	const router = useRouter();
	const { loading, error, data } = useQuery<StudentType>(STUDENT, {
		variables: { ONID: router.query.id },
		skip: !router.query.id,
	});

	if (error || !data) {
		return <Error props='student' />;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Head>
				<title>OSU Course Hub</title>
				<link rel='icon' href='/favicon.png' />
			</Head>
			<Header searchbarToggled={true} />
			<StudentInfo student={data.student} />
		</>
	);
};

export default StudentPage;
>>>>>>> 03772be3945398d75ef7cdc63b9d68818871ff2b

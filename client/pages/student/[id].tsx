import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { STUDENT } from '../../utils/graphql';
import { StudentType } from '../../utils/types';
import Error from '../../components/404';
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

import { useQuery } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../../components/Header';
import StudentInfo from '../../components/StudentInfo';
import { STUDENT } from '../../utils/graphql';
import { StudentType } from '../../utils/types';

const StudentPage = () => {
	const router = useRouter();
	console.log(router.query.id)
	const { loading, data } = useQuery<StudentType>(STUDENT, {
		variables: {
			ONID: router.query.id
			/*ONID: /^\d+$/.test(router.query.id as string)
				? parseInt(router.query.id as string)
				: null,*/
		},
		skip: !router.query.id,
	});

	if (loading || !router.query.id) {
		return <></>;
	} else if (!data) {
		return <Error statusCode={404} />;
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

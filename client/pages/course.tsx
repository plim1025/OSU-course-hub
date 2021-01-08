import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Comment from '../components/Comment';
import Header from '../components/Header';
import AddComment from '../components/AddComment';
import { COMMENTS } from 'utils/graphql';
import { Container, Button } from 'react-bootstrap';

export default function course() {
	const { loading, error, data } = useQuery(COMMENTS);

	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header searchbarToggled={false} />
			<AddComment />
			<Container style={{ height: '1000px' }}>
				{data.comments.map((comment, i: number) => {
					return <Comment key={i} props={comment} />;
				})}
			</Container>
		</>
	);
}

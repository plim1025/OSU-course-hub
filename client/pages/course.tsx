import { useQuery } from '@apollo/client';
import React from 'react';
import { COMMENTS } from '../utils/graphql';
import { CommentData } from '../utils/types';
import Comment from '../components/Comment';
import Header from '../components/Header';

export default function course() {
	const { loading, error, data } = useQuery<CommentData>(COMMENTS);

	if (error) {
		return <div>Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Header searchbarToggled={false} />
			{data
				? data.comments.map(comment => <Comment key={comment.id} comment={comment} />)
				: null}
		</>
	);
}

import { useQuery } from '@apollo/client';
import { CommentType } from '../utils/types';
import { COURSE_COMMENTS } from '../utils/graphql';

const tagBlock = {
	marginTop: 10,
};

const tagList = {
	marginTop: 5,
	marginRight: 5,
	fontSize: 12,
	fontWeight: 600,
	display: 'inline',
};

const aTag = {
	padding: 5,
	backgroundColor: '#d9d7d7',
	borderRadius: 20,
};

const CourseTags = ({ id }) => {
	const { loading, error, data } = useQuery<CommentType>(COURSE_COMMENTS, {
		variables: { courseID: parseInt(id) },
	});
	if (error) {
		return <div>Course Tags Error</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	}

	const tags = data.courseComments.map(comment => comment);
	// const comments = data.courseComments;
	// let tags: string[] = [];
	// comments.forEach(comment => comment.tags.forEach(tag => tags.push(tag)));

	// function onlyUnique(value: any, index: any, self: any) {
	// 	return self.indexOf(value) === index;
	// }
	// tags = tags.filter(onlyUnique);

	return (
		<div style={tagBlock}>
			<h4>Tags: </h4>
			{tags.length > 0 ? (
				tags.map(tag => (
					<p style={tagList}>
						<span style={aTag}>{tag}</span>
					</p>
				))
			) : (
				<b>N/A</b>
			)}
		</div>
	);
};

export default CourseTags;

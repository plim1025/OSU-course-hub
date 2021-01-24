import { useQuery } from '@apollo/client';
import { CommentData } from '../utils/types';
import { COURSE_COMMENTS, PROFESSOR_COMMENTS } from '../utils/graphql';
import { Spinner } from 'react-bootstrap';

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

interface Props {
	id: string;
	type: 'professor' | 'course';
}

const Tags: React.FC<Props> = ({ id, type }) => {
	const { loading, error, data } = useQuery<CommentData>(
		type === 'professor' ? PROFESSOR_COMMENTS : COURSE_COMMENTS,
		{
			variables: {
				...(type === 'course' && { courseID: parseInt(id) }),
				...(type === 'professor' && { professorID: parseInt(id) }),
			},
		}
	);

	if (error || !data) {
		return <div>Tags Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}

	let tagSet: Set<string> = new Set();
	data.comments.forEach(comment => comment.tags.forEach(tag => tagSet.add(tag)));
	let tags: string[] = [];
	tags = [...tagSet];

	return (
		<div style={tagBlock}>
			<h4>Tags: </h4>
			{tags.length > 0 ? (
				tags.map(tag => (
					<p key={tag} style={tagList}>
						<span style={aTag}>{tag}</span>
					</p>
				))
			) : (
				<b>N/A</b>
			)}
		</div>
	);
};

export default Tags;

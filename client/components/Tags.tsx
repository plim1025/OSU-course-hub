import { CommentData, CommentType } from '../utils/types';

const tagBlock = {
	marginTop: 10,
};

const tagList = {
	marginTop: 5,
	marginRight: 5,
	fontSize: 12,
	fontWeight: 600,
	display: 'inline-block',
};

const aTag = {
	padding: 5,
	backgroundColor: '#d9d7d7',
	borderRadius: 20,
};

interface Props {
	comments: CommentType[];
}

const Tags: React.FC<Props> = ({ comments }) => {
	let tagSet: Set<string> = new Set();
	comments.forEach(comment => comment.tags.forEach(tag => tagSet.add(tag)));
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

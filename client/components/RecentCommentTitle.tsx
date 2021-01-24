import { useQuery } from '@apollo/client';
import { COURSE, PROFESSOR } from '../utils/graphql';
import { Spinner } from 'react-bootstrap';

interface Props {
	courseID?: number;
	professorID?: number;
}

const RecentCommentTitle: React.FC<Props> = ({ courseID, professorID }) => {
	const { loading, error, data } = useQuery(courseID ? COURSE : PROFESSOR, {
		variables: {
			...(courseID && { courseID: courseID }),
			...(professorID && { professorID: professorID }),
		},
	});

	if (error || !data) {
		return <div>Error</div>;
	} else if (loading) {
		return <Spinner animation="border" size="sm" />;
	}
	return (
		<div>
			<h5>
				<b>
					{courseID ? `${data.course.department} ${data.course.number}` : null}
					{professorID ? `${data.professor.firstName} ${data.professor.lastName}` : null}
				</b>
			</h5>
		</div>
	);
};

export default RecentCommentTitle;

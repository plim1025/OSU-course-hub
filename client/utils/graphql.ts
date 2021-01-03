import { gql } from '@apollo/client';

export const PROFESSORS = gql`
	query professors {
		professors {
			id
			firstName
			lastName
			college
			difficulty
			averageDifficulty
			quality
			averageQuality
		}
	}
`;

export const COMMENTS = gql`
	query getcomments {
		comments {
			id
			text
			ONID
			courseID
			professorID
			campus
			recommend
			baccCore
			gradeReceived
			tags
			createdAt
			likes
			dislikes
		}
	}
`;

export const COURSE = gql`
	query getCourseByID($id: Float!) {
		course(courseID: $id) {
			course {
				id
				department
				number
			}
		}
	}
`;

export const PROFESSOR = gql`
	query getProfessorByID($id: Float!) {
		professor(professorID: $id) {
			professor {
				id
				firstName
				lastName
				college
			}
		}
	}
`;

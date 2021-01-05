import { gql } from '@apollo/client';

export const PROFESSORS = gql`
	query professors {
		professors {
			id
			firstName
			lastName
			college
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
			quality
			difficulty
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

// export const LIKE = gql`
// 	mutation upvote($id: Float!) {
// 		upvote(id: $id) {
// 			comment {
// 				id
// 				likes
// 			}
// 		}
// 	}
// `;

// export const DISLIKE = gql`
// 	mutation downvote($id: Float!) {
// 		downvote(id: $id) {
// 			comment {
// 				id
// 				dislikes
// 			}
// 		}
// 	}
// `;

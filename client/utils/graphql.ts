import { gql } from '@apollo/client';

// COMMENT //
export const COMMENTS = gql`
	query comments {
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

export const COURSE_COMMENTS = gql`
	query courseComments($courseID: Float!) {
		comments: courseComments(courseID: $courseID) {
			id
			anonymous
			text
			gradeReceived
			ONID
			courseID
			professorID
			recommend
			baccCore
			gradeReceived
			tags
			createdAt
			quality
			difficulty
			likes
			dislikes
		}
	}
`;

export const PROFESSOR_COMMENTS = gql`
	query professorComments($professorID: Float!) {
		comments: professorComments(professorID: $professorID) {
			id
			anonymous
			text
			difficulty
			quality
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

export const STUDENT_COMMENTS = gql`
	query studentComments($ONID: String!) {
		comments: studentComments(ONID: $ONID) {
			id
			anonymous
			text
			gradeReceived
			courseID
			professorID
			recommend
			baccCore
			gradeReceived
			tags
			createdAt
			quality
			difficulty
			likes
			dislikes
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation createComment(
		$anonymous: Boolean
		$text: String!
		$ONID: String!
		$quality: Int!
		$difficulty: Int!
		$professorID: Float
		$courseID: Float
		$campus: String
		$recommend: Boolean
		$baccCore: Boolean
		$gradeReceived: String
		$tags: [String!]!
	) {
		createComment(
			input: {
				anonymous: $anonymous
				text: $text
				ONID: $ONID
				quality: $quality
				difficulty: $difficulty
				professorID: $professorID
				courseID: $courseID
				campus: $campus
				recommend: $recommend
				baccCore: $baccCore
				gradeReceived: $gradeReceived
				tags: $tags
			}
		) {
			id
			anonymous
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

export const DELETE_COMMENT = gql`
	mutation deleteComment($id: Float!) {
		deleteComment(id: $id)
	}
`;

// COURSE //
export const COURSES = gql`
	query courses {
		courses {
			id
			department
			number
		}
	}
`;

export const COURSE = gql`
	query course($courseID: Float!) {
		course(courseID: $courseID) {
			id
			department
			number
		}
	}
`;

export const COURSE_PROFESSORS = gql`
	query courseProfessors($courseID: Float!) {
		professors: courseProfessors(courseID: $courseID) {
			id
			firstName
			lastName
			college
		}
	}
`;

export const CREATE_COURSE = gql`
	mutation createCourse($department: String!, $number: String!) {
		createCourse(input: { department: $department, number: $number }) {
			course {
				department
				number
			}
		}
	}
`;

export const ADD_PROFESSOR_TO_COURSE = gql`
	mutation professorInfo(
		$professorID: Float!
		$courseID: Float!
		$termTaught: String!
		$yearTaught: Float!
	) {
		addProfessorToCourse(
			professorID: $professorID
			courseID: $courseID
			termTaught: $termTaught
			yearTaught: $yearTaught
		) {
			professor {
				id
				firstName
				lastName
				college
			}
		}
	}
`;

// PROFESSOR //
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

export const PROFESSOR = gql`
	query professor($professorID: Float!) {
		professor(professorID: $professorID) {
			id
			firstName
			lastName
			college
		}
	}
`;

export const PROFESSOR_COURSES = gql`
	query professorCourses($professorID: Float!) {
		courses: professorCourses(professorID: $professorID) {
			id
			department
			number
		}
	}
`;

export const HIGHEST_RATED_PROFESSORS = gql`
	query highestRatedProfessors {
		professors: highestRatedProfessors {
			id
			firstName
			lastName
			college
		}
	}
`;

export const CREATE_PROFESSOR = gql`
	mutation professorInfo($firstName: String!, $lastName: String!, $college: String!) {
		createProfessor(input: { firstName: $firstName, lastName: $lastName, college: $college }) {
			professor {
				id
				firstName
				lastName
				college
			}
		}
	}
`;

export const ADD_COURSE_TO_PROFESSOR = gql`
	mutation professorInfo(
		$professorID: Float!
		$courseID: Float!
		$termTaught: String!
		$yearTaught: Float!
	) {
		addCourseToProfessor(
			professorID: $professorID
			courseID: $courseID
			termTaught: $termTaught
			yearTaught: $yearTaught
		) {
			professor {
				id
				firstName
				lastName
				college
			}
		}
	}
`;

// STUDENTS //
export const STUDENTS = gql`
	query students {
		students {
			ONID
			likedCommentIDs
			dislikedCommentIDs
		}
	}
`;

export const STUDENT = gql`
	query student($ONID: String!) {
		student(ONID: $ONID) {
			ONID
			likedCommentIDs
			dislikedCommentIDs
		}
	}
`;

export const CREATE_STUDENT = gql`
	mutation createStudent($ONID: String!) {
		createStudent(ONID: $ONID) {
			ONID
		}
	}
`;

export const LIKE_COMMENT = gql`
	mutation likeComment($ONID: String!, $commentID: Float!) {
		likeComment(ONID: $ONID, commentID: $commentID) {
			ONID
			likedCommentIDs
			dislikedCommentIDs
		}
	}
`;

export const DISLIKE_COMMENT = gql`
	mutation dislikeComment($ONID: String!, $commentID: Float!) {
		dislikeComment(ONID: $ONID, commentID: $commentID) {
			ONID
			likedCommentIDs
			dislikedCommentIDs
		}
	}
`;

export const DELETE_STUDENT = gql`
	mutation deleteStudent($ONID: String!) {
		deleteStudent(ONID: $ONID)
	}
`;

// TEXTBOOK //
export const COURSE_TEXTBOOKS = gql`
	query courseTextbooks($courseID: Float!) {
		textbooks: courseTextbooks(courseID: $courseID) {
			ISBN
			title
			author
			coverImageUrl
			edition
			copyrightYear
			priceNewUSD
			priceUsedUSD
		}
	}
`;

export const ADD_TEXTBOOK_TO_COURSE = gql`
	mutation addTextbookToCourse(
		$ISBN: String!
		$title: String!
		$author: String!
		$coverImageURL: String
		$edition: Float!
		$copyrightYear: Float!
		$priceNewUSD: Float
		$priceUsedUSD: Float
		$courseID: Float!
		$termUsed: String!
		$yearUsed: Float!
	) {
		addTextbookToCourse(
			input: {
				ISBN: $ISBN
				title: $title
				author: $author
				coverImageURL: $coverImageURL
				edition: $edition
				copyrightYear: $copyrightYear
				priceNewUSD: $priceNewUSD
				priceUsedUSD: $priceUsedUSD
			}
			courseID: $courseID
			termUsed: $termUsed
			yearUsed: $yearUsed
		) {
			ISBN
			title
			author
			coverImageUrl
			edition
			copyrightYear
			priceNewUSD
			priceUsedUSD
		}
	}
`;

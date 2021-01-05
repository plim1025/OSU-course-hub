import { gql } from '@apollo/client';

export const PROFESSORS = gql`
	query Professors {
		professors {
			id
			firstName
			lastName
			college
		}
	}
`;

export const PROFESSOR = gql`
	query Professor($professorID: Float!) {
		professor(professorID: $professorID) {
			professor {
				id
				firstName
				lastName
				college
			}
		}
	}
`;

export const PROFESSOR_COURSES = gql`
	query ProfessorCourses($professorID: Float!) {
		professorCourses(professorID: $professorID) {
			id
			department
			number
		}
	}
`;

export const CREATE_PROFESSOR = gql`
	mutation ProfessorInfo($firstName: String!, $lastName: String!, $college: String!) {
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
	mutation ProfessorInfo(
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

//Course queries and mutations
export const COURSES = gql`
	query Courses {
		courses {
			id
			department
			number
		}
	}
`;

export const CREATE_COURSE = gql`
	mutation CourseInfo($department: String!, $number: String!) {
		createCourse(input: { department: $department, number: $number }) {
			course {
				department
				number
			}
		}
	}
`;

//Textbook queries and mutations
export const COURSE_TEXTBOOKS = gql`
	query TextbookInfo($courseID: Float!) {
		getCourseTextbooks(courseID: $courseID) {
			ISBN
			title
			author
		}
	}
`;

//fix
export const ADD_TEXTBOOK_TO_COURSE = gql`
	mutation TextbookInfo(
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
			textbook {
				ISBN
				title
				author
			}
			error {
				path
				message
			}
		}
	}
`;

//Student queries and mutations
export const STUDENTS = gql`
	query students {
		students {
			ONID
		}
	}
`;

export const STUDENT = gql`
	query student($ONID: String!) {
		student(ONID: $ONID) {
			student {
				ONID
			}
		}
	}
`;

export const CREATE_STUDENT = gql`
	mutation StudentInfo($ONID: String!) {
		createStudent(input: { ONID: $ONID }) {
			ONID
		}
	}
`;

//Comment queries and mutations
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

export const COURSE_COMMENTS = gql`
	query courseComments($courseID: Float!) {
		courseComments(courseID: $courseID) {
			id
			text
			gradeReceived
			courseID
			professorID
			recommend
			baccCore
			gradeReceived
			tags
			createdAt
		}
	}
`;

export const PROFESSOR_COMMENTS = gql`
	query professorComments($professorID: Float!) {
		professorComments(professorID: $professorID) {
			id
			text
			gradeReceived
			courseID
			professorID
			recommend
			baccCore
			gradeReceived
			tags
			createdAt
		}
	}
`;

export const STUDENT_COMMENTS = gql`
	query studentComments($ONID: String!) {
		studentComments(ONID: $ONID) {
			id
			text
			gradeReceived
			courseID
			professorID
			recommend
			baccCore
			gradeReceived
			tags
			createdAt
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation createComment(
		$text: String!
		$ONID: String!
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
				text: $text
				ONID: $ONID
				professorID: $professorID
				courseID: $courseID
				campus: $campus
				recommend: $recommend
				baccCore: $baccCore
				gradeReceived: $gradeReceived
				tags: $tags
			}
		) {
			comment {
				id
				text
				gradeReceived
				courseID
				professorID
				recommend
				baccCore
				gradeReceived
				tags
				createdAt
			}
		}
	}
`;

export const DELETE_COMMENT = gql`
	mutation DeleteComment($id: Float!) {
		deleteComment(id: $id)
	}
`;

/*export const CREATE_COMMENT = gql `
    mutation createComment($comment: CommentInput!){
        createComment(comment: $comment){
            comment {
                id
                text
                gradeReceived
                courseID
                professorID
                recommend
                baccCore
                gradeReceived
                tags
                createdAt
            }
            error {
                path
                message
            }
        }
    }
`;*/

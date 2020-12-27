import { gql } from '@apollo/client';


//Professor queries and mutations
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
            averageQuality,
		}
	}
`;

export const PROFESSOR = gql `
    query Professor($professorID: Float!) {
        professor(professorID: $professorID) {
            professor {
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
    }
`;

export const PROFESSOR_COURSES = gql `
    query ProfessorCourses($professorID: Float!){
        professorCourses(professorID: $professorID){
            id,
            department,
            number,
        }
    }
`;

export const CREATE_PROFESSOR = gql `
    mutation ProfessorInfo($firstName: String!, $lastName: String!, $college: String!){
        createProfessor(input: {firstName: $firstName, lastName: $lastName, college: $college}){
            professor {
                id,
                firstName, 
                lastName, 
                college
            }
        }
    }
`;

export const RATE_QUALITY_PROFESSOR = gql `
    mutation ProfessorInfo($professorID: Float!, $rating: Float!){
        rateQualityProfessor(professorID: $professorID, rating: $rating){
            professor {
                id,
                firstName,
                lastName,
                quality
            }
        }
    }
`;

export const RATE_DIFFICULTY_PROFESSOR = gql `
    mutation ProfessorInfo($professorID: Float!, $rating: Float!){
        rateDifficultyProfessor(professorID: $professorID, rating: $rating){
            professor {
                id,
                firstName,
                lastName,
                difficulty
            }
        }
    }
`;

export const ADD_COURSE_TO_PROFESSOR = gql `
    mutation ProfessorInfo($professorID: Float!, $courseID: Float!, $termTaught: String!, $yearTaught: Float!){
        addCourseToProfessor(professorID: $professorID, courseID: $courseID, 
            termTaught: $termTaught, yearTaught: $yearTaught){
            professor {
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
    }
`;

//Course queries and mutations
export const COURSES = gql `
    query courses {
        courses {
            id,
            department,
            number,
            quality,
            difficulty
        }
    }
`;

export const COURSE = gql `
    query Course($courseID: Float!) {
        course(courseID: $courseID) {
            course {
                id,
                department,
                number,
            }
        }
    }
`;

export const CREATE_COURSE = gql `
    mutation CourseInfo($department: String!, $number: String!){
        createCourse(input: {department: $department, number: $number}){
            course {
                department,
                number,
            }
        }
    }
`;

export const RATE_QUALITY_COURSE = gql `
    mutation CourseInfo($courseID: Float!, $rating: Float!){
        rateQualityCourse(courseID: $courseID, rating: $rating){
            course {
                id,
                department,
                number,
                quality,
                averageQuality
            }
        }
    }
`;

export const RATE_DIFFICULTY_COURSE = gql `
    mutation CourseInfo($courseID: Float!, $rating: Float!){
        rateDifficultyCourse(courseID: $courseID, rating: $rating){
            course {
                id,
                department,
                number,
                difficulty
            }
        }
    }
`;

//Textbook queries and mutations
//fix
export const COURSE_TEXTBOOKS = `
    query CourseTextbookInfo($courseID: Float!){
        getCourseTextbooks(courseID: $courseID){
            ISBN,
            title,
            author,
        }
    }
`; 

//fix
export const ADD_TEXTBOOK_TO_COURSE = `
    mutation CourseTextbookInfo($ISBN: String!, $title: String!, $author: String!, $edition: Float!,
        $copyrightYear: Float!, $priceNewUSD: Float!, $priceUsedUSD: Float!, $courseID: Float!, 
        $termUsed: String!, $yearUsed: Float!) {
            addTextbookToCourse(input: {ISBN: $ISBN, title: $title, author: $author, edition: $edition, 
            copyrightYear: $copyrightYear, priceNewUSD: $priceNewUSD, priceUsedUSD: $priceUsedUSD}, 
            courseID: $courseID, termUsed: $termUsed, yearUsed: $yearUsed){
                textbook {
                    ISBN,
                    title,
                    author
                }
            }
    }
`;

//Student queries and mutations
export const STUDENTS = gql`
    query students {
        students {
            ONID,
        }
    }
`;

export const STUDENT = gql`
    query student($ONID: String!) {
        student(ONID: $ONID) {
            student {
                ONID,
            }
        }
    }
`;

export const CREATE_STUDENT = gql `
    mutation StudentInfo($ONID: String!){
        createStudent(input: {ONID: $ONID}){
            ONID   
        }
    }
`;

//Comment queries and mutations
//fix
export const COURSE_COMMENTS = gql `
    query courseComments($courseID: Float!){
        courseComments(courseID: $courseID){
            comments {
                text,
                ONID,
                professorID,
                courseID
            }
        }
    }
`;

//fix
export const PROFESSOR_COMMENTS = gql `
    query professorComments($professorID: Float!){
        professorComments(professorID: $professorID){
            comments {
                text,
                ONID,
                professorID,
                courseID
            }
        }
    }
`;

//fix
export const STUDENT_COMMENTS = gql `
    query studentComments($ONID: Float!){
        studentComments(ONID: $ONID){
            comments {
                text,
                ONID,
                professorID,
                courseID
            }
        }
    }
`;

export const CREATE_COMMENT = gql `
    mutation createComment($text: String!, $ONID: String!, $professorID: Float!, $courseID: Float!){
        createComment(input: {text: $text, ONID: $ONID, professorID: $professorID, courseID: $courseID}){
            comment {
                text,
                ONID,
                professorID,
                courseID
            }
        }
    }
`;
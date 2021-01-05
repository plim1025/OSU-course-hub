export interface CourseData {
	courses: Course[];
}

interface Course {
	id: number;
	department: string;
	number: number;
	comments: Comment[];
}

export interface ProfessorData {
	professors: Professor[];
}

interface Professor {
	id: number;
	firstName: string;
	lastName: string;
	college: string;
	comments: Comment[];
}

export interface CommentData {
	comments: Comment[];
}

interface Comment {
	id: number;
	text: string;
	difficulty: number;
	quality: number;
	ONID: string;
	courseID?: number;
	professorID?: number;
	campus?: string;
	recommend?: boolean;
	baccCore?: boolean;
	gradeReceived?: string;
	tags: string[];
	createdAt: Date;
	likes: number;
	dislikes: number;
}

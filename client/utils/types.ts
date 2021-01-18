export interface CourseData {
	courses: Course[];
}

export interface Course {
	id: string;
	department: string;
	number: number;
	comments: CommentType[];
}

export interface ProfessorData {
	professors: Professor[];
}

export interface Professor {
	id: string;
	firstName: string;
	lastName: string;
	college: string;
	comments: CommentType[];
}

export interface CommentData {
	comments: CommentType[];
}

export interface CommentType {
	id: string;
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

export interface StudentData {
	student: Student;
}

export interface Student {
	ONID: string;
	likedCommentIDs: number[];
	dislikedCommentIDs: number[];
}

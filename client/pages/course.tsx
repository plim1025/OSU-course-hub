import React from 'react';
import { Card } from 'react-bootstrap';
import Comment from '../components/Comment';

const date = new Date();

const data = {
	quality: 4,
	text: 'This course is awesome!!',
	difficulty: 3,
	tags: ['easy', 'fun'],
	campus: 'Corvallis',
	gradeReceived: 'A',
	createdAt: date,
};

export default function course() {
	return <Comment props={data}></Comment>;
}

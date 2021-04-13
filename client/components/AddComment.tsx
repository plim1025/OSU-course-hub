import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { CREATE_COMMENT } from '../utils/graphql';
import { CommentType } from '../utils/types';
import { Campuses, Grades, Tags } from '../utils/util';
import Router from 'next/router';

interface Props {
	show: boolean;
	setShow: (value: boolean) => void;
	handleClose: () => void;
	addOneComment: (comment: CommentType) => void;
}

const AddComment: React.FC<Props> = ({show, setShow, handleClose, addOneComment}) => {
	const [values, setValues] = useState({
		anonymous: false,
		text: '',
		campus: 'Corvallis',
		quality: 5,
		difficulty: 5,
		recommend: true,
		baccCore: true,
		gradeReceived: 'N/A',
		tags: [],
	});
	const [createComment] = useMutation(CREATE_COMMENT);
	const rating = [5, 4, 3, 2, 1];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const studentID = window.sessionStorage.getItem('request-onid');
		let comment: CommentType;
		if(Router.pathname === "/course/[id]"){
			createComment({ variables: { ...values, ONID: studentID, courseID: parseInt(Router.query.id as string) } })
			.then((data) => {
				comment = data.data.createComment
				addOneComment(comment)
			})
			.catch((error) => console.log(error))
		}
		else if(Router.pathname === "/professor/[id]"){
			createComment({ variables: { ...values, ONID: studentID, professorID: parseInt(Router.query.id as string) } })
			.then((data) => {
				comment = data.data.createComment
				addOneComment(comment)
			})
			.catch((error) => console.log(error))
		}
		
		setValues({
			anonymous: false,
			text: '',
			campus: 'Corvallis',
			quality: 5,
			difficulty: 5,
			recommend: true,
			baccCore: true,
			gradeReceived: 'N/A',
			tags: [],
		})
		setShow(false);
	};

	const handleRating = (e: any) =>
		setValues({ ...values, [e.target.name]: parseFloat(e.target.value) });

	const handleChange = (e: any) => {
		if (e.target.name == 'recommend' || e.target.name == 'baccCore') {
			const option = e.target.value == 'Yes' ? true : false;
			setValues({ ...values, [e.target.name]: option });
		} else {
			setValues({ ...values, [e.target.name]: e.target.value });
		}
	};

	const handleTags = (e: any) => {
		const idx = values.tags.indexOf(e.target.name as never);

		if (idx === -1) {
			setValues({ ...values, tags: [...values.tags as never, e.target.name as never] });
		} else {
			const newTags = values.tags;
			newTags.splice(idx);
			setValues({ ...values, tags: newTags });
		}
	};

	const handleAnonymous = () => {
		if(values.anonymous === true){
			setValues({ ...values, anonymous: false });
		} else {
			setValues({ ...values, anonymous: true });
		}
	};

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Form onSubmit={handleSubmit} className='p-4'>
					<Modal.Header closeButton>
						<Modal.Title>Add Comment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId='anonymous'>
							<Form.Check
								className='mr-3'
								type='checkbox'
								name='anonymous'
								label='Anonymous'
								onChange={handleAnonymous}
							/>
						</Form.Group>
						<Form.Group controlId='text'>
							<Form.Label>Comment</Form.Label>
							<Form.Control
								as='textarea'
								rows={5}
								name='text'
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='campus'>
							<Form.Label>Campus</Form.Label>
							<Form.Control as='select' name='campus' onChange={handleChange}>
								{Campuses.map((campus, idx) => {
									return (
										<option value={campus} key={idx}>
											{campus}
										</option>
									);
								})}
								<option value='Other'>Other</option>
							</Form.Control>
						</Form.Group>
						<Row>
							<Col>
								<Form.Group controlId='quality'>
									<Form.Label>Quality</Form.Label>
									<Form.Control
										as='select'
										name='quality'
										onChange={handleRating}
									>
										{rating.map((rating, idx) => {
											return (
												<option value={rating} key={idx}>
													{rating}
												</option>
											);
										})}
									</Form.Control>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group controlId='difficulty'>
									<Form.Label>Difficulty</Form.Label>
									<Form.Control
										as='select'
										name='difficulty'
										onChange={handleRating}
									>
										{rating.map((rating, idx) => {
											return (
												<option value={rating} key={idx}>
													{rating}
												</option>
											);
										})}
									</Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group controlId='recommend'>
							<Form.Label>Recommend</Form.Label>
							<Form.Control as='select' name='recommend' onChange={handleChange}>
								<option value='Yes'>Yes</option>
								<option value='No'>No</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId='baccCore'>
							<Form.Label>Took it as Bacc Core?</Form.Label>
							<Form.Control as='select' name='baccCore' onChange={handleChange}>
								<option value='Yes'>Yes</option>
								<option value='No'>No</option>
							</Form.Control>
						</Form.Group>
						<Form.Group controlId='gradeReceived'>
							<Form.Label>Grade</Form.Label>
							<Form.Control as='select' name='gradeReceived' onChange={handleChange}>
								<option>N/A</option>
								{Grades.map((grade, idx) => {
									return (
										<option value={grade} key={idx}>
											{grade}
										</option>
									);
								})}
							</Form.Control>
						</Form.Group>
						<Form.Label>Tags: </Form.Label> <br />
						{Tags.map((tag, idx) => {
							return (
								<Form.Check
									className='mr-3'
									inline
									label={tag}
									type='checkbox'
									key={idx}
									name={tag}
									onChange={handleTags}
								/>
							);
						})}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='primary' type='submit'>
							Add Comment
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
};

export default AddComment;

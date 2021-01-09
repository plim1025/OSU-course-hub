import { fromPromise } from '@apollo/client';
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Grades, Campuses, Tags } from '../utils/util';

const AddComment: React.FC = () => {
	const [values, setValues] = useState({
		comment: '',
		campus: 'Corvallis',
		quality: 5,
		difficulty: 5,
		recommend: 'N/A',
		baccCore: 'N/A',
		grade: 'N/A',
		tags: [],
	});
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const rating = [5, 4, 3, 2, 1];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(values);
		// setShow(false);
	};

	const handleChange = (e: React.FormEvent) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<Button variant='outline-info' onClick={handleShow}>
				New Comment
			</Button>

			<Modal show={show} onHide={handleClose} className='w-100'>
				<Form onSubmit={handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Add Comment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId='comment'>
							<Form.Label>Comment</Form.Label>
							<Form.Control as='textarea' rows={5} />
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
									<Form.Control as='select'>
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
									<Form.Control as='select'>
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
							<Form.Control as='select'>
								<option value='N/A'>N/A</option>
								<option value='Yes'>Yes</option>
								<option value='No'>No</option>
							</Form.Control>
						</Form.Group>

						<Form.Group controlId='baccCore'>
							<Form.Label>Took it as Bacc Core?</Form.Label>
							<Form.Control as='select'>
								<option value='N/A'>N/A</option>
								<option value='Yes'>Yes</option>
								<option value='No'>No</option>
							</Form.Control>
						</Form.Group>

						<Form.Group controlId='grade'>
							<Form.Label>Grade</Form.Label>
							<Form.Control as='select'>
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

						<Form.Group controlId='tags'>
							<Form.Label>Tags: </Form.Label> <br />
							{Tags.map((tag, idx) => {
								return (
									<Form.Check
										className='mr-3'
										inline
										label={tag}
										type='checkbox'
										key={idx}
									/>
								);
							})}
						</Form.Group>
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

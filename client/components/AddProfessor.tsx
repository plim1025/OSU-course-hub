import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function AddProfessor() {
	const [values, setValues] = useState({
		department: '',
		number: '',
	});
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e: React.FormEvent) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShow(false);
	};

	return (
		<div>
			<Button variant='outline-info' onClick={handleShow}>
				Add Course
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Form onSubmit={handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Add Course</Modal.Title>
					</Modal.Header>

					<Form.Group controlId='text'>
						<Form.Label>Comment</Form.Label>
						<Form.Control as='textarea' rows={5} name='text' onChange={handleChange} />
					</Form.Group>

					<Modal.Footer>
						<Button variant='primary' type='submit'>
							Add Course
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
}

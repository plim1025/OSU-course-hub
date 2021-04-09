import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_COURSE, CREATE_PROFESSOR } from 'utils/graphql';
import { Colleges, Departments } from '../utils/util';
import { useRouter } from 'next/router';

export default function AddProfessor() {
	const router = useRouter();
	const [values, setValues] = useState({
		type: 'course',
		department: '',
		number: '',
		firstname: '',
		lastname: '',
		college: '',
	});
	const [show, setShow] = useState(false);

	const [setProfessor] = useMutation(CREATE_PROFESSOR);
	const [setCourse] = useMutation(CREATE_COURSE);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e: any) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (values.type == 'course') {
			// console.log({ deparment: values.department, number: values.number });
			setCourse({ variables: { department: values.department, number: values.number } });
		} else if (values.type == 'professor') {
			setProfessor({
				variables: {
					firstName: values.firstname,
					lastName: values.lastname,
					college: values.college,
				},
			});
		} else {
			alert('Invalid type error from AddProfessor.tsx');
		}
		setShow(false);
		router.reload();
	};

	return (
		<div>
			<Button variant='outline-info' onClick={handleShow}>
				Add Page
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Page</Modal.Title>
				</Modal.Header>

				<Form onSubmit={handleSubmit} className='p-3'>
					<Form.Label>Would you like to add a Professor or Course</Form.Label>
					<Form.Control as='select' name='type' onChange={handleChange} className='mb-3'>
						<option value='course'>Course</option>
						<option value='professor'>Professor</option>
					</Form.Control>

					{values.type == 'course' && (
						<>
							<Form.Label>Department</Form.Label>
							<Form.Control
								as='select'
								name='department'
								onChange={handleChange}
								className='mb-3'
								required
							>
								<option value=''>Select a Department</option>
								{Departments.map((department, idx) => {
									return (
										<option value={department} key={idx}>
											{department}
										</option>
									);
								})}
							</Form.Control>
							<Form.Label>Number</Form.Label>
							<Form.Control
								type='text'
								name='number'
								onChange={handleChange}
								className='mb-3'
								required
							/>
						</>
					)}

					{values.type == 'professor' && (
						<>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								name='firstname'
								onChange={handleChange}
								className='mb-3'
								required
							/>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								name='lastname'
								onChange={handleChange}
								className='mb-3'
								required
							/>
							<Form.Label>Colleges</Form.Label>
							<Form.Control
								as='select'
								name='college'
								onChange={handleChange}
								className='mb-3'
								defaultValue='Select Dept'
								required
							>
								<option value=''>Select a College</option>
								{Colleges.map((college, idx) => {
									return (
										<option value={college} key={idx}>
											{college}
										</option>
									);
								})}
							</Form.Control>
						</>
					)}

					<Modal.Footer>
						<Button variant='primary' type='submit'>
							Add Page
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
}

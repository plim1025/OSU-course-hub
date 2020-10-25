import React from 'react';
import Button from './Button';
import { Form } from 'react-bootstrap';

const wrapper = {
	maxWidth: 800,
	width: 'calc(100% - 40px)',
	margin: 'auto',
	background: '#fff',
}



const Searchbar: React.FC = () => {
	return (
		<Form style={wrapper}>
			<Form.Group controlId="searchbar">
				<Form.Control type="text" size="lg" placeholder="Search..."/>
			</Form.Group>
			
			<Button variant="primary">
				Submit
			</Button>
		</Form>
	);
};

export default Searchbar;

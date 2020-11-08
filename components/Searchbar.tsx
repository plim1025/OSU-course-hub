import React, { CSSProperties } from 'react';
import Button from './Button';
import { Form } from 'react-bootstrap';

interface Props {
	style?: CSSProperties
}

const wrapper = {
	maxWidth: 800,
	width: 'calc(100% - 40px)',
	margin: 'auto',
	background: '#fff',
	position: 'fixed',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)'
} as React.CSSProperties



const Searchbar: React.FC<Props> = (props) => {
	return (
		<Form style={props.style? props.style : wrapper}>
			<Form.Group controlId="searchbar">
				<Form.Control type="text" size="lg" placeholder="Search..."/>
			</Form.Group>
			
			<Button variant="primary" text='Submit' />
		</Form>
	);
};

export default Searchbar;

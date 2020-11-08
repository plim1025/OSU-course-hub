import React, { CSSProperties } from 'react';
import Button from './Button';
import Searchbar from './Searchbar';
import { Form } from 'react-bootstrap';

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



const MainSearchbar: React.FC = () => {
	return (
		<Form style={wrapper}>
			<Form.Group controlId="searchbar">
				<Searchbar size="lg"/>
			</Form.Group>

            <Button variant="primary" text='Submit' />
		</Form>
	);
};

export default MainSearchbar;

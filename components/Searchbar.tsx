import React, { CSSProperties } from 'react';
import { Form, FormControlProps} from 'react-bootstrap';

interface Props {
	style?: CSSProperties,
	size: string
}

const Searchbar: React.FC<Props> = (props) => {
	return (
		<Form.Control style={props.style} type="text" size={props.size} placeholder="Search..."/>
	);
};

export default Searchbar;

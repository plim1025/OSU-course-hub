import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
    variant: string,
    style?: React.CSSProperties,
    text: string,
}

const button = {
	background: '#d73f09',
};

const Searchbar: React.FC<Props> = props => {
	return (
        <Button style={{...button, ...props.style}} variant={props.variant}>{props.text}</Button>
	);
};

export default Searchbar;

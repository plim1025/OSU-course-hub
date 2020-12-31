import React from 'react';
import { Card, Container } from 'react-bootstrap';

interface Props {
	props: {
		quality: number;
		text: string;
		difficulty: number;
		tags: string[];
		campus?: string;
		recommend?: boolean;
		baccCore?: boolean;
		gradeReceived: string;
		createdAt: Date;
	};
}

const Searchbar: React.FC<Props> = props => {
	const data = props.props;
	console.log(data);
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Title>Card Title</Card.Title>
				<Card.Text>
					Some quick example text to build on the card title and make up the bulk of the
					card's content.
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Searchbar;

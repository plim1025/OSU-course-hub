import React from 'react';

const Course = () => {
	return <h3 style={{ marginBottom: '0px' }}>404 Error: Course Does Not Exist</h3>;
};

const Professor = () => {
	return <h3 style={{ marginBottom: '0px' }}>404 Error: Professor Does Not Exist</h3>;
};

const Student = () => {
	return <h3 style={{ marginBottom: '0px' }}>404 Error: Student Does Not Exist</h3>;
};

interface Props {
	props: string;
}

const Error: React.FC<Props> = props => {
	let message;
	if (props.props === 'course') message = <Course />;
	if (props.props === 'professor') message = <Professor />;
	if (props.props === 'student') message = <Student />;

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, 50%)',
				marginTop: '-33px',
			}}
		>
			{message}
		</div>
	);
};

export default Error;

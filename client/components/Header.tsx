import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { CREATE_STUDENT } from '../utils/graphql';
import { Auth } from './Auth';
import Searchbar from './Searchbar';

interface Props {
	searchbarToggled: boolean;
}

const logo = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: 50,
	margin: 'auto',
	marginRight: 10,
};

const headerSearchBarStyle = {
	marginLeft: 'auto',
	marginRight: 20,
};

const Header: React.FC<Props> = props => {
	const [ONID, setONID] = useState<string | null>();
	const [createStudent] = useMutation(CREATE_STUDENT);

	useEffect(() => {
		if (window && window.sessionStorage && window.sessionStorage.getItem('request-onid')) {
			setONID(window.sessionStorage.getItem('request-onid'));
		} else {
			const jwt_token = new URL(window.location.href).searchParams.get('jwt');
			if (jwt_token) {
				const split_token = jwt_token.split('.');
				const newONID = JSON.parse(atob(split_token[1])).onid;
				window.sessionStorage.setItem('request-onid', newONID);
				createStudent({ variables: { ONID: newONID } });
				window.location.href = window.location.href.split('?')[0] + '';
			}
		}
	}, []);

	const logout = () => {
		window.sessionStorage.removeItem('request-onid');
		window.location.reload();
	};

	return (
		<Navbar bg='dark' variant='dark' collapseOnSelect expand='md'>
			<Navbar.Brand href='/' style={{ fontWeight: 700 }}>
				<img
					src={'/favicon.png'}
					style={logo}
					className='d-inline-block align-center'
				></img>
				OSU Course Hub
			</Navbar.Brand>
			{props.searchbarToggled ? (
				<Searchbar style={headerSearchBarStyle} showButton={false} size='sm' />
			) : null}
			{ONID ? (
				<Navbar.Collapse>
					<Nav.Link
						style={{
							marginLeft: 'auto',
							color: '#fff',
						}}
						href={`/student/${ONID}`}
					>
						{ONID}
					</Nav.Link>
					<Nav style={{ padding: '0 20px' }}>
						<Nav.Link onClick={logout}>Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			) : (
				<Button
					style={{
						marginLeft: !props.searchbarToggled ? 'auto' : '',
						background: '#d73f09',
					}}
					variant='primary'
					onClick={Auth}
				>
					Login
				</Button>
			)}
		</Navbar>
	);
};

export default Header;

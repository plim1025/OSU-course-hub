import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Auth } from './Auth';
import Button from './Button';
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

	useEffect(() => {
		if (window && window.sessionStorage && window.sessionStorage.getItem('request-onid')) {
			setONID(window.sessionStorage.getItem('request-onid'));
		} else {
			const jwt_token = new URL(window.location.href).searchParams.get('jwt');
			if (jwt_token) {
				const split_token = jwt_token.split('.');
				window.sessionStorage.setItem(
					'request-onid',
					JSON.parse(atob(split_token[1])).onid
				);
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
					<Navbar.Text
						style={{
							marginLeft: 'auto',
							color: '#fff',
						}}
					>
						{ONID}
					</Navbar.Text>
					<Nav style={{ padding: '0 20px' }}>
						<Nav.Link onClick={logout}>Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			) : (
				<Button
					style={{ marginLeft: !props.searchbarToggled ? 'auto' : '' }}
					variant='primary'
					text='Login'
					onClick={Auth}
				/>
			)}
		</Navbar>
	);
};

export default Header;

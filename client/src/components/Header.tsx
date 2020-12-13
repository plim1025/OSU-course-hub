import React from 'react';
import { Navbar } from 'react-bootstrap';
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
	return (
		<Navbar bg='dark' variant='dark'>
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
			<Button style={{ marginLeft: !props.searchbarToggled && 'auto' }} variant='primary' text='Login' />
		</Navbar>
	);
};

export default Header;

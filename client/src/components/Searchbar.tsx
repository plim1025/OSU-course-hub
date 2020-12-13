import React, { useState, CSSProperties } from 'react';
import Button from './Button';
import AsyncSelect from 'react-select/async';
import { Form } from 'react-bootstrap';

interface Props {
	showButton: boolean;
	size: 'lg' | 'sm';
	style?: CSSProperties;
}

const largeWrapper = {
	maxWidth: 800,
	width: 'calc(100% - 40px)',
	margin: 'auto',
	background: '#fff',
	position: 'fixed',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
} as React.CSSProperties;

const smallWrapper = {
	width: 400,
};

const searchBtn = {
	marginTop: 12,
} as React.CSSProperties;

const select = {
	control: (provided: any) => ({
		...provided,
		cursor: 'text',
	}),
};

const mockData = [
	{ value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
	{ value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
	{ value: 'purple', label: 'Purple', color: '#5243AA' },
	{ value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
	{ value: 'orange', label: 'Orange', color: '#FF8B00' },
	{ value: 'yellow', label: 'Yellow', color: '#FFC400' },
	{ value: 'green', label: 'Green', color: '#36B37E' },
	{ value: 'forest', label: 'Forest', color: '#00875A' },
	{ value: 'slate', label: 'Slate', color: '#253858' },
	{ value: 'silver', label: 'Silver', color: '#666666' },
];

const loadOptions = (inputValue: any, callback: any) => {
	setTimeout(() => {
		callback(
			mockData.filter(data => data.label.toLowerCase().includes(inputValue.toLowerCase()))
		);
	}, 100);
};

const Searchbar: React.FC<Props> = props => {
	const [, setInputValue] = useState('');

	const handleInputChange = (newValue: string) => {
		const newInputValue = newValue.replace(/\W/g, '');
		setInputValue(newInputValue);
		return newInputValue;
	};

	return (
		<Form style={{ ...props.style, ...(props.size === 'lg' ? largeWrapper : smallWrapper) }}>
			<AsyncSelect
				inputId='searchbar-select'
				styles={select}
				cacheOptions
				loadOptions={loadOptions}
				placeholder={props.size === 'lg' ? 'Search classes and professors...' : 'Search...'}
				onInputChange={handleInputChange}
				noOptionsMessage={() => null}
				components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
			/>
			{props.showButton ? <Button variant='primary' text='Submit' style={searchBtn} /> : null}
		</Form>
	);
};

export default Searchbar;

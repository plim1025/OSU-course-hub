import React, { useState } from 'react';
import React, { CSSProperties } from 'react';
import Button from './Button';
import AsyncSelect from 'react-select/async';
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

const searchBtn = {
	marginTop: 20
} as React.CSSProperties

const select = {
	maxWidth: 500
} as React.CSSProperties

const colourOptions = [
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

const filterData = (inputValue: string) => {
	//console.log("filterData");
	console.log(colourOptions.filter((data) => data.label.
	toLowerCase().includes(inputValue.toLowerCase())));
	return colourOptions.filter((data) => data.label.
		toLowerCase().includes(inputValue.toLowerCase())
	);
}

const loadOptions = (inputValue: any, callback: any) => {
	//console.log("options");
	setTimeout(() => {
		callback(filterData(inputValue));
	  }, 100);
	//return filterData(inputValue);
}

const Searchbar: React.FC = () => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (newValue: string) => {
		const newInputValue = newValue.replace(/\W/g, '');
		setInputValue(newInputValue);
	};
	console.log(inputValue);
	return (
		<>
			<Form style={wrapper}>
				<AsyncSelect
					inputId="searchBarSelect"
					style={select} 
					cacheOptions
					value={inputValue}
					loadOptions={loadOptions} 
					defaultOptions
					placeholder={"Search..."}
					onInputChange={handleInputChange} 
				/>
				<Button variant="primary" text='Submit' style={searchBtn}/>
			</Form>
		</>
	);
};

export default Searchbar;

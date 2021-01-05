import { useQuery } from '@apollo/client';
import React, { CSSProperties, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { COURSES, PROFESSORS } from 'utils/graphql';
import { CourseData, ProfessorData } from 'utils/types';
import Button from './Button';

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
		minHeight: 48,
	}),
};

const Searchbar: React.FC<Props> = props => {
	const [menu, openMenu] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const {
		loading: loadingProfessors,
		error: professorError,
		data: professorData,
	} = useQuery<ProfessorData>(PROFESSORS);
	const { loading: loadingCourses, error: coursesError, data: courseData } = useQuery<CourseData>(
		COURSES
	);

	const handleInputChange = (newValue: string, { action }) => {
		if (action === 'input-change') {
			openMenu(true);
		}
		setInputValue(newValue);
		return newValue;
	};

	const handleChange = () => {
		openMenu(false);
	};

	if (loadingProfessors || loadingCourses) {
		return <div>Loading...</div>;
	} else if (professorError || coursesError) {
		return <div>Error</div>;
	}
	return (
		<Form style={{ ...props.style, ...(props.size === 'lg' ? largeWrapper : smallWrapper) }}>
			<Select
				inputValue={inputValue}
				inputId='searchbar-select'
				styles={select}
				cacheOptions
				placeholder={props.size === 'lg' ? 'Search classes and professors...' : 'Search...'}
				onInputChange={handleInputChange}
				onChange={handleChange}
				onBlur={() => openMenu(false)}
				components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
				menuIsOpen={menu}
				options={
					professorData && courseData
						? [
								...professorData.professors.map(
									professor =>
										`${professor.firstName} ${professor.lastName}`
											.toLowerCase()
											.split(' ')
											.map(s => s.charAt(0).toUpperCase() + s.substring(1))
											.join(' ') + ` - College of ${professor.college}`
								),
								...courseData.courses.map(
									course => `${course.department} ${course.number}`
								),
						  ].map(name => ({
								value: name,
								label: name,
						  }))
						: []
				}
			/>
			{props.showButton ? <Button variant='primary' text='Submit' style={searchBtn} /> : null}
		</Form>
	);
};

export default Searchbar;

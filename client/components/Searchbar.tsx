import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import React, { CSSProperties, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select, { InputActionTypes } from 'react-select';
import { COURSES, PROFESSORS } from 'utils/graphql';
import { CourseData, ProfessorData } from 'utils/types';

interface Props {
	showButton: boolean;
	size: 'lg' | 'sm';
	style?: CSSProperties;
}

const largeWrapper = {
	maxWidth: 1000,
	width: 'calc(100% - 80px)',
	margin: 'auto',
	background: '#fff',
	marginTop: 100,
} as React.CSSProperties;

const smallWrapper = {
	width: 400,
};

const select = {
	control: (provided: any) => ({
		...provided,
		cursor: 'text',
		minHeight: 48,
	}),
	option: (provided: any) => ({
		...provided,
		cursor: 'pointer',
	}),
};

const Searchbar: React.FC<Props> = props => {
	const router = useRouter();
	const [menu, openMenu] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const { loading: loadingProfessors, data: professorsData } = useQuery<ProfessorData>(
		PROFESSORS
	);
	const { loading: loadingCourses, data: coursesData } = useQuery<CourseData>(COURSES);

	const handleInputChange = (newValue: string, { action }: { action: InputActionTypes }) => {
		if (action === 'input-change') {
			openMenu(true);
		}
		setInputValue(newValue);
		return newValue;
	};

	const handleChange = (newValue: any) => {
		openMenu(false);
		router.push(`/${newValue.type}/${newValue.id}`);
	};

	if (loadingProfessors || loadingCourses || !professorsData || !coursesData) {
		return <></>;
	}
	return (
		<Form style={{ ...props.style, ...(props.size === 'lg' ? largeWrapper : smallWrapper) }}>
			<Select
				inputValue={inputValue}
				value={null}
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
					professorsData && coursesData
						? [
								...professorsData.professors.map(professor => ({
									id: professor.id,
									type: 'professor',
									value: `${professor.firstName} ${professor.lastName} ${professor.college}`,
									label:
										`${professor.firstName} ${professor.lastName}`
											.toLowerCase()
											.split(' ')
											.map(s => s.charAt(0).toUpperCase() + s.substring(1))
											.join(' ') + ` - College of ${professor.college}`,
								})),
								...coursesData.courses.map(course => ({
									id: course.id,
									type: 'course',
									value: `${course.department} ${course.number}`,
									label: `${course.department} ${course.number}`,
								})),
						  ]
						: []
				}
			/>
		</Form>
	);
};

export default Searchbar;

import { gql } from '@apollo/client';

export const PROFESSORS = gql`
	query professors {
		professors {
			id
			firstName
			lastName
			college
			difficulty
			averageDifficulty
			quality
			averageQuality
		}
	}
`;

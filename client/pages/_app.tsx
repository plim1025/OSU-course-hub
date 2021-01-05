import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';
import { useApollo } from 'utils/withApollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);
	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
};

export default App;

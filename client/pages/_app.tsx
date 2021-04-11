import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import { useApollo } from '../utils/withApollo';
//import Radium from 'radium';

let App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);
	return (
		//<StyleRoot>
			<ApolloProvider client={apolloClient}>
				<Component {...pageProps} />
			</ApolloProvider>
		//</StyleRoot>
	);
};

//const StyleRoot = Radium.StyleRoot;
//App = Radium(App)

export default App;

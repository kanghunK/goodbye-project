/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';


const MyApp = ({ Component }) => {
	useEffect(() => {
		const start = () => {
			NProgress.start();
		};
		const end = () => {
			NProgress.done();
		};

		Router.events.on('routeChangeStart', start);
		Router.events.on('routeChangeComplete', end);
		Router.events.on('routeChangeError', end);

		return () => {
			Router.events.off('routeChangeStart', start);
			Router.events.off('routeChangeComplete', end);
			Router.events.off('routeChangeError', end);
		};
	}, []);

	return (
		<>
			<React.Suspense fallback={<>loading</>}>
				<Head>
					<meta charSet="utf-8" />
					<link rel="shortcut icon" href="#" />
					<title>GoodBye</title>
				</Head>
				<Component />
			</React.Suspense>
		</>
	);
}

// MyApp.propTypes = {
// 	Component: PropTypes.node.isRequired
// }

export default wrapper.withRedux(MyApp);

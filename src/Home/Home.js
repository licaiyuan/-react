import React, { useState } from 'react';
import { Button } from 'antd';
import Navigation from '../comon/navigation';
const Home = props => {
	const go = () => {
		props.history.push('./contentManage');
	};
	return (
		<div>
			{/* <Navigation /> */}
			Home
			{/* <Button type="primary" onClick={go}>
				go contentMANAGE
			</Button> */}
		</div>
	);
};
export default Home;

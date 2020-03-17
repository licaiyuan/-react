import React, { useState, useContext, useEffect } from 'react';
import { Button, Menu } from 'antd';
import { ColorContext } from '../publicState';
const Navigation = props => {
	const { color, dispatch } = useContext(ColorContext);
	const handleClick = e => {
		console.log('click ', e);
		props.history.push('/contentManage');

		dispatch({ type: 'changemeauitem', item: e.key });
	};
	return (
		<div>
			{color.meauitem}
			<Menu onClick={handleClick} selectedKeys={'asdasd'} mode="horizontal">
				<Menu.Item key="Home"> Home </Menu.Item>
				<Menu.Item key="constentManage"> constentManage </Menu.Item>
			</Menu>
		</div>
	);
};
export default Navigation;

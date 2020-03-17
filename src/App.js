import React, { useState, useContext, useEffect } from 'react';

import { Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Button, Menu, Layout, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Router from './Router';
import { ColorContext } from './publicState';
import allsideList from './navagation'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


const App = props => {
	const { color, dispatch } = useContext(ColorContext);
	const [current, setcurrent] = useState('');

	useEffect(() => {
		// console.log(current);
	});

	var tabLis = [{ to: '首页', name: '首页' }, { to: '内容管理', name: '内容管理' }, { to: '用户管理', name: '用户管理' }]

	const [siderList, setSiderList] = useState([{ title: '课程管理', key: 'kcgl', MenuItems: [{ title: '标签管理', key: 'bqgl' }, { title: '新建课程', key: 'xjkc' }, { title: '课程审核', key: 'kcsh' }, { title: '课程库', key: 'kck' }] }])
	const handleClick = e => {

		console.log('click ', e);
		let { key } = e
		console.log(key)
		allsideList.forEach(item => {
			if (item['name'] == key) {
				setSiderList(item['content'])
			}

			console.log(item['name'])
		})
		// props.history.push('/contentManage');
		setcurrent(e.key)
		// dispatch({ type: 'changemeauitem', item: e.key });
	};
	return (
		<div className="App" >
			<BrowserRouter>
				<Layout>
					<Header className="header">

						<Menu onClick={handleClick} mode="horizontal">
							{
								tabLis.map(item =>

									(<Menu.Item key={item.to}>{item.name}</Menu.Item>)
								)
							}
						</Menu>



					</Header>
					<Layout>
						<Sider width={300} className="site-layout-background">
							<Menu
								mode="inline"
								defaultSelectedKeys={[siderList[0]['key']]}
								defaultOpenKeys={[siderList[0]['key']]}
								style={{ height: '100%', borderRight: 0 }}
							>
								{
									siderList.map(item =>
										item.MenuItems ?
											(
												<SubMenu
													key={item.key}
													title={
														<span>

															{item.title}
														</span>
													}
												>
													{
														item.MenuItems.map(item2 => (
															<Menu.Item key={item2.key}><Link to={item2.key}>{item2.title}</Link></Menu.Item>
														))
													}
												</SubMenu>
											)
											:
											<Menu.Item key={item.key}>

												<Link to={item.key}>{item.title}</Link>
											</Menu.Item>
									)
								}



							</Menu>

						</Sider>
						<Layout style={{ padding: '0 24px 24px' }}>

							<Content
								className="site-layout-background"
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
								}}
							>
								<Router />
							</Content>
						</Layout>
					</Layout>
				</Layout>,
  </BrowserRouter>

		</div >
	);
};

export default App;

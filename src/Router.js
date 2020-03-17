import React from 'react';
import { HashRouter, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ConstentManage from './contentManage/contentManage';
import App from './App';
import Home from './Home/Home';
import Navigation from './comon/navigation'
import Kck from './contentManage/courseManagement/ckc'
import Xzkc from './contentManage/courseManagement/xzkc'
import People from './userManage/peopleManage'
import Bmmanage from './userManage/bmManage'
import Ztk from './contentManage/ztk/ztk'
import Bqgl from './contentManage/bqgl/bqgl'
const BasicRoute = () => (

	<Switch>
		{/* <Route exact path="/" component={App} /> */}
		<Route exact path="/" component={Home} />

		<Route path="/content" component={ConstentManage} />
		<Route path="/kck" component={Kck} />
		<Route path="/rqgl" component={People} />
		<Route path="/bmgl" component={Bmmanage} />
		<Route path="/ztk" component={Ztk} />
		<Route path="/bqgl" component={Bqgl} />
		<Route path="/xjkc" component={Xzkc} />
	</Switch>

);

export default BasicRoute;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Color } from './publicState';
import Router from './Router';
ReactDOM.render(<Color>< App /></Color>, document.getElementById('root'));
import React, { createContext, useReducer } from 'react';

export const ColorContext = createContext({});
var initState = {
	meauitem: '',
	ip: 'http://192.168.1.77:8089/'
}
const reducer = (state, action) => {
	switch (action.type) {
		case 'changemeauitem':
			console.log(action.item)
			console.log(state)
			// state.meauitem=action.item
			return { ...state, meauitem: action.item };
		default:
			return state;
	}
};

export const Color = props => {
	const [color, dispatch] = useReducer(reducer, initState);
	return <ColorContext.Provider value={{ color, dispatch }}>{props.children}</ColorContext.Provider>;
};

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import './App.css';

export default class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<News pageSize={15} apiKey={process.env.REACT_APP_API_KEY} />
			</div>
		);
	}
}

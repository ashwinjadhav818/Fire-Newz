import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

export default class App extends Component {
	categories = [
		'general',
		'business',
		'entertainment',
		'health',
		'science',
		'sports',
		'technology',
	];

	render() {
		return (
			<Router>
				<div>
					<Navbar categories={this.categories} />
					<Switch>
						<Route path="/" exact>
							<News
								pageSize={15}
								apiKey={process.env.REACT_APP_API_KEY}
								country="in"
								category="general"
							/>
						</Route>
						{this.categories.map((category) => (
							<Route path={'/category/' + category} exact>
								<News
									apiKey={process.env.REACT_APP_API_KEY}
									pageSize={15}
									country="in"
									category={category}
									key={category}
								/>
							</Route>
						))}
					</Switch>
				</div>
			</Router>
		);
	}
}

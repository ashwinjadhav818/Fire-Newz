import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

export default class News extends Component {
	static defaultProps = {
		country: 'in',
		pageSize: 15,
		category: 'general',
	};

	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
		apiKey: PropTypes.string.isRequired,
	};

	constructor() {
		super();
		this.state = {
			articles: '',
			loading: false,
			page: 1,
		};
	}

	async componentDidMount() {
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
		const data = await fetch(url);
		const res = await data.json();

		this.setState({
			articles: res.articles,
			totalResults: res.totalResults,
		});
	}

	nextPage = async () => {
		if (
			this.state.page + 1 >
			Math.ceil(this.state.totalResults / this.props.pageSize)
		) {
			return;
		} else {
			this.setState({
				articles: '',
			});
			let url = `https://newsapi.org/v2/top-headlines?country=${
				this.props.country
			}&apikey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${
				this.props.pageSize
			}&category=${this.props.category}`;
			let data = await fetch(url);
			let res = await data.json();
			this.setState({
				page: this.state.page + 1,
				articles: res.articles,
			});
		}
	};

	previousPage = async () => {
		this.setState({
			articles: '',
		});

		let url = `https://newsapi.org/v2/top-headlines?country=${
			this.props.country
		}&apikey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${
			this.props.pageSize
		}&category=${this.props.category}`;
		let data = await fetch(url);
		let res = await data.json();
		this.setState({
			page: this.state.page - 1,
			articles: res.articles,
		});
	};

	render() {
		const { pageSize } = this.props;

		return (
			<div className="container my-3">
				<h1 className="text-center my-2">Fire Newz - Top Headlines 🔥</h1>
				<div className="row d-flex justify-content-center align-items-center">
					{this.state.articles.length > 0 ? (
						this.state.articles.map(
							({ title, description, urlToImage, url }, index) => (
								<div className="col-md-4 col-md-2" key={index}>
									<NewsItem
										title={title ? title.slice(0, 50) : ''}
										description={description ? description.slice(0, 133) : ''}
										imageUrl={urlToImage}
										newsUrl={url}
									/>
								</div>
							)
						)
					) : (
						<div className="w-100 h-100 d-flex justify-content-center align-items-center m-2">
							<div
								className="spinner-border text-primary text-center"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					)}
					<div className="d-flex justify-content-between">
						<button
							className="btn btn-primary me-2"
							onClick={this.previousPage}
							disabled={this.state.page === 1}
						>
							&larr; Previous Page
						</button>
						<button
							className="btn btn-primary"
							onClick={this.nextPage}
							disabled={
								this.state.page + 1 >
								Math.ceil(this.state.totalResults / pageSize)
							}
						>
							Next Page &rarr;
						</button>
					</div>
				</div>
			</div>
		);
	}
}

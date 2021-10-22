import React, { Component } from 'react';

export default class NewsItem extends Component {
	render() {
		const {
			title,
			description,
			imageUrl,
			newsUrl,
			publishedAt,
			author,
			// source,
		} = this.props;

		return (
			<div className="card my-3">
				{/* <span className="position-absolute badge bg-primary top-0 end-0">
					{source ? source : 'Unknown Source'}
				</span> */}
				<img
					src={
						imageUrl
							? imageUrl
							: 'https://cannabis-regulations.ca/wp-content/uploads/2017/10/news-1.jpg'
					}
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{title}...</h5>
					<p className="card-text">{description}...</p>
					<p className="card-text">
						<small className="text-muted">
							By {author ? author : 'Unknown author'} on{' '}
							{new Date(publishedAt).toUTCString()}
						</small>
					</p>
					<a
						href={newsUrl}
						target="_blank"
						rel="noreferrer"
						className="btn btn-sm btn-primary"
					>
						Read More
					</a>
				</div>
			</div>
		);
	}
}

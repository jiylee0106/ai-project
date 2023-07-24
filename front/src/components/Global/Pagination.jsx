import PropTypes from 'prop-types';

const Pagination = ({
	totalPages,
	currentPage,
	handlePreviousClick,
	handleNextClick,
	handleClick,
}) => {
	const pageNumbers = [];
	const maxPages = 5;
	let startPage = 1;
	let endPage = totalPages;

	if (totalPages > maxPages) {
		const pageGroup = Math.ceil(currentPage / maxPages);

		startPage = (pageGroup - 1) * maxPages + 1;
		endPage = startPage + maxPages - 1;

		if (endPage > totalPages) {
			endPage = totalPages;
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<>
			<nav aria-label="Page navigation example">
				<ul className="flex items-center -space-x-px h-8 text-sm">
					<li>
						<button
							disabled={currentPage === 1}
							className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight ${
								currentPage === 1
									? 'text-gray-400 cursor-not-allowed'
									: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
							} bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
							onClick={handlePreviousClick}
						>
							<span className="sr-only">Previous</span>
							<svg
								className="w-2.5 h-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 1 1 5l4 4"
								/>
							</svg>
						</button>
					</li>
					{pageNumbers.map((pageNumber) => (
						<li key={pageNumber}>
							<button
								className={`flex items-center justify-center px-3 h-8 leading-tight ${
									currentPage === pageNumber
										? 'text-blue-600 border border-blue-300 bg-blue-50 z-10 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
										: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
								} bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
								onClick={() => handleClick(pageNumber)}
							>
								{pageNumber}
							</button>
						</li>
					))}
					<li>
						<button
							disabled={currentPage === totalPages}
							className={`flex items-center justify-center px-3 h-8 leading-tight ${
								currentPage === totalPages
									? 'text-gray-400 cursor-not-allowed'
									: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
							} bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
							onClick={handleNextClick}
						>
							<span className="sr-only">Next</span>
							<svg
								className="w-2.5 h-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
						</button>
					</li>
				</ul>
			</nav>
		</>
	);
};

Pagination.PropTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	handlePreviousClick: PropTypes.func.isRequired,
	handleNextClick: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default Pagination;

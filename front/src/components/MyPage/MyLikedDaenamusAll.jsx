import { useState, useEffect } from 'react';
import { getApi } from '../../services/api';
import { formatDate } from '../Util/Util';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import BackButton from '../Global/BackButton';

const MyLikedDaenamusAll = () => {
	const location = useLocation();
	const [forests, setForests] = useState([]);
	useEffect(() => {
		const fetchDaenamus = async () => {
			try {
				const res = await getApi('my/likeForestPosts');
				const postIdForests = res.data
					.filter((forest) => forest.postId !== null)
					.map((forest) => forest.postId);
				setForests(postIdForests);
			} catch (err) {
				console.log(err);
			}
		};

		if (!location.state || !location.state.forests) {
			fetchDaenamus();
		} else {
			setForests(location.state.forests);
		}
	}, [location.state]);

	return (
		<div className="max-w-4xl mx-auto pt-8">
			<BackButton />
			<h3 className="text-2xl text-gray-700 font-semibold mt-4 mb-12">
				내가 좋아한 모든 대나무숲{' '}
			</h3>
			<ul className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
				{forests.map((forest) => (
					<li
						key={forest._id}
						className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
					>
						<div className="flex justify-between items-center">
							<div>
								<h4 className="font-semibold text-gray-700 text-base">
									<Link to={`/daenamus/${forest._id}`}>
										<span className="hover:underline">{forest.title}</span>{' '}
									</Link>
									{forest.commentCount ? (
										<span className="text-blue-600 text-xs">
											({forest.commentCount})
										</span>
									) : (
										''
									)}
								</h4>
							</div>
							<div className="text-gray-500 my-1.5">
								<div>{formatDate(forest.createdAt)}</div>
								<div className="text-right text-xs mt-1">
									<EyeIcon className="w-3 mb-0.5 inline" /> {forest.views}
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MyLikedDaenamusAll;

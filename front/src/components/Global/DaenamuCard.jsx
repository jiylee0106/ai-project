import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {
	EyeIcon,
	ChatBubbleLeftEllipsisIcon,
	HandThumbDownIcon,
	HandThumbUpIcon,
} from '@heroicons/react/24/outline';

import {
	textToIcon,
	truncateString,
	formatRelativeTime,
	removeTag,
} from '../Util/Util';

const DaenamuCard = ({
	data: {
		content,
		updatedAt,
		mood,
		title,
		_id,
		views,
		commentCount,
		likeCount,
		dislikeCount,
	},
}) => {
	return (
		<div className="rounded-xl h-full">
			{/* 클릭 시 해당 카드의 상세 페이지로 이동하는 Link 컴포넌트로 감싸기 */}
			<Link to={`/daenamus/${_id}`}>
				<div className="h-full flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
					<span className="-ml-3 text-6xl">{textToIcon[mood]}</span>

					<h5 className="mt-5 mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
						{truncateString(title, 32)}
					</h5>

					<p className="mb-3 h-full font-normal text-gray-500 dark:text-gray-400">
						{truncateString(removeTag(content), 20)}
					</p>
					<div className="text-sm text-gray-500">
						{/* {userInfo ? userInfo.nickname : '알 수 없는 유저'} */}
						<span className="text-xs ml-2">
							{formatRelativeTime(updatedAt)}
						</span>
					</div>

					<div className="w-full flex justify-between text-sm font-medium text-center text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						<div className="flex items-center">
							<ChevronRightIcon className="w-4 mt-1" />
							<span className="ml-1">더보기</span>
						</div>
						<div className=" flex flex-row space-x-2">
							<EyeIcon className="w-4 mt-1" />
							<p>{views}</p>
							<HandThumbUpIcon className="w-4 mt-1" />
							<p>{likeCount}</p>
							<HandThumbDownIcon className="w-4 mt-1" />
							<p>{dislikeCount}</p>
							<ChatBubbleLeftEllipsisIcon className="w-4 mt-1" />
							<p>{commentCount}</p>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default DaenamuCard;

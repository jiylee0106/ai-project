import { useState } from 'react';
import Search from '../Global/Search';
import StoryCreateModal from '../Home/StoryCreateModal';
import StoryCardMap from '../Global/StoryCardMap';

const MyStories = () => {
	const [showStoryCreateModal, setShowStoryCreateModal] = useState(false);

	const handleButtonClick = () => {
		setShowStoryCreateModal(true);
		document.body.style.overflow = 'hidden'; // 배경 스크롤 막기
	};

	const handleModalClose = () => {
		setShowStoryCreateModal(false);
		document.body.style.overflow = 'auto'; // 배경 스크롤 허용
	};

	return (
		<>
			<div className="font-bold mb-8 md:p-10 block p-6 bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
				<div className="flex justify-between items-center mb-4 text-3xl font-semibold text-zinc-700">
					<div>내 스토리</div>
					<button
						onClick={handleButtonClick}
						type="button"
						className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>
						스토리 쓰기
					</button>
				</div>
				<div className="mb-20 text-sm font-medium text-zinc-600">
					내가 쓴 스토리를 확인할 수 있어요.
				</div>
				{showStoryCreateModal && (
					<>
						<StoryCreateModal
							showStoryCreateModal={showStoryCreateModal}
							handleModalClose={handleModalClose}
						/>
						<button
							type="button"
							onClick={handleModalClose}
							className="z-[1] fixed inset-0 w-full h-full bg-black opacity-60 cursor-default"
							aria-hidden="true"
						/>
					</>
				)}
				<div style={{ overflow: showStoryCreateModal ? 'hidden' : 'auto' }}>
					<Search />
					<StoryCardMap />
				</div>
			</div>
		</>
	);
};

export default MyStories;

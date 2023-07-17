import moment from 'moment'; // Import moment.js
import TextEditor from '../global/TextEditor';

// eslint-disable-next-line react/prop-types
const StoryCreateModal = ({ showStoryCreateModal, handleModalClose }) => {
	const currentDate = moment().format('YYYY년 M월 D일'); // Format the current date

	const modalStyle = showStoryCreateModal ? '' : 'hidden';

	return (
		<div
			id="staticModal"
			data-modal-backdrop="static"
			tabIndex="-1"
			aria-hidden="true"
			className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${modalStyle}`}
		>
			{/* 모달 내용 */}
			<div className="relative w-full max-w-2xl max-h-full">
				{/* 모달 콘텐츠 */}
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					{/* 모달 헤더 */}
					<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{currentDate}의 스토리 작성하기
						</h3>
						<button
							type="button"
							onClick={handleModalClose}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide="staticModal"
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{/* 모달 본문 */}
					<div className="p-6 space-y-6">
						<TextEditor />
					</div>
					{/* 모달 푸터 */}
					<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
						<button
							data-modal-hide="staticModal"
							type="button"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							작성 완료
						</button>
						<button
							onClick={handleModalClose}
							data-modal-hide="staticModal"
							type="button"
							className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						>
							닫기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryCreateModal;

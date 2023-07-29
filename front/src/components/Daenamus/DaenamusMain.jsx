import { useState } from 'react';
import Search from '../Global/Search';
import DaenamusCard from '../Global/DaenamusCard';
import { mbtiList } from '../Util/Util';
import { Link } from 'react-router-dom';

const DaenamusMain = () => {
	const [selectedMBTI, setSelectedMBTI] = useState([]);
	const [selectedTab, setSelectedTab] = useState('전체글');

	const toggleMBTI = (value) => {
		if (selectedMBTI.includes(value)) {
			setSelectedMBTI(selectedMBTI.filter((item) => item !== value));
		} else {
			setSelectedMBTI([...selectedMBTI, value]);
		}
	};

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
		//tab이 인기글이라면 인기글 요청, 전체글(최신순)이라면 전체글 요청하는 API 연결
	};

	return (
		<>
			<header>{/* Header 컴포넌트 */}</header>

			<div className="container mx-auto px-4">
				<div className="mt-8 mb-4">
					<Search />
				</div>

				<div className="font-bold md:p-10 block bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
					<div className="flex justify-between items-center mb-4 text-3xl font-semibold text-zinc-700">
						<div>대나무숲</div>
						<button
							type="button"
							className="w-36 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						>
							<Link to="/daenamus/write">글쓰기</Link>
						</button>
					</div>
					<div className="text-sm font-medium text-zinc-600">
						다양한 주제의 토론에 참가하고 나와 같은 유형이나 나와 다른 유형이
						어떻게 반응하는지 알아보아요.
					</div>
				</div>

				<div className="mb-8 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
					<ul className="flex flex-wrap -mb-px">
						{['전체글', '인기글'].map((tab) => (
							<li key={tab} className="mr-2">
								<button
									onClick={() => handleTabClick(tab)}
									className={`inline-block p-4 rounded-t-lg focus:outline-none ${
										selectedTab === tab
											? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
											: 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
									}`}
								>
									{tab}
								</button>
							</li>
						))}
					</ul>
				</div>

				<div className="text-sm text-gray-500 my-2">작성자 유형별로 조회</div>
				{mbtiList.map((item, index) => {
					const isSelected = selectedMBTI.includes(item.value);

					return (
						<span
							key={index}
							onClick={() => toggleMBTI(item.value)}
							className={`leading-9 cursor-pointer border pt-1 bg-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${
								isSelected
									? 'border-blue-600 text-blue-600'
									: 'border-gray-400 text-gray-400'
							} dark:bg-white ${
								isSelected ? 'dark:text-blue-300' : 'dark:text-gray-400'
							}`}
						>
							{item.label} {isSelected && <span>×</span>}
						</span>
					);
				})}

				<div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{Array.from({ length: 12 }).map((_, index) => (
						<div key={index}>
							<DaenamusCard />
						</div>
					))}
				</div>

				<div className="mt-8 flex justify-center">{/* 페이지네이션 */}</div>
			</div>
		</>
	);
};

export default DaenamusMain;
import { textToIcon, textToColor, formatDate } from '../Util/Util';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { delApi, getApi } from '../../services/api';
import { useEffect, useState } from 'react';
import { useUserId } from '../../store/useUserStore';
import StoryComment from './StoryComment';

const StoryRead = () => {
	const { storyId } = useParams();
	const [story, setStory] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [isPublicStory, setIsPublicStory] = useState(true); // New state for public/private check // New state for public/private check

	const navigate = useNavigate();

	const id = useUserId();
	const fetchData = async () => {
		try {
			const res = await getApi(`stories/${storyId}`);
			console.log(res);
			setStory(res.data);
			setIsDataLoading(true);

			setIsPublicStory(res.data.userInfo._id === id || res.data.isPublic);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await delApi(`stories/${storyId}`);
			navigate('/stories');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className={`w-4/5 max-w-2xl mx-auto dark:bg-gray-800`}>
			<button
				type="button"
				className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
			>
				<Link to="/stories">목록으로</Link>
			</button>

			{!isPublicStory ? (
				<div
					className={`flex items-center w-full h-80 max-w-2xl border border-gray-200 rounded-lg shadow mx-auto bg-white dark:bg-gray-800`}
					style={{
						backgroundColor: isDataLoading
							? textToColor[story.mood]
							: '#FFFFFF',
					}}
				>
					<p className="p-10">비공개 글입니다.</p>
				</div>
			) : (
				<div
					className={`w-full max-w-2xl border border-gray-200 rounded-lg shadow mx-auto bg-white dark:bg-gray-800`}
					style={{
						backgroundColor: isDataLoading
							? textToColor[story.mood]
							: '#FFFFFF',
					}}
				>
					<div className="relative h-52 overflow-hidden rounded-t-lg">
						<img
							className="w-full h-full object-cover"
							src={
								story.thumbnail
									? `http://localhost:3000/uploads/${story.thumbnail.fileName}`
									: 'https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg'
							}
							alt=""
						/>
						<div className="absolute inset-0 bg-black opacity-60">
							<div className="ms-4 mt-4 absolute top-1 left-1 p-4 z-10 max-w-md">
								<p className="text-white mb-1">
									{isDataLoading && formatDate(story.createdAt)}
								</p>
								<h5 className="leading-loose text-white text-2xl font-bold">
									{story.title}
								</h5>
							</div>
							<div className="text-sm text-end absolute top-1 right-1 mt-4 me-4">
								<p className="text-white mb-1">
									조회 {isDataLoading && story.views}
								</p>
								{isDataLoading && story.userInfo._id == id && (
									<>
										<button
											onClick={handleDelete}
											className="ml-2 text-white underline underline-offset-2 text-red-400"
										>
											삭제
										</button>
									</>
								)}
							</div>
						</div>
					</div>

					<div className="flex flex-col">
						<div className="relative -top-16 left-6 max-w-md">
							<div className="text-9xl">
								{isDataLoading && textToIcon[story.mood]}
							</div>
						</div>

						<div className="relative -top-20 p-10">
							{isDataLoading && <Viewer initialValue={story.content} />}
						</div>

						<div>
							<div className="w-12 h-12 mx-auto -mt-24 rounded-full overflow-hidden">
								<img
									className="w-full h-full object-cover"
									src={isDataLoading && story.userInfo.profileImg}
									alt="작성자 프로필 이미지"
								/>
							</div>
							<h5 className="text-center text-gray-700 mx-auto mt-2">
								{isDataLoading && story.userInfo.nickname}
							</h5>
							<p className="text-gray-400 text-xs text-center mt-1 mb-5">
								{isDataLoading && story.userInfo.mbti}
							</p>
						</div>
						<hr className="h-px bg-gray-300 border-0 dark:bg-gray-700 mx-6" />
						<div>
							<StoryComment storyId={storyId} commentList={story.commentList} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StoryRead;

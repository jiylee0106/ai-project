import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import useImageUpload from '../../hooks/useImageUpload';
import useStoryStore from '../../hooks/useStoryStore';
import { postApi } from '../../services/api';

const StoryEditor = () => {
	const {
		title,
		setTitle,
		content,
		thumbnail,

		music,
		setMood,
		setMusic,
		setPhrase,
		setContent,
		setThumbnail,
	} = useStoryStore();

	const [preview, setPreview] = useState('');

	const handleThumbnailUpload = async (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		setPreview(URL.createObjectURL(file));
	};

	const recommend = async () => {
		try {
			const response = await postApi('stories/recommend', { content });

			console.log(response);
			setMood(response.data.mood);
			setMusic(response.data.music);
			setPhrase(response.data.phrase);
		} catch (error) {
			console.log(error.response.data.errorMessage);
		}
	};

	const generateImage = async () => {
		try {
			const response = await postApi('image/stable', { content });
			setThumbnail(response.data.fileName);
		} catch (error) {
			console.log(error);
		}
	};
	//TODO: 로딩중 걸기

	const handleGenerate = async () => {
		const body = editorRef.current?.getInstance().getHTML() || '';

		setContent(body);
		generateImage();
	};

	const handleRecommend = () => {
		recommend();
		console.log(music);
	};

	const editorRef = useRef();

	const { handleImageUpload, loading } = useImageUpload();

	const onChange = () => {
		const body = editorRef.current.getInstance().getHTML();
		setContent(body);
		console.log(body);
	};

	return (
		<>
			<h3 className="font-semibold">제목</h3>
			<input
				className="border"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				type="text"
				id="title"
				value={title}
			/>
			<h3 className="font-semibold">본문</h3>
			<div className="mt-5">
				<Editor
					initialValue=" "
					placeholder="내용을 입력하세요."
					previewStyle="vertical"
					previewHighlight={false}
					height="400px"
					initialEditType="wysiwyg"
					language="ko-KR"
					toolbarItems={[
						// 툴바 옵션 설정
						['bold', 'italic', 'strike'],
						['hr', 'quote'],
						['ul', 'ol', 'task', 'indent', 'outdent'],
						['table', 'image', 'link'],
					]}
					hooks={{
						addImageBlobHook: handleImageUpload,
					}}
					ref={editorRef}
					onChange={onChange}
				/>
				{content?.length <= 16 && (
					<p className="text-right text-red-400">10자 이상 입력해주세요.</p>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<div className="flex flex-row space-x-2 mb-5">
					<div className="w-1/2">
						<div className="h-1/4 items-end">
							<input
								className="rounded-lg block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
								id="file_input"
								type="file"
								onChange={handleThumbnailUpload}
							/>
						</div>
						{preview && (
							<div className="h-3/4">
								<p className="text-sm text-gray-500">선택된 이미지:</p>
								<img
									className="h-full"
									src={preview}
									alt="Selected Thumbnail"
								/>
							</div>
						)}
					</div>
					<div className="w-1/2 ">
						<div className="h-1/4 flex">
							<button
								onClick={handleGenerate}
								disabled={content?.length <= 16}
								className="w-full h-8 bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								썸네일 이미지 생성하기
							</button>
						</div>
						{thumbnail && (
							<div className="h-3/4">
								<p className="text-sm text-gray-500">선택된 이미지:</p>
								<img
									className="h-full"
									src={`http://localhost:3000/uploads/${thumbnail}`}
								/>
							</div>
						)}
					</div>
				</div>

				<div className="w-full">
					<button
						onClick={handleRecommend}
						disabled={content?.length <= 16}
						className="w-full h-8 bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						기분에 맞는 음악 추천받기
					</button>
				</div>
			</div>

			{loading && <div>이미지 업로드 중...</div>}
		</>
	);
};

export default StoryEditor;

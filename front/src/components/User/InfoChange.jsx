import { useState, useCallback, useMemo } from 'react';
import Select from 'react-select';
import useUserStore from '../../store/useUserStore';
import { mbtiList } from '../Util/Util';

const InfoChange = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
		nickname: '',
		mbti: '',
		profileImg: '/images/loginimg.jpg',
	});

	const {
		email,
		nickname,
		mbti,
		profileImg,

		setEmail,
		setNickname,
		setMbti,
		setProfileImg,
	} = useUserStore();

	const [password, setPassword] = useState('');

	const [confirmPassword, setConfirmPassword] = useState('');

	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const [isNicknameFocused, setIsNicknameFocused] = useState(false);
	const [isConfirmFocused, setIsConfirmFocused] = useState(false);

	const handleSubmit = () => {
		//수정하기 요청
	};
	const handleChangeInput = useCallback(
		(e) => {
			setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		},
		[setUser],
	);

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		setUser((prev) => ({
			...prev,
			profileImg: URL.createObjectURL(file),
		}));
	};

	const handleChangeConfirm = useCallback(
		(e) => {
			setConfirmPassword(e.target.value);
		},
		[setConfirmPassword],
	);

	const validatePassword = () => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		return passwordRegex.test(password);
	};

	const validateNickname = () => {
		const nicknameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,16}$/;
		return nicknameRegex.test(nickname);
	};

	const isPasswordValid = useMemo(validatePassword, [validatePassword]);
	const isNicknameValid = useMemo(validateNickname, [validateNickname]);
	const isPasswordSame = useMemo(
		() => password === confirmPassword,
		[password, confirmPassword],
	);

	const isFormValid = useMemo(
		() => isPasswordValid && isPasswordSame && isNicknameValid && mbti,
		[isPasswordValid, isPasswordSame, isNicknameValid, mbti],
	);

	const handleNicknameCheck = () => {
		// Logic for verification code verification
		// You can implement your own verification code verification functionality here
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="overflow-y-auto max-h-90 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								회원정보수정
							</h1>
							<form className="space-y-4 md:space-y-6" action={handleSubmit}>
								<div>
									<label
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										htmlFor="file_input"
									>
										썸네일 업로드
									</label>
									<input
										className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
										id="file_input"
										type="file"
										onChange={handleImageUpload}
									/>

									<div className="mt-4">
										<p className="text-sm text-gray-500">선택된 이미지:</p>
										<img
											className="mt-2 max-w-xs"
											src={profileImg}
											alt="Selected Thumbnail"
										/>
									</div>
								</div>
								<div className="flex flex-col">
									<label
										htmlFor="email"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										이메일
									</label>
									<div className="flex space-x-2">
										<div>{email}</div>
										<div />
									</div>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										비밀번호
									</label>
									<input
										value={password}
										onChange={handleChangeInput}
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onFocus={() => setIsPasswordFocused(true)}
										onBlur={() => setIsPasswordFocused(false)}
									/>
									{!isPasswordValid && isPasswordFocused && (
										<p className="text-red-500 text-xs italic">
											비밀번호는 8~20자 영문, 숫자, 특수문자 조합으로 설정해
											주세요.
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="confirm-password"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										비밀번호 재확인
									</label>
									<input
										value={confirmPassword}
										onChange={handleChangeConfirm}
										type="password"
										name="confirmPassword"
										id="confirm-password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onFocus={() => setIsConfirmFocused(true)}
										onBlur={() => setIsConfirmFocused(false)}
									/>
									{!isPasswordSame && isConfirmFocused && (
										<p className="text-red-500 text-xs italic">
											비밀번호가 일치하지 않습니다.
										</p>
									)}
								</div>

								<div className="flex flex-col">
									<label
										htmlFor="nickname"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										닉네임
									</label>

									<div className="flex flex-row space-x-2 justify-end">
										<input
											value={nickname}
											onChange={handleChangeInput}
											onFocus={() => setIsNicknameFocused(true)}
											onBlur={() => setIsNicknameFocused(false)}
											type="text"
											name="nickname"
											id="nickname"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>

										<button
											type="button"
											onClick={handleNicknameCheck}
											disabled={!isNicknameValid}
											className="self-end bg-[#85B7CC] text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0] w-1/3 text-sm"
										>
											중복 확인
										</button>
									</div>
									{!isNicknameValid && isNicknameFocused && (
										<p className="text-red-500 text-xs italic">
											닉네임은 2~16자 사이로 설정해주세요.
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="mbti"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										MBTI
									</label>
									<Select
										value={mbti}
										onChange={(selectedOption) =>
											setUser((prev) => ({ ...prev, mbti: selectedOption }))
										}
										options={mbtiList}
										placeholder="Select MBTI"
										classNamePrefix="react-select"
									/>
								</div>
								<div className="flex flex-col">
									<button
										type="submit"
										disabled={!isFormValid}
										className="self-end bg-[#85B7CC] text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0]"
									>
										수정하기
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default InfoChange;

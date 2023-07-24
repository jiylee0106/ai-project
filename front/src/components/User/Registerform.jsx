import useRegisterStore from '../../hooks/useRegisterStore';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import useUserStore from '../../store/useUserStore';
import { getApi } from '../../services/api';

const RegisterForm = () => {
	const navigate = useNavigate();

	const {
		email,
		password,
		nickname,
		mbti,
		confirmPassword,
		code,
		errMsg,
		nicknameCheck,

		setEmail,
		setPassword,
		setNickname,
		setMbti,
		setConfirmPassword,
		setCode,
		setNicknameCheck,
	} = useRegisterStore();

	const { register } = useUserStore();

	const [focusedMap, setFocusedMap] = useState({
		email: false,
		password: false,
	});

	const handleFocus = (name, value) => {
		setFocusedMap({ ...focusedMap, [name]: value });
	};

	const handleChangeInput = useCallback((e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'nickname':
				setNickname(value);
				setNicknameCheck(false);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			case 'code':
				setCode(value);
				break;
		}
	}, []);

	const validateEmail = () => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,255}$/;
		return emailRegex.test(email);
	};

	const validatePassword = () => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
		return passwordRegex.test(password);
	};

	const validateNickname = () => {
		const nicknameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,16}$/;
		return nicknameRegex.test(nickname);
	};

	const isEmailValid = useMemo(validateEmail, [email]);
	const isPasswordValid = useMemo(validatePassword, [password]);
	const isNicknameValid = useMemo(validateNickname, [nickname]);
	const isPasswordSame = useMemo(
		() => password === confirmPassword,
		[password, confirmPassword],
	);

	const isFormValid = useMemo(
		() =>
			isEmailValid &&
			isPasswordValid &&
			isPasswordSame &&
			isNicknameValid &&
			nicknameCheck &&
			mbti,
		[
			isEmailValid,
			isPasswordValid,
			isPasswordSame,
			isNicknameValid,
			nicknameCheck,
			mbti,
		],
	);

	const user = { email, password, nickname, mbti };

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user);
		await register(user);
		navigate('/login');
		console.log(errMsg);
	};

	const handleEmailCheck = () => {
		// Logic for email verification
		// You can implement your own email verification functionality here
	};

	const handleCodeCheck = () => {
		// Logic for verification code verification
		// You can implement your own verification code verification functionality here
	};
	const handleNicknameCheck = async () => {
		try {
			console.log(nickname);
			const response = await getApi(`auth/check-nickname?=`, nickname);
			console.log(response.data);
			if (response.data.state == 'usableNickname') {
				alert(response.data.alertMsg);
				setNicknameCheck(true);
			}
			if (response.data.state == 'unusableNickname') {
				alert(response.data.alertMsg);
				setNicknameCheck(false);
			}
		} catch (error) {
			// Handle the error if needed
		}
	};

	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								회원가입
							</h1>
							<form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
								<div className="flex flex-col">
									<label
										htmlFor="email"
										className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
									>
										이메일
									</label>
									<div className="flex space-x-2 justify-end">
										<input
											value={email}
											onChange={handleChangeInput}
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@company.com"
											required=""
											onFocus={() => handleFocus('email', true)}
											onBlur={() => handleFocus('email', false)}
										/>

										<button
											type="button"
											onClick={handleEmailCheck}
											disabled={!email || !isEmailValid}
											className="self-end bg-blue-700 text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0] w-1/3 text-sm"
										>
											이메일인증
										</button>
									</div>
									{!isEmailValid && focusedMap.email && (
										<p className="text-red-500 text-xs italic">
											이메일 형식이 올바르지 않습니다.
										</p>
									)}
								</div>

								<div className="flex flex-row space-x-2 justify-end">
									<input
										value={code}
										type="text"
										name="Code"
										id="verification-code"
										placeholder="인증번호 입력"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onFocus={() => handleFocus('code', true)}
										onBlur={() => handleFocus('code', false)}
									/>

									<button
										type="button"
										onClick={handleCodeCheck}
										disabled={!code}
										className="justify-self-end bg-blue-700 text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0] w-1/3 text-sm"
									>
										확인
									</button>
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
										onFocus={() => handleFocus('password', true)}
										onBlur={() => handleFocus('password', false)}
									/>
									{!isPasswordValid && focusedMap.password && (
										<p className="text-red-500 text-xs italic">
											비밀번호는 8~20자 영문, 숫자, 특수문자 조합으로
											설정해주세요.
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
										onChange={handleChangeInput}
										type="password"
										name="confirmPassword"
										id="confirm-password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onFocus={() => handleFocus('confirmPassword', true)}
										onBlur={() => handleFocus('confirmPassword', false)}
									/>
									{!isPasswordSame && focusedMap.confirmPassword && (
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
											onFocus={() => handleFocus('nickname', true)}
											onBlur={() => handleFocus('nickname', false)}
											type="text"
											name="nickname"
											id="nickname"
											placeholder="강아지"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>

										<button
											type="button"
											onClick={handleNicknameCheck}
											disabled={!isNicknameValid}
											className="self-end bg-blue-700 text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0] w-1/3 text-sm"
										>
											중복 확인
										</button>
									</div>
									{!isNicknameValid && focusedMap.nickname && (
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
										onChange={(selectedOption) => setMbti(selectedOption.value)}
										options={[
											{ value: 'ISTJ', label: 'ISTJ' },
											{ value: 'ISFJ', label: 'ISFJ' },
											{ value: 'INFJ', label: 'INFJ' },
											{ value: 'INTJ', label: 'INTJ' },
											{ value: 'ISTP', label: 'ISTP' },
											{ value: 'ISFP', label: 'ISFP' },
											{ value: 'INFP', label: 'INFP' },
											{ value: 'INTP', label: 'INTP' },
											{ value: 'ESTP', label: 'ESTP' },
											{ value: 'ESFP', label: 'ESFP' },
											{ value: 'ENFP', label: 'ENFP' },
											{ value: 'ENTP', label: 'ENTP' },
											{ value: 'ESTJ', label: 'ESTJ' },
											{ value: 'ESFJ', label: 'ESFJ' },
											{ value: 'ENFJ', label: 'ENFJ' },
											{ value: 'ENTJ', label: 'ENTJ' },
										]}
										placeholder="Select MBTI"
										classNamePrefix="react-select"
									/>
								</div>
								<div className="flex flex-col">
									<button
										type="submit"
										disabled={!isFormValid}
										className="self-end bg-blue-700 text-white font-bold py-2 pt-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-[#BBDCE8] hover:bg-[#3B82A0]"
									>
										가입하기
									</button>
									{errMsg && (
										<p className="text--500 text-xs italic">{errMsg}</p>
									)}

									<p className="mt-3 self-center text-sm font-light text-gray-500 dark:text-gray-400">
										이미 계정이 있습니까?{' '}
										<a
											onClick={() => navigate('/login')}
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
										>
											로그인하기
										</a>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default RegisterForm;

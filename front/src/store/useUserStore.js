import { create } from 'zustand';
import { postApi } from '../services/api';

const useUserStore = create((set) => {
	const initialUserData = {
		id: '',
		email: '',
		nickname: '',
		mbti: '',
		profileImg: '',
		isGoogleLogin: false,
		isLoggedIn: Boolean(localStorage.getItem('accessToken')),
	};

	const savedUserData = JSON.parse(localStorage.getItem('userData'));
	const userData = savedUserData
		? { ...initialUserData, ...savedUserData }
		: initialUserData;

	return {
		...userData,

		setEmail: (email) => set({ email }),
		setNickname: (nickname) => set({ nickname }),
		setMbti: (mbti) => set({ mbti }),
		setProfileImg: (profileImg) => set({ profileImg }),
		setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

		actions: {
			login: async (user) => {
				const response = await postApi('auth/login', user);
				console.log(response.data);
				const jwtToken = response.data.token;
				localStorage.setItem('accessToken', jwtToken);

				const userData = {
					isLoggedIn: true,
					id: response.data.id,
					email: response.data.email,
					nickname: response.data.nickname,
					mbti: response.data.mbti,
				};

				// Save the user data in local storage
				localStorage.setItem('userData', JSON.stringify(userData));

				set(userData);
			},

			register: async (user) => {
				console.log(user);
				await postApi('auth/register', user);
			},

			googleRegister: async (user) => {
				console.log(user);
				await postApi('auth/googleRegister', user);
			},

			googleLogin: async (user) => {
				const response = await postApi('auth/googleLogin', user);
				console.log(response);
				const jwtToken = response.data.token;

				localStorage.setItem('accessToken', jwtToken);

				const userData = {
					isLoggedIn: true,
					id: response.data.id,
					email: response.data.email,
					nickname: response.data.nickname,
					mbti: response.data.mbti,
					isGoogleLogin: true,
				};

				// Save the user data in local storage
				localStorage.setItem('userData', JSON.stringify(userData));

				set(userData);
			},

			logout: () => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('userData');
				set({
					id: '',
					email: '',
					nickname: '',
					mbti: '',
					profileImg: '',
					isLoggedIn: false,
				});
				alert('로그아웃 하였습니다.');
			},
		},
	};
});

export const useUserActions = () => useUserStore((state) => state.actions);
export default useUserStore;

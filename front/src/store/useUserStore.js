import { create } from 'zustand';
import { postApi } from '../services/api';

const useUserStore = create((set) => {
	const initialUserData = {
		id: '',
		email: '',
		nickname: '',
		mbti: '',
		profileImg: '',
		mbtiImg: '',
		tempMbtiImg: '',
		isGoogleLogin: false,
		isLoggedIn: Boolean(localStorage.getItem('accessToken')),
	};

	const savedUserData = JSON.parse(localStorage.getItem('userData'));

	const userData = savedUserData
		? { ...initialUserData, ...savedUserData }
		: initialUserData;

	const saveUserDataToLocalStorage = (newUserData) => {
		localStorage.setItem('userData', JSON.stringify(newUserData));
	};

	const updateUserData = (updatedUserData) => {
		const newUserData = { ...userData, ...updatedUserData };
		saveUserDataToLocalStorage(newUserData);
		set(newUserData);
	};

	return {
		...userData,

		setEmail: (email) => set({ email }),
		setNickname: (nickname) => set({ nickname }),
		setMbti: (mbti) => set({ mbti }),
		setProfileImg: (profileImg) => set({ profileImg }),
		setMbtiImg: (mbtiImg) => set({ mbtiImg }),
		setTempMbtiImg: (tempMbtiImg) => set({ tempMbtiImg }),
		setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

		actions: {
			login: async (user) => {
				const response = await postApi('auth/login', user);
				const jwtToken = response.data.token;
				localStorage.setItem('accessToken', jwtToken);
				const userData = {
					isLoggedIn: true,
					id: response.data.id,
					email: response.data.email,
					nickname: response.data.nickname,
					mbti: response.data.mbti,
					profileImg: response.data.profileImg,
					mbtiImg: response.data.mbtiImg,
				};

				set(userData);
			},

			register: async (user) => {
				await postApi('auth/register', user);
			},

			googleLogin: async (user) => {
				await postApi('auth/googleRegister', user);
				const response = await postApi('auth/googleLogin', user);
				const jwtToken = response.data.token;

				localStorage.setItem('accessToken', jwtToken);

				const userData = {
					isLoggedIn: true,
					id: response.data.id,
					email: response.data.email,
					nickname: response.data.nickname,
					mbti: response.data.mbti,
					profileImg: response.data.profileImg,
					mbtiImg: response.data.mbtiImg,
					isGoogleLogin: true,
				};

				set(userData);
			},

			logout: () => {
				localStorage.removeItem('accessToken');

				set({
					id: '',
					email: '',
					nickname: '',
					mbti: '',
					profileImg: '',
					isGoogleLogin: false,
					isLoggedIn: false,
				});
			},

			infoChange: (updatedUserData) => {
				updateUserData(updatedUserData);
			},
		},
	};
});

export const useUserActions = () => useUserStore((state) => state.actions);
export const useIsLoggedIn = () => useUserStore((state) => state.isLoggedIn);
export const useSetIsLoggedIn = () =>
	useUserStore((state) => state.setIsLoggedIn);

export const useUserId = () => useUserStore((state) => state.id);
export const useUserProfileImg = () =>
	useUserStore((state) =>
		state.profileImg ? state.profileImg : state.mbtiImg,
	);

export default useUserStore;

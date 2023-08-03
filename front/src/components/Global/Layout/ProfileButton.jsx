import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';
import { classNames } from '../../Util/Util';
import { useUserProfileImg } from '../../../store/useUserStore';
import { defaultUser } from '../../Util/Util';
const ProfileButton = () => {
	const navigate = useNavigate();
	const profileImg = useUserProfileImg();
	const [profileImgSrc, setProfileImgSrc] = useState(defaultUser);
	const profileItems = [
		{ title: '마이 페이지', onClick: () => navigate('/mypage') },
		{ title: '회원정보 수정', onClick: () => navigate('/infochange') },
	];

	console.log(profileImg);

	useEffect(() => {
		if (profileImg && Object.keys(profileImg).length !== 0) {
			if (typeof profileImg === 'string') {
				setProfileImgSrc(profileImg);
			} else if (profileImg instanceof File) {
				const imageUrl = URL.createObjectURL(profileImg);
				setProfileImgSrc(imageUrl);

				return () => {
					URL.revokeObjectURL(imageUrl);
				};
			}
		} else {
			setProfileImgSrc(defaultUser);
		}
	}, [profileImg]);

	return (
		<Menu
			as="div"
			className="xs:hidden sm:hidden md:flex relative inline-block text-left"
		>
			<div>
				<Menu.Button>
					<div className="mt-2">
						<img
							className="w-10 rounded-full "
							src={
								profileImg && Object.keys(profileImg).length !== 0
									? typeof profileImg === 'string'
										? profileImg
										: URL.createObjectURL(profileImg)
									: defaultUser
							}
							alt="Profile Image"
						/>

						{/* <UserCircleIcon className="w-10 text-white" aria-hidden="true" /> */}
					</div>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="text-center whitespace-nowrap absolute right-0 z-10 mt-12 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 nav-item cursor-pointer focus:outline-none">
					<div className="py-1">
						{profileItems.map((item, index) => (
							<Menu.Item key={index}>
								{({ active }) => (
									<a
										onClick={item.onClick}
										className={classNames(
											active ? 'bg-gray-100 text-blue-900' : 'text-gray-700',
											'block px-4 py-2',
										)}
									>
										{item.title}
									</a>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default ProfileButton;

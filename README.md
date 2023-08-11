# 담채(DamChae) - 감정을 담아 채우는 공간

- 서비스명: 담채
- 팀명: 5팀

# 기술 스택
## FrontEnd

<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="60" height="60"/> </a>
<img src="https://cdn-icons-png.flaticon.com/512/919/919827.png" width="60" height="60"/>

## BackEnd

<img src="https://cdn.iconscout.com/icon/free/png-256/free-aws-1869025-1583149.png" width="60" height="60"/>
<img src="https://www.bairesdev.com/wp-content/uploads//2021/07/Expressjs.svg" width="100" height="60"/>
<img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/pocoo_flask_logo_icon_168045.png" width="120" height="60"/>

## DataBase

<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="90" height="60"/></a>

# 담채란?
- 감정을 나누고 공유하는 감정일기 플랫폼과 MBTI기반 감정분석 커뮤니티
- 인공지능 모델을 통해 텍스트에서 감정을 추출하고 분류해서 보여준다
- 나의 감정을 살피고, 나와 다른 타인의 감정도 알아보고, 감정의 분류가 가능하졌으니 감정의 통계를 내 볼 수 있다

## 1. 프로젝트 기능 설명

1. 스토리 (감정 일기장)
   - AI가 나의 감정을 분석하고 무드에 맞는 음악을 추천
   - AI가 나의 하루를 그림으로 그려줄 수 있음
   - 내 일기장에서 느낀 감정을 통계로 확인 가능
2. 대나무숲 (MBTI 토론장)
   - AI가 댓글에서 감정을 분석하고, MBTI별로 느낀 다양한 감정을 통계로 확인 가능

## 2. 프로젝트 아키텍처

<img src="/uploads/47b1ee42151ed8113700bde79d766fe4/아키텍처.png" height="60%" width="60%">

## 3. 웹 서비스 페이지 구성 소개

### 1. Main Page
<img src="/uploads/87c0031043f5290f7aa07dea1dc84094/화면_캡처_2023-08-11_233012.jpg">

### 2. Story Page
<img src="/uploads/0de379d28622a931e20da90f38243e44/화면_캡처_2023-08-11_233057.jpg">

### 3. MBTI Page
<img src="/uploads/af9a89958658222aee9ef85f443868bd/화면_캡처_2023-08-11_233123.jpg">

### 4. My Page
<img src="/uploads/f58a8325618471d3805c28c2961aa392/화면_캡처_2023-08-11_233208.jpg">
<img src="/uploads/e311968511161edb97cd5608e72e87b4/화면_캡처_2023-08-11_233228.jpg">

### 5. My Story Page
<img src="/uploads/24baec4e42fe94a982e6b151ceea5ffe/화면_캡처_2023-08-11_233614.jpg">

## 4. 프로젝트 팀원 소개
| 이름 | 담당 |
| ------ | ------ |
| 이승현 | 팀장 백엔드 인공지능 |
| 탁은경 | 백엔드 |
| 노충완 | 백엔드 |
| 이지윤 | 프론트엔드 인공지능 |
| 정소현 | 프론트엔드 |
| 양희태 | 프론트엔드 |

## 5. Folder Tree
📦mbti-agora
 ┣ 📂back
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂ai
 ┃ ┃ ┃ ┣ 📜ai.sh
 ┃ ┃ ┃ ┣ 📜app.py
 ┃ ┃ ┃ ┣ 📜app3.py
 ┃ ┃ ┃ ┣ 📜bertModelClass.py
 ┃ ┃ ┃ ┣ 📜best_model.h5
 ┃ ┃ ┃ ┣ 📜requirements.txt
 ┃ ┃ ┃ ┗ 📜requirements2.txt
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜forestCommentController.js
 ┃ ┃ ┃ ┣ 📜forestController.js
 ┃ ┃ ┃ ┣ 📜forestLikeDislikeController.js
 ┃ ┃ ┃ ┣ 📜imageController.js
 ┃ ┃ ┃ ┣ 📜myPageController.js
 ┃ ┃ ┃ ┣ 📜storyCommentController.js
 ┃ ┃ ┃ ┣ 📜storyPostController.js
 ┃ ┃ ┃ ┗ 📜userController.js
 ┃ ┃ ┣ 📂db
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┣ 📜forestCommentModel.js
 ┃ ┃ ┃ ┃ ┣ 📜forestLikeDisLikeModel.js
 ┃ ┃ ┃ ┃ ┣ 📜forestModel.js
 ┃ ┃ ┃ ┃ ┣ 📜imageModel.js
 ┃ ┃ ┃ ┃ ┣ 📜myPageModel.js
 ┃ ┃ ┃ ┃ ┣ 📜storyCommentModel.js
 ┃ ┃ ┃ ┃ ┣ 📜storyPostModel.js
 ┃ ┃ ┃ ┃ ┗ 📜userModel.js
 ┃ ┃ ┃ ┗ 📂schemas
 ┃ ┃ ┃ ┃ ┣ 📜authString.js
 ┃ ┃ ┃ ┃ ┣ 📜forestComment.js
 ┃ ┃ ┃ ┃ ┣ 📜forestDislike.js
 ┃ ┃ ┃ ┃ ┣ 📜forestLike.js
 ┃ ┃ ┃ ┃ ┣ 📜forestPost.js
 ┃ ┃ ┃ ┃ ┣ 📜image.js
 ┃ ┃ ┃ ┃ ┣ 📜storyComment.js
 ┃ ┃ ┃ ┃ ┣ 📜storyPost.js
 ┃ ┃ ┃ ┃ ┣ 📜storyRandomMusic.js
 ┃ ┃ ┃ ┃ ┣ 📜storyRandomPhrase.js
 ┃ ┃ ┃ ┃ ┗ 📜user.js
 ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┃ ┣ 📜badRequest.js
 ┃ ┃ ┃ ┃ ┗ 📜methodNotAllowed.js
 ┃ ┃ ┃ ┣ 📜errorMiddleware.js
 ┃ ┃ ┃ ┣ 📜loginRequired.js
 ┃ ┃ ┃ ┗ 📜outUserValidation.js
 ┃ ┃ ┣ 📂routers
 ┃ ┃ ┃ ┣ 📜forestCommentRouter.js
 ┃ ┃ ┃ ┣ 📜forestLikeDislikeRouter.js
 ┃ ┃ ┃ ┣ 📜forestPostRouter.js
 ┃ ┃ ┃ ┣ 📜imageRouter.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜myPageRouter.js
 ┃ ┃ ┃ ┣ 📜storyCommentRouter.js
 ┃ ┃ ┃ ┣ 📜storyPostRouter.js
 ┃ ┃ ┃ ┗ 📜userAuthRouter.js
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜forestCommentService.js
 ┃ ┃ ┃ ┣ 📜forestLikeDislikeService.js
 ┃ ┃ ┃ ┣ 📜forestService.js
 ┃ ┃ ┃ ┣ 📜imageService.js
 ┃ ┃ ┃ ┣ 📜myPageService.js
 ┃ ┃ ┃ ┣ 📜storyCommentService.js
 ┃ ┃ ┃ ┣ 📜storyPostService.js
 ┃ ┃ ┃ ┗ 📜userService.js
 ┃ ┃ ┣ 📂utills
 ┃ ┃ ┃ ┣ 📜constant.js
 ┃ ┃ ┃ ┣ 📜emailAuth.js
 ┃ ┃ ┃ ┣ 📜multer.js
 ┃ ┃ ┃ ┣ 📜path.js
 ┃ ┃ ┃ ┗ 📜statusCode.js
 ┃ ┃ ┗ 📜app.js
 ┃ ┣ 📂uploads
 ┃ ┃ ┗ 📜stable-1690950996636.png
 ┃ ┣ 📜.config
 ┃ ┣ 📜.env
 ┃ ┣ 📜.eslintrc.json
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜.prettierrc
 ┃ ┣ 📜index.js
 ┃ ┣ 📜jsconfig.json
 ┃ ┣ 📜package.json
 ┃ ┗ 📜yarn.lock
 ┣ 📂front
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📜banner1.png
 ┃ ┃ ┃ ┣ 📜banner2.png
 ┃ ┃ ┃ ┣ 📜banner3.png
 ┃ ┃ ┃ ┣ 📜banner4.png
 ┃ ┃ ┃ ┣ 📜bannermain.jpg
 ┃ ┃ ┃ ┣ 📜default-image.jpg
 ┃ ┃ ┃ ┣ 📜default-user.png
 ┃ ┃ ┃ ┣ 📜favicon.png
 ┃ ┃ ┃ ┣ 📜forest.gif
 ┃ ┃ ┃ ┣ 📜loginimg.jpg
 ┃ ┃ ┃ ┣ 📜loginlogo.png
 ┃ ┃ ┃ ┣ 📜logo1.png
 ┃ ┃ ┃ ┣ 📜MusicIcon.png
 ┃ ┃ ┃ ┣ 📜MusicIcon2.png
 ┃ ┃ ┃ ┣ 📜story.gif
 ┃ ┃ ┃ ┗ 📜thumbnail.jpg
 ┃ ┃ ┗ 📜vite.svg
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┗ 📜react.svg
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Daenamus
 ┃ ┃ ┃ ┃ ┣ 📜DaenamuCardMap.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DaenamuComment.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DaenamuLikeSection.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DaenamuRead.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DaenamusMain.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DaenamusWrite.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DaenamuTextEditor.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Modal.css
 ┃ ┃ ┃ ┃ ┗ 📜Reaction.jsx
 ┃ ┃ ┃ ┣ 📂Global
 ┃ ┃ ┃ ┃ ┣ 📂Layout
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜GoogleButton.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Layout.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LoadingSpinner.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginButton.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LogoutButton.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MobileHeader.jsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ProfileButton.jsx
 ┃ ┃ ┃ ┃ ┣ 📜BackButton.jsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentBox.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DaenamuCard.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Pagination.jsx
 ┃ ┃ ┃ ┃ ┣ 📜RadioOption.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Search.jsx
 ┃ ┃ ┃ ┃ ┣ 📜StoryCard.jsx
 ┃ ┃ ┃ ┃ ┣ 📜StoryCardMap.jsx
 ┃ ┃ ┃ ┃ ┗ 📜TextViewer.jsx
 ┃ ┃ ┃ ┣ 📂Home
 ┃ ┃ ┃ ┃ ┣ 📜BannerCarousel.jsx
 ┃ ┃ ┃ ┃ ┗ 📜Home.jsx
 ┃ ┃ ┃ ┣ 📂MyPage
 ┃ ┃ ┃ ┃ ┣ 📜MyCalendar.css
 ┃ ┃ ┃ ┃ ┣ 📜MyCalendar.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyComments.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyDaenamuCard.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyDaenamus.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyDaenamusAll.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyLikedDaenamus.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyLikedDaenamusAll.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyMainMood.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyMoodStat.jsx
 ┃ ┃ ┃ ┃ ┗ 📜MyPage.jsx
 ┃ ┃ ┃ ┣ 📂Stories
 ┃ ┃ ┃ ┃ ┣ 📜ModalPortal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MusicVideo.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyStories.jsx
 ┃ ┃ ┃ ┃ ┣ 📜SearchResultBox.jsx
 ┃ ┃ ┃ ┃ ┣ 📜SearchResults.jsx
 ┃ ┃ ┃ ┃ ┣ 📜StoryComment.jsx
 ┃ ┃ ┃ ┃ ┣ 📜StoryCreateModal.css
 ┃ ┃ ┃ ┃ ┣ 📜StoryCreateModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜StoryEditor.jsx
 ┃ ┃ ┃ ┃ ┗ 📜StoryRead.jsx
 ┃ ┃ ┃ ┣ 📂User
 ┃ ┃ ┃ ┃ ┣ 📜InfoChange.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Loginform.jsx
 ┃ ┃ ┃ ┃ ┣ 📜ProfileImgUploadModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜ProfilePicker.jsx
 ┃ ┃ ┃ ┃ ┗ 📜Registerform.jsx
 ┃ ┃ ┃ ┗ 📂Util
 ┃ ┃ ┃ ┃ ┗ 📜Util.jsx
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📜useImageUpload.jsx
 ┃ ┃ ┃ ┣ 📜usePagination.jsx
 ┃ ┃ ┃ ┗ 📜useRegisterStore.js
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┗ 📜Router.jsx
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┗ 📜api.js
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┃ ┣ 📜useForestStore.js
 ┃ ┃ ┃ ┣ 📜useStoryStore.js
 ┃ ┃ ┃ ┗ 📜useUserStore.js
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┗ 📜axios.js
 ┃ ┃ ┣ 📜App.jsx
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜main.jsx
 ┃ ┣ 📜.env
 ┃ ┣ 📜.eslintrc.cjs
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜index.html
 ┃ ┣ 📜package.json
 ┃ ┣ 📜postcss.config.js
 ┃ ┣ 📜tailwind.config.js
 ┃ ┣ 📜vite.config.js
 ┃ ┣ 📜vite.config.js.timestamp-1689928538241-13348d1e57969.mjs
 ┃ ┣ 📜vite.config.js.timestamp-1690910568181-9fb2a409a378b.mjs
 ┃ ┣ 📜vite.config.js.timestamp-1691136412797-906a9228c45c1.mjs
 ┃ ┗ 📜yarn.lock
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜yarn.lock


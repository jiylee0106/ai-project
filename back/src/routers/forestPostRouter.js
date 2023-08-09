import express from 'express';
import ForestController from '../controllers/forestController.js';
import { loginRequired } from '../middlewares/loginRequired.js';
const router = express.Router();

// 글 등록
router.post('/', loginRequired, ForestController.createPost);

// 글 감정분석
router.post('/senti-predict', loginRequired, ForestController.getPredict);

// router.get('/popularity', ForestController.getForestsByPopularity);

// 글 수정
router.put('/:id', loginRequired, ForestController.updatePost);

// 글 삭제
router.delete('/:id', loginRequired, ForestController.deletePost);

// 게시글 조회
router.get('/', ForestController.findByForest);

// 사용자의 게시물 조회
router.get('/my', loginRequired, ForestController.getUserPosts);

router.get('/mbti', ForestController.getPostsByAuthorMBTI);

// router.get('/mbti', ForestController.getPostsByAuthorMBTI);

router.get('/:forestId', ForestController.readForestDetail);

// 사용자의 MBTI에 해당하는 게시글 조회
// router.get('/mbti', loginRequired, ForestController.readForestByMbti);

export default router;

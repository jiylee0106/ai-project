import ForestPost from '../db/schemas/forestPost.js';
import { statusCode } from '../utills/statusCode.js';

class forestController {
	// ...

	// 9. 모든 포레스트 글 조회
	static async getAllPosts(req, res, next) {
		try {
			const posts = await ForestPost.find().populate('postId', 'imageUrl');

			statusCode.setResponseCode200(res);
			res.send(posts);
		} catch (error) {
			next(error);
		}
	}

	// 10. 특정 포레스트 글 조회
	static async getPostById(req, res, next) {
		try {
			const postId = req.params.id;
			const post = await ForestPost.findById(postId).populate(
				'postId',
				'imageUrl',
			);

			if (!post) {
				throw new NotFoundError('존재하지 않는 글입니다.');
			}

			statusCode.setResponseCode200(res);
			res.send(post);
		} catch (error) {
			next(error);
		}
	}

	// 11. 포레스트 글 등록
	static async createPost(req, res, next) {
		try {
			const { title, content } = req.body;

			if (!title || !content) {
				throw new BadRequestError('Title과 content는 필수 입력 사항입니다.');
			}

			const post = new ForestPost({ title, content });
			await post.save();

			statusCode.setResponseCode201(res);
			res.send({ message: '글을 등록했습니다.' });
		} catch (error) {
			next(error);
		}
	}

	// 12. 포레스트 글 수정
	static async updatePost(req, res, next) {
		try {
			const postId = req.params.id;
			const { title, content } = req.body;

			if (!title || !content) {
				throw new BadRequestError('Title과 content는 필수 입력 사항입니다.');
			}

			const post = await ForestPost.findById(postId);
			if (!post) {
				throw new NotFoundError('존재하지 않는 글입니다.');
			}

			post.title = title;
			post.content = content;
			await post.save();

			statusCode.setResponseCode200(res);
			res.send({ message: '글을 수정했습니다.' });
		} catch (error) {
			next(error);
		}
	}

	// 13. 포레스트 글 삭제
	static async deletePost(req, res, next) {
		try {
			const postId = req.params.id;

			const post = await ForestPost.findById(postId);
			if (!post) {
				throw new NotFoundError('존재하지 않는 글입니다.');
			}

			await post.deleteOne();

			statusCode.setResponseCode200(res);
			res.send({ message: '글을 삭제했습니다.' });
		} catch (error) {
			next(error);
		}
	}

	// ...
}

export { forestController };

// import { forestService } from '../services/forestService.js';

// // 글 관련 컨트롤러
// const forestController = {
// 	getAllPosts: async (req, res) => {
// 		try {
// 			const posts = await forestService.getAllPosts();
// 			res.send(posts);
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).send({ message: '글 조회에 실패했습니다.' });
// 		}
// 	},

// 	getPostById: async (req, res) => {
// 		const postId = req.params.id;
// 		try {
// 			const post = await forestService.getPostById(postId);
// 			res.send(post);
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).send({ message: '글 조회에 실패했습니다.' });
// 		}
// 	},

// 	createPost: async (req, res) => {
// 		const { title, content } = req.body;
// 		try {
// 			const result = await forestService.createPost(title, content);
// 			res.send(result);
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).send({ message: '글 등록에 실패했습니다.' });
// 		}
// 	},

// 	updatePost: async (req, res) => {
// 		const postId = req.params.id;
// 		const { title, content } = req.body;
// 		try {
// 			const result = await forestService.updatePost(postId, title, content);
// 			res.send(result);
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).send({ message: '글 수정에 실패했습니다.' });
// 		}
// 	},

// 	deletePost: async (req, res) => {
// 		const postId = req.params.id;
// 		try {
// 			const result = await forestService.deletePost(postId);
// 			res.send(result);
// 		} catch (error) {
// 			console.error(error);
// 			res.status(500).send({ message: '글 삭제에 실패했습니다.' });
// 		}
// 	},
// };

// export { forestController };

// // forestService.js

// import { forestCommentModel } from '../db/models/forestCommentModel.js';
import { forestModel } from '../db/models/forestModel.js';
// import User from '../db/models/userModel.js';
// import UserModel from '../db/schemas/user.js';
class ForestService {
  static async createPost({ userId, title, content, mood }) {
    if (!title || !content) {
      const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
      throw new Error(errorMessage);
    }

    const newForestPost = {
      userId,
      title,
      content,
      mood,
    };

    const createdForestPost = await forestModel.create({ newForestPost });
    return createdForestPost;
  }

  static async findByForest(limit, page, getAlls) {
    const skip = (page - 1) * limit;
    // console.log(getAlls, getAlls.content);

    const { forests, count } = await forestModel.findByForest(
      skip,
      limit,
      getAlls,
    );
    const totalPage = Math.ceil(count / limit);

    return { forests, totalPage, count };
  }

  static async updatePost(updatePost) {
    try {
      if (!updatePost.title || !updatePost.content) {
        const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
        throw new Error(errorMessage);
      }

      const forestId = updatePost._id;
      console.log(typeof forestId);
      const post = await forestModel.findById({ _id: new Object(forestId) });
      if (!post) {
        throw new Error('존재하지 않는 글입니다.');
      }

      if (post.userId.toString() !== updatePost.userId) {
        throw new Error('해당 글을 수정할 권한이 없습니다.');
      }
      const updateForestPost = await forestModel.updatePost({ updatePost });

      return updateForestPost;
    } catch (error) {
      console.log(error);
      throw new Error('포스트 업데이트에 실패했습니다.');
    }
  }

  static async deletePost(deletePost) {
    try {
      const forestId = deletePost._id;
      console.log(typeof forestId);
      const post = await forestModel.findById({ _id: new Object(forestId) });
      if (!post) {
        throw new Error('존재하지 않은 글입니다.');
      }

      if (post.userId.toString() !== deletePost.userId) {
        throw new Error('해당 글을 수정할 권한이 없습니다.');
      }

      const deleteForestPost = await forestModel.deletePost({ deletePost });

      return deleteForestPost;
    } catch (error) {
      console.log(error);
      throw new Error('포스트 삭제에 실패했습니다.');
    }
  }
  static async readStoryDetail({ forestId }) {
    const forest = await forestModel.findById({ forestId });
    // const comment = await forestCommentModel.findAllByForestId({ forestId });
    if (!forest) {
      throw new Error('해당 게시물이 존재하지 않습니다.');
    }
    const forestInfo = {
      ...forest._doc,
      // commentList: comment,
    };
    return forest;
  }

  static async readPosts(limit, page) {
    const skip = (page - 1) * limit; // 해당 페이지에서 스킵할 스토리 수

    const { forests, count } = await forestModel.findAndCountAll(skip, limit);
    const totalPage = Math.ceil(count / limit);
    return { forests, totalPage, count }; // 해당 페이지에 해당하는 스토리들, 총 페이지 수, 스토리 총 수
  }

  static async populateForestPost(info, path) {
    const field = { path: path };
    const forest = forestModel.populateForestPost(info, field);
    return forest;
  }

  // static async ForestMbti({ mbti }) {
  //   try {
  //     const usersWithMbti = await User.findByMbti({ mbti });
  //     return usersWithMbti;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('MBTI로 사용자 검색에 실패했습니다.');
  //   }
  // }

  static async readForests({ userId }) {
    const forests = await forestModel.findForestsById({ userId });
    if (!forests) {
      const errorState = 'error';
      const errorMessage = '게시글 작성내역이 존재하지 않습니다.';
      return { errorState, errorMessage };
    }
    return forests;
  }
}
export default ForestService;

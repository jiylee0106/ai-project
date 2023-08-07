import { forestModel } from '../db/models/forestModel.js';
import ForestPost from '../db/schemas/forestPost.js';

class ForestService {
  static async createPost({ userInfo, title, content, mood }) {
    if (!title || !content) {
      const errorMessage = '제목과 내용은 필수 입력 사항입니다.';
      throw new Error(errorMessage);
    }

    const newForestPost = {
      userInfo,
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

  static async updatePost({ forestId, title, content }) {
    const updatedPost = await ForestPost.findOneAndUpdate(
      { _id: forestId }, // 업데이트할 문서를 찾는 조건으로 _id 필드 사용
      { $set: { title: title, content: content } }, // 업데이트할 필드와 값
      { new: true }, // 업데이트 후 업데이트된 문서 반환
    );
    if (!updatedPost) {
      throw new Error('수정할 게시글 정보가 없습니다.');
    }
    return updatedPost;
  }

  // static async updatePost({ forestId, title, content }) {
  //   try {
  //     console.log('Updating post with forestId:', forestId);

  //     const updatedPost = await forestModel.findOneAndUpdate(
  //       { _id: forestId }, // 업데이트할 문서를 찾는 조건으로 _id 필드 사용
  //       { title, content }, // 업데이트할 필드와 값을 명시
  //       { new: true }, // 옵션: 업데이트 후에 업데이트된 문서를 반환하도록 설정
  //     );

  //     console.log('Updated post:', updatedPost);

  //     if (!updatedPost) {
  //       throw new Error('수정할 게시글 정보가 없습니다.');
  //     }

  //     return updatedPost;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async deletePost({ forestId }) {
    const deletedPost = await forestModel.findOneAndDelete({ forestId });
    if (!deletedPost) {
      throw new Error('삭제할 게시글 정보가 없습니다.');
    }
    return deletedPost;
  }

  static async isSameUser(loginUserId, forestId) {
    const forests = await forestModel.readOneById({ forestId });
    const forestUserId = forests.userInfo;
    if (loginUserId == forestUserId) {
      return true;
    } else {
      return false;
    }
  }

  static async readOneById({ forestId }) {
    try {
      const forest = await forestModel.readOneById({ forestId });

      if (!forest) {
        throw new Error('존재하지 않는 글입니다.');
      }
      return forest;
    } catch (error) {
      throw new Error('글 조회에 실패했습니다.');
    }
  }

  static async readForestDetail({ forestId }) {
    const forest = await forestModel.findAndIncreaseView({ forestId });
    // const comment = await forestCommentModel.findAllByForestId({ forestId });
    if (!forest) {
      throw new Error('해당 게시물이 존재하지 않습니다.');
    }
    console.log(forest.userInfo);
    const forestInfo = {
      ...forest,

      // commentList: allcomment,
    };
    return forestInfo;
  }

  static async readPosts(limit, page) {
    const skip = (page - 1) * limit; // 해당 페이지에서 스킵할 스토리 수

    const { forest, count } = await forestModel.findAndCountAll(skip, limit);
    const totalPage = Math.ceil(count / limit);
    return { forest, totalPage, count }; // 해당 페이지에 해당하는 스토리들, 총 페이지 수, 스토리 총 수
  }

  static async populateForestPost(info, path) {
    const field = { path: path };
    const forest = forestModel.populateForestPost(info, field);
    return forest;
  }

  static async findById(forestId) {
    try {
      return await forestModel.readOneById(forestId);
    } catch (error) {
      throw new Error('An error occurred while fetching the forest.');
    }
  }

  static async findByForestMbti({ mbtiList, limit, page }) {
    try {
      const skip = (page - 1) * limit;
      const posts = await forestModel.findByForestMbti({
        mbtiList,
        limit,
        skip,
      }); // 이 부분 수정

      // 나머지 로직 유지
      return posts;
    } catch (error) {
      throw new Error(
        `Error finding blog posts by author's MBTI: ${error.message}`,
      );
    }
  }
}

export default ForestService;

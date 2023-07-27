import User from '../db/models/userModel.js';
import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class userService {
  static async createUser({ email, password, mbti, nickname, isGoogleLogin }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
      return { errorMessage };
    }

    // 이메일 인증

    let hashedPassword;
    // 비밀번호 해쉬화 (비밀번호가 제공된 경우에만 수행)
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = {
      email,
      password: isGoogleLogin ? password : hashedPassword,
      mbti,
      nickname,
      isGoogleLogin: isGoogleLogin || false, // isGoogleLogin 값을 포함하거나 기본값으로 false 설정
    };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async readUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    let isPasswordCorrect = false;

    // 구글 로그인인 경우 비밀번호 확인을 생략합니다.
    if (user.isGoogleLogin) {
      isPasswordCorrect = true;
    } else {
      // 비밀번호 일치 여부 확인
      const correctPasswordHash = user.password;
      isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
    }
    
    if (!isPasswordCorrect) {
      const errorMessage =
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
    const token = jwt.sign({ userId: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const { id, mbti, nickname, isOut } = user;

    const loginUser = {
      token,
      id,
      email,
      mbti,
      nickname,
      isOut,
      errorMessage: null,
    };

    return loginUser;
  }

  static async readUsers() {
    const users = await User.findAll();
    return users;
  }

  static async updateUser({ userId, toUpdate }) {
    let user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (toUpdate.nickname) {
      const fieldToUpdate = 'nickname';
      const newValue = toUpdate.nickname;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = 'password';
      const newValue = await bcrypt.hash(toUpdate.password, 10);
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.mbti) {
      const fieldToUpdate = 'mbti';
      const newValue = toUpdate.mbti;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    return user;
  }

  static async readUserInfo({ userId }) {
    const user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return user;
  }

  static async readUserNickname({ nickname }) {
    const user = await User.findByNickname({ nickname });

    if (!user) {
      const nicknameState = 'usableNickname';
      const usableNickname = '사용 가능한 닉네임 입니다.';
      return { nicknameState, usableNickname };
    }
    const nicknameState = 'unusableNickname';
    const unusableNickname = '이미 사용 중인 닉네임 입니다.';
    return { nicknameState, unusableNickname };
  }

  // 회원탈퇴 : 회원 정보는 그대로 남아있음
  static async deleteUser({ userId }) {
    const user = await User.delete({ userId });
    return user;
  }

  static async isDeletedUser({ email }) {
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorState = 'error';
      const errorMessage = '가입 내역이 없는 이메일 입니다.';
      return { errorState, errorMessage };
    }
    const isOut = user.isOut;
    return isOut;
  }
}

export { userService };

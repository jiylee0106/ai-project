import { StoryPost } from '../db/schemas/storyPost.js';
import { StoryPostModel } from '../db/models/storyPostModel.js';
import { StoryPostService } from '../services/storyPostService.js';
import { imageService } from '../services/imageService.js';
import axios from 'axios';
import fs from 'fs';

const storyPostController = {
  createStoryPost: async (req, res, next) => {
    try {
      const { title, content, isPublic, mood, music } = req.body;
      const file = req.file;
      const thumbnailInfo = await imageService.uploadImage({ file });
      const userId = req.currentUserId;
      const userInfo = userId;
      const thumbnail = thumbnailInfo._id;
      const storyPostInfo = await StoryPostService.addStoryPost({
        userInfo,
        title,
        content,
        thumbnail,
        isPublic,
        mood,
        music,
      });
      const result = await StoryPost.populate(storyPostInfo, {
        path: 'userInfo thumbnail',
      });
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  getPredict: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { content } = req.body;
      const pureContent = content.replace(/<[^>]+>/g, ' ');
      const obj = await axios.post('http://127.0.0.1:5000/predict', {
        text: pureContent,
      });
      // obj.data = { mood: '슬픔' }
      const Mood = obj.data.mood;

      // 비동기 함수
      const handlePhraseData = async (documents) => {
        let data = documents.filter((x) => x.mood === Mood);
        let Phrases = data.map((item) => item.phrase);
        let randomIndex = Math.floor(Math.random() * Phrases.length);
        let Phrase = Phrases[randomIndex];
        return Phrase;
      };

      const handleMusicData = async (documents) => {
        let data = documents.filter((x) => x.mood === Mood);
        let Musics = data.map((item) => item.music);
        let randomIndex = Math.floor(Math.random() * Musics.length);
        let Music = Musics[randomIndex];
        return Music;
      };

      const phrasePromise =
        StoryPostModel.getPhraseData().then(handlePhraseData);
      const musicPromise = StoryPostModel.getMusicData().then(handleMusicData);

      // phrasePromise와 musicPromise를 한번에 처리
      Promise.all([phrasePromise, musicPromise])
        .then(([Phrase, Music]) => {
          const formattedMusic = Music.slice(32);
          const result = { mood: Mood, phrase: Phrase, music: formattedMusic };
          return res.status(200).json(result);
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      next(error);
    }
  },

  createThumbnail: async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { content } = req.body;
      const pureContent = content.replace(/<[^>]+>/g, ' ');
      const result = await axios.post('http://127.0.0.1:5001/text-to-image', {
        prompt: pureContent,
      });
      console.log(result.data.image_base64);
      const image_data = Buffer.from(result.data.image_base64, 'base64');
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileName = `image-${uniqueSuffix}.png`;
      const filePath = `uploads/${fileName}`;
      fs.writeFileSync(filePath, image_data);
      return res.status(200).json({ file_name: fileName, file_path: filePath });
    } catch (error) {
      next(error);
    }
  },
};

export { storyPostController };

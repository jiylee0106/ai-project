import { StoryPost } from '../db/schemas/storyPost.js';
import { Image } from '../db/schemas/image.js';
import { StoryPostService } from '../services/storyPostService.js';
import { StoryPostModel } from '../db/models/storyPostModel.js';
import axios from 'axios';

const storyPostController = {
  createStoryPost: async (req, res, next) => {
    try {
      const { title, content, thumbnail, isPublic, mood, music } = req.body;
      const userId = req.currentUserId;
      const userInfo = userId;
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
};

export { storyPostController };

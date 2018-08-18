import $ from 'jquery';
import { removeWhiteSpace, fieldsToUri } from "../Util";

const YOUTUBE_API_KEY = 'AIzaSyByE3bbcK2PP5InoarBTTnvJp2VLlQkGa8';

async function Category() {
  const url = `https://www.googleapis.com/youtube/v3/videoCategories?
        part=snippet&
        regionCode=KR&
        key=${YOUTUBE_API_KEY}`;
  let result = null;

  await $.getJSON(removeWhiteSpace(url), data => {
    result = data.items.reduce((map, item) => {
      map[item.id] = item.snippet.title;
      return map;
    }, {});
  });

  return result;
}

async function VideoItemById({ videoId }) {
  const parts = ['snippet', 'statistics', 'player', 'contentDetails'];
  const fields = {
    items: {
      snippet: ['title', 'channelTitle', 'channelId', 'description', 'tags'],
      statistics: ['viewCount', 'likeCount', 'dislikeCount'],
      player: ['*'],
      contentDetails: ['duration']
    }
  };
  const url = `https://www.googleapis.com/youtube/v3/videos?
    part=${parts.join(',')}&
    fields=${fieldsToUri(fields)}&
    key=${YOUTUBE_API_KEY}&
    id=${videoId}`;

  let result = null;

  await $.getJSON(removeWhiteSpace(url), data => {
    result = data;
  });

  return result;
}


async function VideoListBySearchText({ searchText, categoryId, maxResults, pageToken }) {
  const parts = ['id', 'snippet'];
  const fields = {
    items: {
      id: ['videoId'],
      snippet: ['title', 'description', 'channelId', 'thumbnails']
    },
    pageInfo: ['totalResults'],
    nextPageToken: ['*']
  };
  const url = `https://www.googleapis.com/youtube/v3/search?
    part=${parts.join(',')}&
    fields=${fieldsToUri(fields)}&
    key=${YOUTUBE_API_KEY}&
    q=${encodeURIComponent(searchText)}&
    ${categoryId ? `videoCategoryId=${categoryId}&` : ''}
    maxResults=${maxResults}&
    ${pageToken ? 'pageToken=' + pageToken + '&' : ''}
    type=video`;
  let result = null;

  await $.getJSON(removeWhiteSpace(url), data => {
    result = data;
  });

  return result;
}

async function VideoListByActivities({ channelId, maxResults }) {
  const parts = ['snippet'];
  const fields = {
    items: {
      id: ['videoId'],
      snippet: ['title', 'description', 'channelId', 'thumbnails']
    },
  };
  const url = `https://www.googleapis.com/youtube/v3/search?
    part=${parts.join(',')}&
    fields=${fieldsToUri(fields)}&
    key=${YOUTUBE_API_KEY}&
    channelId=${channelId}&
    maxResults=${maxResults}&
    type=video`;
  let result = null;

  await $.getJSON(removeWhiteSpace(url), data => {
    result = data;
  });

  return result;
}

const promiseFunctionMap = {
  category: Category,
  videoItemById: VideoItemById,
  videoListBySearchText: VideoListBySearchText,
  videoListByActivities: VideoListByActivities
};

export default {
  getPromise: (part, params) => (new Promise((resolve, reject) => {
    let data = promiseFunctionMap[part](params);
    resolve(data);
  }))
}
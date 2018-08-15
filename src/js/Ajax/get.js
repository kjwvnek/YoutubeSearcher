import $ from 'jquery';
import async from 'async';

const YOUTUBE_API_KEY = 'AIzaSyByE3bbcK2PP5InoarBTTnvJp2VLlQkGa8';

export const VideoItemById = ({ videoId }, callback) => {
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

  VideoItemById.memoize(url, callback)
};

VideoItemById.memoize = async.memoize((url, callback) => {
  $.getJSON(removeWhiteSpace(url), callback);
});

export const VideoListBySearchText = ({ searchText, maxResults, pageToken }, callback, err) => {
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
    maxResults=${maxResults}&
    ${pageToken ? 'pageToken=' + pageToken + '&' : ''}
    type=video`;

  $.getJSON(removeWhiteSpace(url), callback, err);
};

export const VideoListByActivities = ({ channelId, maxResults }, callback, err) => {
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

  $.getJSON(removeWhiteSpace(url), callback, err);
};

function removeWhiteSpace(str) {
  return str.replace(/\s/g, '');
}

function fieldsToUri(fields) {
  let strBuffer = [];

  for (let field in fields) {
    if (fields.hasOwnProperty(field)) {
      let nextFields = fields[field];

      if (Array.isArray(nextFields)) {
        strBuffer.push(`${field}(${nextFields.join(',')})`)
      } else if (typeof nextFields === 'object') {
        strBuffer.push(`${field}(${fieldsToUri(nextFields)})`);
      }
    }
  }

  return strBuffer.join(',');
}

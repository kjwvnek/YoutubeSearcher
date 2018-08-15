# YoutubeSearcher
원하는 카테고리에 맞는 유튜브를 검색하는 앱.

## Goal
Framework(ex. React, Vue, Angular)의 사용없이 Vanilla JS로 SPA(Single Page Application) 만들기
### Functional Aspect
- Login 화면: Google 로그인
- Home 화면: 좋아요한 영상 노출 / 좋아요한 채널의 Youtube 영상 노출 (Infinity Grid 형식)
- Search Result 화면: 검색결과가 노출 (Infinity Grid 형식)
- Selected Video 화면: 선택된 영상 및 관련영상들이 노출 (새로고침이나 다른페이지에 갔다와도 현 재생시점이 유지됨) 

### Learning Aspect
- Component 라이브러리를 구현해서 Component 단위로 화면을 렌더링
- Router 라이브러리를 구현해서 Client-Side-Routing 활용
- 다양한 인터렉션 구현

## Youtube API
[Youtube Data API V3](https://developers.google.com/youtube/v3/getting-started?hl=ko) 사용

## Project
[Test Page](https://kjwvnek.github.io/YoutubeSearcher/)

### Setting
~~~
git clone https://github.com/kjwvnek/FakeTube.git

cd FakeTube

npm install
~~~

### Start
~~~
npm start
~~~
# Melon-Chart-Crawling-bot
멜론 차트 크롤링 해서 가져와주는 봇

command 폴더 안에 melon.js 가 명령어 

if (arg1 == "새로고침") <-- 이부분과
if (arg1 == "로드"||arg1 == null) <-- 이부분은 지워도 잘 돌아갑니다.

prefix = $

ex) $멜론 순위 20 (멜론 차트 20위 까지 보냄) (35위까지 가능)
ex) $멜론 순위 (이렇게 치면 20위까지 표현 됨)


npms :
npm install cheerio
npm install request
npm install discord.js
npm install path

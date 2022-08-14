# [웹] 5-6주차 미션 키오스크
![image](https://user-images.githubusercontent.com/49009864/184526605-e61e27d5-38a7-4fa5-bb26-3be29790fcdf.png) <br/>
무인 주문시스템인 키오스크를 웹으로 구현한 프로젝트입니다. <br/>
2022/08/01 ~ 2022/08/12 약 2주간 진행하였습니다. <br/>

웹 클라이언트는 typescript, reactjs, sass를 기반으로 <br/>
웹 애플리케이션 서버는 typescript, nestjs, typeorm을 사용하여 구현하였습니다. <br/>
<br/>
ERD 및 제작하면서 고민했던 것들, 고려했던 것들, 도전했던 것들은 위키에서 확인하실 수 있습니다.

## Wiki
[Wiki](https://github.com/woowa-techcamp-2022/web-kiosk-leehyeongjun/wiki)


## 데모페이지 및 소개 영상
http://13.125.209.46:3000/ (데모페이지) <br/>
https://youtu.be/rN7p6NM-sV8 (소개 영상)

## 개발모드에서 애플리케이션 실행하기
프로젝트는 client, server 두개의 프로젝트로 나눠져있고, 루트 디렉토리에서 각 프로젝트를 워크스페이스 형태로 관리합니다. <br/>
먼저 루트 디렉토리에서 모듈을 설치합니다.
```shell
npm install
```
<br/>
이후 server 및 client에서 사용할 환경변수 파일을 생성합니다. <br/>
<br/>
client/.env

```
REACT_APP_BASE_URL={{API_SERVER_URL}}
```

server/.env
```
DB_HOST={{DB_URL}}
DB_PORT={{DB_PORT}}
USERNAME={{DB_USERNAME}}
PASSWORD={{DB_PASSWORD}}
DATABASE={{DB_NAME}}
```

루트 디렉토리에서 서버 및 클라이언트를 실행하는 커맨드는 아래와 같습니다.
```
npm run server:start
npm run client:start
```

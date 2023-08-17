# 온라인 화상 커뮤니티 Unofficial

<img src="./assets/images/simple_logo.png" width="400">

# Overview

상대의 모습이 보이지 않아 정확하게 심리를 파악하기 어려운 기존의 온라인 카드게임은 이제 그만!

온라인으로 실제와 같은 카드게임을 시작하세요!

# Betting Royal 서비스 화면

### 로그인

<img src="./docs/login.webp" width="600">

### 게임

<img src="./docs/game.webp" width="600">

### 게임에서 이겼을 때

<img src="./docs/win.webp" width="600">

### 게시판

<img src="./docs/board.webp" width="600">

### 금고

<img src="./docs/vault.webp" width="600">

### 친구

<img src="./docs/friend.webp" width="600">

# 주요 기능

### 서비스 소개

최후의 1인을 가리는 일러미네이션 매치, 배틀로얄  
 X  
결과가 불확실한 일에 돈을 거는 행위, 베팅  
→ 상대의 심리를 파악하고 베팅하여 최후의 1인을 가리는 카드게임

### 프로젝트 기능

- 화상 카드게임 서비스
  - WebRTC와 카드게임을 결합하여 상대방의 얼굴을 직접 보며 게임을 즐길 수 있다.
  - 추가로 게임 서비스에 필요한 금고, 랭킹, 친구 추가, 뱃지 기능 등을 구현하였다.
- 감성 인식 API
  - Face API를 통해 평온, 기쁨, 슬픔, 화남, 놀람, 공포, 역함 중 상위 3개의 감정을 수치가 높은 순서로 보여주며 플레이어들은 서로의 상태를 보며 베팅 할 수 있다.
- 공통 질문
  - 게임 시작 시 플레이어들에게 공통 질문을 주고 서로 답할 수 있게 한다.
  - 자유롭게 대화를 나누며 서로의 심리를 추측해 플레이에 도움을 받을 수 있다.

### 개발환경

- OS
  - Local : Windows 10
  - AWS : Ubuntu 20.04.4 LTS
- IDE
  - IntelliJ IDE 2022.1.3
  - Visual Studio Code 1.70.0
- UI / UX
  - Figma
- DataBase
  - MySQL workbench 8.0.20 (Windows 10)
  - MySQL 8.0.30 (Ubuntu 20.04.2 LTS)
- CI/CD
  - Docker 20.10.17
  - nginx

### 상세 스택

- Backend
  - JAVA - openjdk 1.8.0_342
  - Gradle 6.7
  - SpringBoot 2.4.5, Quarydsl 4.4.0, Lombok 1.18.20, Swagger2 3.0.0
  - Stomp 2.3.3-1
- FrontEnd
  - HTML5, CSS3, JavaScript(ES6)
  - React 18.2.0, face-api.js 0.22.2, Material-UI
  - Node.js 16.16.0, npm 8.15.0
  - stompjs 2.3.3
- Web RTC
  - openvidu-browser 2.22.0

### 협업 툴

- 이슈 관리 : Jira
- 형상 관리 : Gitlab, Git
- 커뮤니케이션 : Notion, MatterMost, Webex

### 서비스 아키텍처

<img src="https://user-images.githubusercontent.com/56749776/185519575-74973bc4-0ed0-4361-b499-7f8278b474b9.png" width="600" height="400">

### 요구 사항 정의서

<img src="https://user-images.githubusercontent.com/56749776/185520424-0ac7f9c4-65e4-49c7-ac72-ef32cee04860.png" width="600" height="500">
<img src="https://user-images.githubusercontent.com/56749776/185520471-e986a165-c45e-47ca-b1ad-6087d0eafb33.png" width="600" height="500">

### 마일스톤

<img src="https://user-images.githubusercontent.com/56749776/185520326-3b83b272-9c20-4f2e-824a-997040bc662d.png" width="600" height="650">

### 화면 설계서

<img src="https://user-images.githubusercontent.com/56749776/185520252-dbc7307b-268a-4edc-a337-c0b588279785.png" width="600" height="500">

### Git 컨벤션

- Feat : 새로운 기능 추가 (넓은 개념)
- Fix : 버그 수정
- Design : css 등 UI 디자인 변경
- Add : 코드, 테스트, 예제, 문서 등 추가 생성 (좁은 개념)
- Delete : 코드 삭제
- Rename : 이름 변경, 위치 옮기는 작업
- Refactor : 코드 전면 수정
- Test : 테스트 코드 추가, 테스트 코드 리팩토링

### 커밋타입

- 명령어로 작성한다.
- 백앤드 [BE]와 프론트앤드 [FE] 구분

```
[Category] Type : subject

ex) 회원가입 기능

- 프론트 - [FE] Feat : Join in
- 백 - [BE] Feat : Join in
```

### Jira

<img src="https://user-images.githubusercontent.com/56749776/185520546-5946981f-e6ee-4df7-b546-3e29fb14869e.png" width="500" height="400">
<img src="https://user-images.githubusercontent.com/56749776/185520581-68f7ae70-4923-41b2-97c0-d0fcf143c609.png" width="500" height="400">

### ERD

<img src="https://user-images.githubusercontent.com/56749776/185520712-9886453e-f13a-47d7-b891-5df452c2770b.png" width="600" height="500">

### EC2 포트 정리

| 8443 | openvidu server      |
| ---- | -------------------- |
| 8081 | openvidu server      |
| 80   | nginx HTTP 기본 포트 |
| 443  | nginx HTTPS          |
| 8888 | kurento media server |
| 3478 | docker proxy         |
| 3306 | mysql                |
| 3001 | react app            |
| 8080 | Spring boot          |

### 팀원 역할

<img src="https://user-images.githubusercontent.com/56749776/185519803-50f08ece-e0d3-47f2-93ba-bd822524a42e.png" width="600" height="400">

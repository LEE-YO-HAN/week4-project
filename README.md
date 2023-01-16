# 댓글 CRUD & Pagenation - 원티드 프리온보딩 4주차

## 배포주소 :

</br></br>

## 기능 상세 정리 : https://github.com/LEE-YO-HAN/week4-project/wiki

1. [Local Start](#local-start)
2. [구현사항](#구현사항)
3. [과제 요구사항](#과제-요구사항)

</br>

### Local Start

<br>

```bash
# yarn
yarn install
```

```bash
# .env
REACT_APP_BASE_URL = "http://localhost:3001"
```

```bash
# local DB
yarn json-server --watch db.json --port 3001
```

```bash
# start project
yarn start
```

<h3 align="center">🛠Used Tools🛠</h3>

<div align="center" >
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
    <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=Redux&logoColor=white"/>
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"/>
</div>
<div align="center">
    <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat&logo=styled-components&logoColor=white"/>
    <img src="https://img.shields.io/badge/JsonServer-000000?style=flat&logo=JSON&logoColor=white"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white"/>
</div>

<br>
<br>
<br>

### 구현사항

1. 댓글 CRUD 구현
   - 댓글 불러오기, 작성, 수정, 삭제 기능 구현

</br>

2. Pagenation 적용
   - 한 번에 보여줄 댓글 개수 4개
   - 한 묶음에 페이지 번호 목록 최대 5개로 설정

</br>

3. 댓글 작성, 수정, 삭제 후 동작
   - 댓글 작성 후 : 다른 페이지에 위치하고 있더라도 1페이지로 이동하며 입력 폼 초기화
   - 댓글 수정 후 : 현재 보고있는 페이지 유지, 입력 폼 초기화
   - 댓글 삭제 후 : 1페이지로 이동

</br></br>

### 과제 요구사항

1. Redux 환경설정은 자유롭게 진행
   - Redux-thunk를 이용한 Redux 로직 구성
2. Redux logger, Redux-Devtools 설정 필수
   - store config 설정을 통해 logger, Devtools 설정 완료
3. Redux를 이용한 비동기 처리 필수
   - Redux 정상 적용 완료

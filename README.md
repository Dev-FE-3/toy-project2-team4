# TEAM4 - 쨍그랑 🔨

## 🧑팀소개💻

<div align="center">

| <img width="200px" src="https://avatars.githubusercontent.com/u/103170787?v=4" style="max-width: 100%;"> | <img width="200px" src="https://avatars.githubusercontent.com/u/67031524?v=4" style="max-width: 100%;"> | <img width="200px" src="https://avatars.githubusercontent.com/u/173143133?v=4" style="max-width: 100%;"> | <img width="200px" src="https://avatars.githubusercontent.com/u/150775699?v=4" style="max-width: 100%;"> |
| :---: | :---: | :---: | :---: |
| **[박현수](https://github.com/redbuttonking)** | **[양정규](https://github.com/jungkyuYang)** | **[장은혜](https://github.com/Jang-eunhye)** | **[표현경](https://github.com/girl0330)** |
| **관리자/사용자** 로그인 <br/> **공통** 모달/아이콘 <br/> firebase 연동 <br/> 발표자 | **사용자** 급여 내역 확인<br/> **공통** 네비게이션 <br/> 초기 세팅 <br/> msw 연동<br/> 발표자료 제작 <br/> | **관리자/사용자** 수업 확인 <br /> **공통** 입력 <br /> 발표자료 제작 | **사용자** 정정 신청 내역 <br> **공통** 버튼/ 드롭다운 <br /> 리덕스 구조 <br/> README 작성 |

</div>

&nbsp;


## ✨ 프로젝트 소개

### 학원의 복잡한 스케줄과 급여관리를 모두 담은 운영관리시스템 💻
> 📌**편리한 근무 일정 확인** <br />
> 📌**정확하고 간편한 급여 확인** <br />
> 🤗 **간편한 수정으로 관리 효율 업**

## 🚀 주요 페이지와 기능

### 로그인 페이지
![Image](https://github.com/user-attachments/assets/073383e4-e292-44f1-a3f5-99ad23ab3e1e)

### 수업 확인 페이지
![Image](https://github.com/user-attachments/assets/683cd901-1200-4d20-8219-242961d47c7a)

![Image](https://github.com/user-attachments/assets/cf126b07-27ef-4570-b8f3-b589e298c12e)

### 급여 확인 페이지
![Image](https://github.com/user-attachments/assets/09f1f1ff-6dda-4704-b666-c0af867dba52)

![Image](https://github.com/user-attachments/assets/4af20c69-e0e4-44ca-a00a-ff9ffc3cbbcc)

![Image](https://github.com/user-attachments/assets/56717fe5-8569-44ea-b8b2-83b6c764d1b3)

### 급여 정정 페이지
![Image](https://github.com/user-attachments/assets/c4feb731-3bbb-47b9-89f8-3e75d0bd226d)

![Image](https://github.com/user-attachments/assets/d1f1a1c3-a8c5-4977-9c8d-f72b0126ad97)


## 📁 폴더 구조
```
TOY-PROJECT2-TEAM4
- 📁 app
  - 📁 (home)
  - 📁 modificationHistory
  - 📁 paymentHistory 
  - 📁 layout.jsx
  - 📁 not-found.jsx
  
- 📁 components 
  - 📁 login 
  - 📁 modification 
    - 📁 modificationHistory 
    - 📁 modificationList 
  - 📁 navigation 

- 📁 store 
  - 📄 authReducer.js 
  - 📄 modificationHistoryReducer.js 
  - 📄 paymentHistoryReducer.js  
  - 📄 rootReducer.js 
  - 📄 store.js 

- 📁 hooks 
  - 📄 useFetch.js  

- 📁 mocks 
  - 📄 handlers.js  
  - 📄 integrateMSW.jsx  
  - 📄 mockServiceWorker.js  

- 📁 public 
  - 📁 images 

- 📁 utils 
  - 📄 apiUtils.js 
  - 📄 firebase.js  
  - 📄 timeUtils.js  

- 📄 .gitignore 
- 📄 README.md  
- 📄 next.config.mjs  
- 📄 tsconfig.json  
- 📄 package.json  
- 📄 package-lock.json  


```

## 🔨 기술 스택

<div align="center">

|      Type       |                                                                                                                 Tool                                                                                                                 |
| :-------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   **Framework**   |                                  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)                                  |
|     **Library**     |                                  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                  |
|    **Language**     |           ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black) 
|     **Styling**     |                                       ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SASS&logoColor=white)                                       |
|   **Formatting**    |            ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)            |
| **Package Manager** |                                                                        ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                         |
|  **State Management**  |                                    ![Redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)                                     |
| **Mocking API** | ![Mock Service Worker](https://img.shields.io/badge/MSW-FF5733?style=for-the-badge&logo=MSW&logoColor=white) |
| **Version Control** |            ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)            |
|  **Collaboration**  |                    ![Slack](https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)                    |
|     **Design**      |                                                            ![Figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)                                                            |



</div>

&nbsp;

## ⚙ 프로젝트 설정 및 실행 방법

### 1. 프로젝트 클론

Git 저장소에서 프로젝트를 로컬로 클론합니다. 터미널(또는 명령 프롬프트)을 열고 명령어를 입력합니다.

```
git clone https://github.com/Dev-FE-3/toy-project2-team4.git
```

### 2. 의존성 설치

코드 에디터에서 프로젝트 폴더를 열고 터미널에서 'npm' 명령어를 사용하여 의존성을 설치합니다.

```
npm install
```

### 3. 개발 서버 실행

개발 서버를 실행하여 프로젝트를 로컬에서 프로젝트를 실행할 수 있습니다.

```
npm run dev 
```

&nbsp;


## 💡 팀 컨벤션


### prettier 컨벤션
```
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 120,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "auto",
  "color-hex-case": "lower",
  "number-leading-zero": "always"
}
```
### 브랜치 전략

**main, dev, feat** 브랜치 사용

- main : 배포 가능한 상태만을 관리하는 브랜치

- dev : 개발 단계에서 통합 역할을 담당하는 브랜치

- feat : 새롭게 추가되거나 변경되는 기능을 개발, merge 후에는 삭제

### 커밋 컨벤션

- `feat` : 새로운 기능 추가

- `fix` : 버그 수정

- `docs` : 문서 수정

- `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우

- `refactor` : 코드 리펙토링

### 파일 컨벤션

- 폴더 : camelCase 

- 파일 : camelCase

### 네이밍 컨벤션

- 함수 및 변수 : camelCase

- css 클래스 : camelCase

### CSS 스타일 가이드

- 공통 디자인 요소 설정 후 진행

![Image](https://github.com/user-attachments/assets/613fa2c9-d175-481e-8a7c-52288cebd54c)

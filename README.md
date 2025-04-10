# 🧭 MeetUps (Next.js)

- 사용자가 모임 약속을 등록하고, 참여하고, 관리할 수 있는 풀스택 웹 애플리케이션입니다.  
- Next.js 기반 SSR/SSG, MongoDB, NextAuth.js, Kakao Map API, SweetAlert2 등을 활용하여 인증부터 모임 등록/수정/삭제, 지도 기반 주소 처리, 반응형 UI까지 구현했습니다.

---

## 🚀 배포 주소 (Vercel)

🔗 [배포링크-> Click](https://manage-meeting.vercel.app/)

---

## 🔧 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (Page Router 기반) |
| 인증 | NextAuth.js + MongoDB |
| 데이터베이스 | MongoDB Atlas |
| UI 라이브러리 | React, CSS Module, SweetAlert2 |
| 기타 | Kakao Maps API, date-fns, bcryptjs |

---

## 📁 디렉토리 구조

```
.
├── components
│   └── auth                            # 로그인/회원가입 폼 구성성
│       ├── auth-form.js                # 로그인 및 회원가입 입력 폼 컴포넌트
│       └── auth-form.module.css        # auth-form 전용 스타일
│
│   └── layout                          # 전체 페이지 공통 레이아웃 및 내비게이션
│       ├── Layout.js                   # 전체 페이지 감싸는 레이아웃 컴포넌트
│       ├── Layout.module.css           # Layout 전용 스타일
│       ├── MainNavigation.js           # 상단 내비게이션 바
│       └── MainNavigation.module.css   # MainNavigation 전용 스타일
│                
│   └── map                             # Kakao 지도 및 장소 검색 기능
│       ├── KaKaoMap.js                 # 상세 페이지 지도 표시용 KakaoMap 컴포넌트
│       └── PlaceSearch.js              # 주소 입력 시 장소 검색 및 선택 기능
│
│   └── meetups                         # Meetup UI 컴포넌트
│       ├── MeetupDetail.js             # 모임 상세 정보 표시 컴포넌트
│       ├── MeetupDetail.module.css     # MeetupDetail 전용 스타일
│       ├── MeetupForm.js               # 모임 등록/수정 폼
│       ├── MeetupForm.module.css       # MeetupForm 전용 스타일
│       ├── MeetupItem.js               # 모임 리스트 개별 아이템
│       ├── MeetupItem.module.css       # MeetupItem 전용 스타일
│       ├── MeetupList.js               # 모임 전체 리스트 출력
│       ├── MeetupList.module.css       # MeetupList 전용 스타일
│       ├── ParticipationControls.js    # 참여/참여취소 버튼 제어 컴포넌트
│       └── Participation...module.css  # ParticipationControls 전용 스타일
│      
├── hooks                               # 사용자 정의 훅 모음 (컴포넌트 로직 재사용 목적)
│   └── useJoinMeetup.js                # 모임 참여/취소 처리 및 참여 상태 관리 훅
│
├── lib                                 # 인증 및 DB 관련 헬퍼 함수 모음
│   ├── auth.js                         # 비밀번호 해시 및 검증 함수 (bcryptjs 사용)
│   └── db.js                           # MongoDB 연결 및 컬렉션 접근 유틸
│
├── pages
│   └── [meetupId]                      # 상세 페이지 (동적 라우트)
│       └── index.js                    # 특정 모임 상세 정보 페이지
│
│   └── api                             # API Routes (meetups, auth 등)
│       └── admin                       # DB 필드 보정용 유지보수 스크립트
│           ├── fix-creator.js          # 누락된 creatorId 필드 추가
│           └── fix-meetups-fields.js   # 누락된 date/time/capacity 필드 추가
│       └── auth                        # 인증 관련 API 
│           ├── [...nextauth].js        # NextAuth.js 설정 및 인증 핸들링
│           └── signup.js               # 사용자 회원가입 처리 API
│       └── create                      # 모임 생성 API
│           └── new-meetup.js           # 새로운 모임 등록 (POST) 처리
│       └── delete                      # 모임 삭제 API
│           └── [id].js                 # 특정 ID의 모임 삭제 처리
│       └── edit                        # 모임 수정 API
│           └── [id].js                 # 특정 ID의 모임 정보 수정 처리
│       └── participants                # 참여자 관련 API
│           ├── count.js                # 모임별 현재 참여자 수 조회 API
│           └── participants.js         # 참여/취소 요청 처리 API
│       └── search                      # 검색 관련 API
│           └── search.js               # 키워드/주소/날짜 기반 모임 검색 처리 API
│       └── my-meetups.js               # 현재 사용자가 참여한 모든 모임 정보를 조회하는 API
│ 
│   └── auth                            # 로그인/회원가입 페이지
│       ├── signin.js                   # 사용자 로그인 페이지
│       └── signup.js                   # 사용자 회원가입 페이지
│
│   └── edit                            # 모임 수정 페이지
│       └── [meetupId]                  # 수정할 모임 ID 기반 동적 라우팅
│           └── index.js                # 선택된 모임 수정 폼 렌더링
│
│   └── new-meetup                      # 새 모임 등록 페이지
│       └── index.js                    # 모임 생성 폼 렌더링
│
│   └── user                            # 마이 페이지 (My Meetups)
│       └── my-meetups.js               # 내가 참여한 모임 목록 조회 페이지
│ 
│   ├── _app.js                         # 전체 앱 레이아웃 및 글로벌 설정
│   └── index.js                        # 메인 페이지 (모임 리스트)
│ 
├── public                              # 정적 리소스 저장 폴더 (이미지, favicon 등)
├── styles                              # 전역 스타일 시트 (global.css)
│
├── .env.development.local              # 개발 환경용 환경 변수 파일 (NEXTAUTH_SECRET, Mongo URI 등)
└── .env.production                     # 프로덕션 배포용 환경 변수 파일 (NEXTAUTH_SECRET, Mongo URI 등)
```

---

## ✨ 주요 기능


### 사용자 인증 (NextAuth.js)
- `CredentialsProvider` 기반 로그인 / 회원가입 기능 제공
- 비밀번호 해싱 처리로 안전한 사용자 정보 관리 (bcryptjs)
- 세션 기반 인증 유지 (JWT 방식)
- 작성자 본인만 수정/삭제 가능하도록 권한 검증

### Meetup 기능
- 모임 목록/상세 페이지 정적 생성 (SSG + ISR) → 빠른 로딩 속도
- 새 모임 생성 (POST API + MongoDB 연동)
- 수정 및 삭제 기능 (PUT, DELETE API) — 작성자 본인만 가능
- SweetAlert2로 삭제 확인/성공 메시지 등 사용자 친화적 UI 제공
- 입력 항목: 제목, 설명, 날짜, 시간, 최대 인원, 위치

### 지도 & 주소 기능 (Kakao Map API)
- 모임 등록/수정 시 장소 검색 → 자동 주소 입력 처리
- 상세 페이지에서 해당 주소 지도 및 마커 표시
- Kakao Map API 연동을 통한 실제 지도 기반 위치 정보 시각화

### 마이페이지 기능
- 내가 참여한 모임 목록만 필터링하여 확인 가능 (`/user/my-meetups`)
- 작성자 ID 기준으로 권한 분리 및 접근 제어 처리
- 참여 기능 및 참여 인원 수 확인 가능

### 기타
- 반응형 UI 적용 (모바일 대응)
- 참여 시 정원 초과 방지 기능 (capacity 제한 로직)
- 모임 수정 시 기존 정보 자동 반영 (폼 초기값 설정)

---

## ⚙️ 실행 방법

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.development.local` 파일 생성 후 다음 내용 추가:

```env
MONGODB_USERNAME=your-username
MONGODB_PASSWORD=your-password
MONGODB_CLUSTER=your-cluster.mongodb.net
MONGODB_DB=meetups-db
MONGODB_APP_NAME=Cluster0
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_KAKAO_MAP_API=your-kakao-map-key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

---

## 📜 개발 기록 (DEV LOG)

아래 문서에서 프로젝트 개발 과정, 구조 변경, 기능 확장 등에 대한  
자세한 내용을 확인하실 수 있습니다.

🔗 [Next.js Meetup 프로젝트 개발 기록 보기](https://jelkov-developer.notion.site/Next-js-1c9c23f30734800b9ae7e7fa8b789b10?pvs=4)


---

## 📌 개선 아이디어 (TODO)


- 🔒 **사용자 역할 관리**
  - 일반 사용자 / 관리자(role) 권한 구분
  - 관리자 전용 페이지에서 모든 모임 및 유저 관리 기능 제공

- 🗂️ **관리자 페이지 기능 추가**
  - 전체 모임/참여 내역/회원 정보 열람 및 수정
  - 잘못된 데이터 정정, 스팸/비정상 모임 삭제 등 유지보수 기능

- 💬 **댓글 기능**
  - 모임 상세 페이지에서 사용자 간 소통을 위한 댓글 입력/삭제 기능
  - 작성자만 삭제 가능하도록 인증 처리

- 🔔 **알림 기능**
  - 모임 시작 임박 알림, 참여 확정 알림 등을 SweetAlert 또는 이메일로 전송
  - 서버 스케줄러와 연동하거나 FCM 등 도입 고려

- 👑 **방장(모임 생성자) 기능**
  - 방장은 모임 참여자 승인/강퇴 가능
  - 모임 수정 권한 제한 (방장만 가능)
  - 방장 위임 기능도 추후 고려 가능

---

## 🙌 만든 사람

**JELKOV** – full-stack 웹 개발자
이 프로젝트는 Next.js 학습과 풀스택 구조 경험을 위해 제작되었습니다.

📧 이메일: [ajh4234@gmail.com]  
🔗 GitHub: [JELKOV GitHub](https://github.com/yourusername)


---
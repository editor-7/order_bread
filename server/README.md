# Shopping Mall Server

Node.js + Express + MongoDB 백엔드 서버

## 시작하기

### 1. 의존성 설치

```bash
cd server
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사 후 값 수정:

```bash
cp .env.example .env
```

`.env` 예시:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shoping_mall
JWT_SECRET=강력한_랜덤_문자열_입력
NODE_ENV=development
```

### 배포 시 필수 설정

**NODE_ENV=production** 이면 **JWT_SECRET** 반드시 설정해야 합니다. (설정 안 하면 서버가 시작되지 않습니다)

JWT_SECRET 생성 예:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. MongoDB 실행

로컬에서 MongoDB가 실행 중이어야 합니다.

- **로컬 설치**: `mongod` 실행
- **MongoDB Atlas**: 클라우드 연결 문자열을 `MONGODB_URI`에 설정

### 4. 서버 실행

```bash
# 프로덕션
npm start

# 개발 (파일 변경 시 자동 재시작)
npm run dev
```

서버는 기본적으로 `http://localhost:5000` 에서 실행됩니다.

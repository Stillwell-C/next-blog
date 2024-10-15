# Next Blog - Next.js 블로그 애플리캐이션

이 레포지토리는 Next.js 프레임워크로 개발한 풀스택 블로그 애플리케이션입니다.

## Demo

애플리케이션은 [여기](https://next-blog-rust-zeta.vercel.app/)에서 사용할 수 있습니다.

##기술 스택
프론트엔드: Next.js, React, Tailwind CSS
백엔드: Next.js API Routes, Next.js Server Actions, Prisma, PostgreSQL, Supabase
인증: NextAuth, Bcrypt
배포: Vercel
기타: Cloudinary, Next-Themes

## 프로젝트 실행 방법

1. **레포지토리는 클론**:  
   이 레포지토리는를 클론합니다:
   `git clone https://github.com/Stillwell-C/next-blog`
2. **패키지 설치**:
   프로젝트 디렉토리로 이동한 후, 필요한 패키지를 설치합니다:
   `npm install`
3. **개발 서버 실행**:
   개발 서버를 시작합니다:
   `npm run dev`
   서버가 실행되면 브라우저에서 http://localhost:3000으로 이동하여 애플리케이션을 확인할 수 있습니다.
4. **프로덕션 빌드**:
   애플리케이션을 프로덕션 모드로 빌드하려면 다음 명령어를 실행합니다:
   `npm run build`
5. **프로덕션 서버 실행**:
   빌드 후, 프로덕션 서버를 실행하려면 다음 명령어를 사용합니다:
   `npm start`

## 상세 내용

### 백엔드

이 애플리케이션에서는 서버 사이드 로직을 처리하기 위해 서버 액션을 사용합니다. 여러 개의 API 경로가 있는데, 현재 사용되고 있는 경로는 NextAuth 패키지의 인증 경로뿐입니다. subComment와 Cloudinary API 경로를 만들었지만, 결국 사용하지 않았습니다. API 경로를 만들 수 있다는 것을 보여주기 위해 프로젝트에 남겨두었습니다.

서버 액션은 src/lib 디렉토리 안에 있습니다.

데이터 검증을 위해 외부 패키지를 사용하지 않았습니다. 이 프로젝트에서는 Zod라는 검증 패키지를 사용하고 싶었지만, 시간이 부족하여 간단하게 type check이나 string 길이로 검증합니다. 실제 프로덕션 애플리케이션에서는 더 강력한 데이터 검증을 활용하는 것이 좋을 것 같습니다.

데이터베이스에서 데이터를 생성, 수정, 삭제하는 서버 액션은 사용자를 확인합니다. 생성의 경우, Prisma ORM이 외래 키를 에뮬레이트하지 않기 때문에 모든 생성 액션에서 사용자 존재 여부를 확인합니다. 관리자 등급이 필요한 글 작성, 수정, 삭제와 관련된 액션에서도 사용자 등급이 확인됩니다.

데이터는 Supabase PostgreSQL 데이터베이스에서 저장되어 있으며 Prisma ORM으로 데이터베이스를 연동합니다.

이미지 파일은 Cloudinary라는 이미지 호스트에 저장되어 있습니다. Supabase에 업로드하는 것이 좋을 것 같지만, 이미지 파일 업로드가 불가능한 MongoDB와 ElephantSQL에 익숙해서 Supabase에서 가능 여부를 확인하지 않고 Cloudinary로 업로드 기능을 만들었습니다. 오늘 시간이 되면 Supabase로 변경할 계획입니다.

### 인증

이 프로젝트에서는 인증 처리를 위해 NextAuth 패키지를 사용했습니다. 사용자가 아이디와 비밀번호를 입력하여 회원가입이 가능하며 로그인할 수 있습니다. 대신 GitHub 로그인 버튼을 통해 GitHub 계정으로 로그인할 수 있습니다. GitHub으로 로그인하면 비밀번호를 설정하지 않아도 되고, GitHub 프로필 사진이 자동으로 사용자 프로필 사진으로 등록됩니다.

로그아웃 상태에서 Navbar 또는 포스트 페이지의 로그인 링크를 클릭하면 URL이 search parameter로 저장됩니다. 이후 아이디와 비밀번호로 로그인한 다음 원래 페이지로 리디렉션됩니다. OAuth로 로그인하면 홈 페이지로 리디렉션됩니다.

### 사용자

사용자가 로그인한 후 프로필 페이지로 이동하면 프로필 사진을 변경하고 사용자 계정에 대한 데이터를 볼 수 있습니다. 사용자 등급은 관리자(Admin)와 일반 사용자(User)로 나뉘어 있습니다. 일반 사용자 등급을 가진 사용자는 댓글, 대댓글, 답글을 남길 권한이 있습니다. 관리자 등급을 가진 사용자는 일반 사용자 권한을 가지고 있으며, 글을 작성, 수정, 삭제할 수 있는 권한도 있습니다.

로그아웃 상태에서는 글 목록과 글 상세 페이지를 볼 수 있지만, 댓글, 대댓글, 답글 작성과 글 작성, 수정, 삭제는 불가능합니다.

### 포스트

관리자 등급을 가진 사용자만 글을 작성, 수정, 삭제할 수 있습니다. 글에는 제목과 내용이 반드시 포함되어야 하며, 부제와 이미지를 추가할 수 있습니다. 이미지를 포함한 글을 수정할 때 이미지를 삭제할 수 있습니다.

Navbar의 검색 입력란을 통해 글 작성자, 제목, 부제, 내용을 검색할 수 있습니다.

포스트가 수정되면 최신 수정 일자와 마지막으로 수정한 사용자가 글 상세 페이지에 표시됩니다.

### 댓글, 대댓글, 답글

모든 사용자가 댓글, 대댓글, 답글을 남길 수 있습니다. 포스트 페이지로 이동하면 글 내용 아래에 답글 쓰기 링크와 댓글 입력란이 있어 댓글과 답글을 제출할 수 있습니다. 댓글 아래의 대댓글 쓰기 버튼을 통해 대댓글을 작성할 수 있습니다. 포스트 페이지에서 댓글이나 대댓글을 작성한 후에는 페이지를 새로 고쳐야 볼 수 있습니다.

### UI

Tailwind CSS를 사용하여 반응형 UI를 디자인했습니다. 편리한 모바일 네비게이션을 위해 작은 화면에서는 Navbar가 모바일 Navbar로 변경됩니다.

React-Theme 패키지를 사용하여 다크 모드와 라이트 모드 변경을 처리합니다. 일반 React 애플리케이션에서는 Context API를 사용하여 다크 모드와 라이트 모드를 처리한 경험이 많지만, Next.js의 경우 SSR과 때때로 발생하는 깜빡거림 때문에 다크 모드와 라이트 모드를 처리할 수 있는 패키지를 사용하기로 했습니다.

글, 글 목록, 댓글 목록 데이터를 로딩하는 동안 loading.tsx와 React Suspense를 사용하여 Skeleton 애니메이션으로 표시합니다.

### 기타

Next.js의 generateMetadata 함수와 metadata 객체를 사용하여 모든 페이지의 제목과 설명을 설정합니다.

# nodejs-firebase

## API 명세
### /auth
| API명 | 메서드 | 엔드포인트 | Request Body | Response Body |
|---|---|---|---|---|
| 회원가입 | POST | /signup | { ID: string, Password: string, Nickname: string, Gender: string } | { ID, Password, Nickname, Gender, UserID: string, Status: boolean } |
| 로그인 | POST | /signin | { ID, Password } | { UserID, Nickname, Gender, Status } |
| ID 중복확인 | POST | /checkDuplicateID | { ID } | { Status } |
| 닉네임 중복확인 | POST | /checkDuplicateName | { Nickname } | { Status } |

### /board
| API명 | 메서드 | 엔드포인트 | Request Body | Response Body |
|---|---|---|---|---|
| 글 목록 | GET | / | | { Articles: [{ ArticleID: string, Title: string, Date: Date, Writer: string, UserID }], Status } |
| 글 생성 | POST | /new | { UserID, Title, Contents } | { Status } |
| 글 읽기 | GET | /article/:id | | { Title, Contents, Date, Writer, UserID, Status } |
| 글 편집 | PUT | /article/:id/update | { Title, Contents } | { Status } |
| 글 삭제 | DELETE | /article/:id | | { Status } |

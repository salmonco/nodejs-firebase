const router = require("express").Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();
const boardsRef = db.collection("board");
const usersRef = db.collection("user");

/**
 * 글 목록
 * Request Body : { }
 * Response Body : { Articles: [{ ArticleID, Title, Date, Writer, UserID }], Status }
 */
router.get("/", async (req, res) => {
  try {
    const boardRef = await boardsRef.get();
    const responseBody = {};
    const articles = [];

    boardRef.forEach((doc) => {
      const article = doc.data();
      article.ArticleID = doc.id;

      articles.push(article);
    });

    responseBody.Articles = articles;
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 생성
 * Request Body : { UserID, Title, Contents }
 * Response Body : { Status }
 */
router.post("/new", async (req, res) => {
  try {
    const article = req.body;
    article.Date = new Date();
    const userRef = await usersRef.doc(article.UserID).get();
    article.Writer = userRef.data().Nickname;
    await boardsRef.add(article);

    const responseBody = {};
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 읽기
 * Request Body : { }
 * Response Body : { Title, Contents, Date, Writer, UserID, Status }
 */
router.get("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const boardRef = await boardsRef.doc(id).get();

    const responseBody = boardRef.data();
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 편집
 * Request Body : { Title, Contents }
 * Response Body : { Status }
 */
router.put("/article/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    await boardsRef.doc(id).set(req.body, { merge: true });

    const responseBody = {};
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 글 삭제
 * Request Body : { }
 * Response Body : { Status }
 */
router.delete("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await boardsRef.doc(id).delete();

    const responseBody = {};
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error(err);
    res.status(503);
    res.send(err);
  }
});

module.exports = router;

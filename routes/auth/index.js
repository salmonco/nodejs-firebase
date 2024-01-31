const router = require("express").Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();
const usersRef = db.collection("user");

/**
 * 회원가입
 * Request Body : { ID: "", Password: "", Nickname: "", Gender: "" }
 * Response Body : {  }
 */
router.post("/signup", async (req, res, next) => {
  try {
    const user = req.body;
    const addResponse = await usersRef.add(user);

    const responseBody = user;
    responseBody.UserID = addResponse.id;
    responseBody.Status = true;

    res.send(responseBody);
  } catch (err) {
    console.error("signup", err);
    res.status(503);
    res.send(err);
  }
});

/**
 * 로그인
 * Request Body : { ID: "", Password: "" }
 * Response Body : { UserID: "", Nickname: "", Gender: "", Status: true | false }
 */
router.post("/signin", async (req, res, next) => {
  try {
    const { ID, Password } = req.body;

    const userRef = await usersRef
      .where("ID", "==", ID)
      .where("Password", "==", Password)
      .get();

    const response = {};

    response.Status = userRef.size === 1;

    userRef.forEach((doc) => {
      response.UserID = doc.id;
      response.Nickname = doc.data().Nickname;
      response.Gender = doc.data().Gender;
    });

    res.send(response);
  } catch (err) {
    console.error("signin", err);
    res.status(503);
    res.send(err);
  }
});

/**
 * ID 중복확인
 * Request Body : { ID: "" }
 * Response Body : { Status: true | false }
 */
router.post("/checkDuplicateID", async (req, res) => {
  try {
    const ID = req.body.ID;

    const userRef = await usersRef.where("ID", "==", ID).get();

    const response = {};

    response.Status = userRef.empty;

    res.send(response);
  } catch (err) {
    console.error("checkDuplicateID", err);
    res.send(err);
  }
});

/**
 * 닉네임 중복확인
 * Request Body : { Nickname: "" }
 * Response Body : { Status: true | false }
 */
router.post("/checkDuplicateName", async (req, res) => {
  try {
    const nickname = req.body.Nickname;

    const userRef = await usersRef.where("Nickname", "==", nickname).get();

    const response = {};

    response.Status = userRef.empty;

    res.send(response);
  } catch (err) {
    console.error("checkDuplicateName", err);
    res.send(err);
  }
});

module.exports = router;

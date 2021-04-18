const express = require("express");
const app = express();

const { getStudents } = require("./students");

const students = getStudents();

// all functions should be defined before listen

app.get("/profiles", function (request, response) {
  const profiles = students.map((student) => ({
    ...student,
    profile: `/profiles/${student.username}`,
    largeImage: `/profiles/${student.username}/image?size=large`,
    smallImage: `/profiles/${student.username}/image?size=small`,
  }));

  response.json(profiles);
});

app.get("/profiles/:username", function (request, response) {
  const user = students.filter(
    (student) => student.username === request.params.username
  );

  if (user.length > 0) {
    response.json(user);
  } else {
    response.sendStatus(404);
  }
});

app.get("/profiles/:username/image", function (request, response) {
  const size = request.query.size;
  const username = request.params.username;

  /*
    we don't have to check if the image or the username exists in this case,
    because if the image does not exist sendFile will automatically
    return error 404.
  */
  if (size === "large" || !size) {
    response.sendFile(`./images/${username}-large.jpg`, { root: __dirname });
  } else if (size === "small") {
    response.sendFile(`./images/${username}-small.jpg`, { root: __dirname });
  } else {
    response.sendStatus(400);
  }
});

app.listen(3000, function () {
  console.log("On port 3000");
});

const gulp = require("gulp");
const concat = require("gulp-concat");
const beautify = require("gulp-beautify");

const sections = {
  index: [
    "./src/views/header.html", //
    "./src/views/home.html",
    "./src/views/footer.html",
  ],
  // "blog-list": [
  //   "./src/views/header.html", //
  //   "./src/views/blog-list.html",
  //   "./src/views/footer.html",
  // ],
};

const createTask = (key) => {
  gulp.task(key, () => {
    return gulp
      .src(sections[key])
      .pipe(concat(key + ".html"))
      .pipe(
        beautify.html({
          indent_size: 2,
        })
      )
      .pipe(gulp.dest("./dist"));
  });
};

let tasks = [];

for (const key in sections) {
  createTask(key);
  tasks.push(key);
}

exports.views = gulp.series(tasks);

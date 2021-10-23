const gulp = require("gulp");
const concat = require("gulp-concat");
const beautify = require("gulp-beautify");

const sections = {
  index: [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-secondary.html",
    "./src/views/home.html",
    "./src/views/footer/footer-secondary.html",
  ],
  badehotellet: [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/badehotellet.html",
    "./src/views/footer/footer-primary.html",
  ],
  "oplev-bornholm": [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/oplev-bornholm.html",
    "./src/views/footer/footer-primary.html",
  ],
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

const gulp = require("gulp");
const concat = require("gulp-concat");
const beautify = require("gulp-beautify");

const sections = {
  pages: ["./src/views/pages.html"],
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
  restaurant: [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/restaurant.html",
    "./src/views/footer/footer-primary.html",
  ],
  "oplev-bornholm": [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/oplev-bornholm.html",
    "./src/views/footer/footer-primary.html",
  ],
  "ophold-kampagner": [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/ophold-kampagner.html",
    "./src/views/footer/footer-primary.html",
  ],
  kontakt: [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/kontakt.html",
    "./src/views/footer/footer-primary.html",
  ],
  "alle-vaerelser": [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/alle-vaerelser.html",
    "./src/views/footer/footer-primary.html",
  ],
  midtugeophold: [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-tertiary.html",
    "./src/views/midtugeophold.html",
    "./src/views/footer/footer-primary.html",
  ],
  "bornholm-med-bil": [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-primary.html",
    "./src/views/bornholm-med-bil.html",
    "./src/views/footer/footer-primary.html",
  ],
  "vaerelse-visning": [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-tertiary.html",
    "./src/views/vaerelse-visning.html",
    "./src/views/footer/footer-primary.html",
  ],
  map: [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-map.html",
    "./src/views/map.html",
    "./src/views/footer/footer-map.html",
  ],
  policy: [
    "./src/views/header/head-primary.html", //
    "./src/views/header/header-policy.html",
    "./src/views/policy.html",
    "./src/views/footer/footer-secondary.html",
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

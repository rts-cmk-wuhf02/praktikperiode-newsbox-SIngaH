const gulp = require("gulp"); 
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");

function html(done){
    gulp.src("./src/html/templates/*.ejs")
        .pipe(ejs())
        .pipe(rename(function(path){
            path.extname = ".html"
        }))
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
    done();
}

function watchHtml(done){
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
}

function scss(done){
    gulp.src("./src/css/**/*.scss")
        .pipe(sass().on("error", err => console.log(err)))
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(connect.reload());
    done();
}

function watchScss(done){
    gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
}

function js(done){
    gulp.src("./src/js/**/*.js")
        // .pipe(babel({
        //     presets: ["@babel/env"]
        // }))
        .pipe(gulp.dest("./dist/assets/js"))
        .pipe(connect.reload());
    done();
};

function watchJs(done){
    gulp.watch("./src/js/**/*.js", { ignoreInitial: false }, js);
}

function images(done){
    gulp.src("./src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/assets/images"))
        .pipe(connect.reload());
    done();
}

function watchImages(done){
    gulp.watch("./src/images/**/*", { ignoreInitial: false }, images);
}

gulp.task("dev", function(done){
    watchHtml();
    watchScss();
    watchJs();
    watchImages();
    connect.server({
        livereload: true,
        root: "dist"
    });
    done();
});

gulp.task("build", function(done){
    html(done);
    scss(done);
    js(done);
    images(done);
    done();
});
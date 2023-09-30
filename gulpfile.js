import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";

global.app = {
    isBuild: process.argv.includes('--build'), //продакшн
    isDev: !process.argv.includes('--build'), //режим разработки
    path: path,
    gulp: gulp,
    plugins: plugins
}

function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}

export { svgSprite }

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
const mainTasts = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images))

const dev = gulp.series(reset, mainTasts, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasts)
const deployZIP = gulp.series(reset, mainTasts, zip)

export {dev}
export {build}
export {deployZIP}

gulp.task('default', dev);
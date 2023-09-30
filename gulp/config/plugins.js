import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browsersync from "browser-sync";
import newer from "gulp-newer";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";
import svgSprite from "gulp-svg-sprite";
import ifPlugin from "gulp-if";

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    webp: webp,
    imagemin: imagemin,
    fs: fs,
    fonter: fonter,
    ttf2woff2: ttf2woff2,
    svgSprite: svgSprite,
    if: ifPlugin,
}
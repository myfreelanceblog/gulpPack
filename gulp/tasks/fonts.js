//конвертируем otf => ttf
export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
}

//конвертируем ttf => woff / woff2
export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(app.plugins.ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

//генерируем css стили для подключения шрифтов
export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    app.plugins.fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
        if (fontsFiles) {
            if (!app.plugins.fs.existsSync(fontsFile)) {
                app.plugins.fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ?
                            fontFileName.split('-')[0] :
                            fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ?
                            fontFileName.split('-')[1] :
                            fontFileName;
                        let fontStyle = fontFileName.split('-')[2] ?
                            fontFileName.split('-')[2] :
                            fontFileName;

                        //определяем жирность шрифта
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }

                        //определяем стиль шрифта
                        if (fontStyle.toLowerCase() === 'italic') {
                            fontStyle = "italic";
                        } else {
                            fontStyle = "normal";
                        }

                        app.plugins.fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log('Файл scss/common/fonts.scss уже существует. Для обновления файла нужно его удалить');
            }
        }
    });

    return app.gulp.src(app.path.srcFolder);

    function cb() {}
}
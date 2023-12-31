export const svgSprite = () => {
    return app.gulp.src(app.path.src.svgicons)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SVG ICONS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images));
}
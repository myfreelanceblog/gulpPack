export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAKVJREFUeF7t10ERwlAUQ9F0h5TiDEk4AyldMiyq4p46eJmcZv6x+HfE758ANCCeAALxAvgJIoBAPAEE4gWwAgggEE8AgXgBrAACCMQTQCBeACuAAALxBBDY9tz22vaIleHa9v434LPtjB1/n/sVAALR7t9nW4F4AbwFEEAgngAC8QJYAQQQiCeAQLwAVgABBOIJIBAvgBVAAIF4AgjEC2AFEKgT+AGh2AhB0SDTaAAAAABJRU5ErkJggg=="
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
        console.log('msg')
    })
}
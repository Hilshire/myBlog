// highlightjs默认引入所有的语言，直接引用会导致打包出来的文件膨胀2.5M左右，所以转这里单独配置

var hljs = require('../node_modules/highlight.js/lib/highlight.js')
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'))
hljs.registerLanguage('json', require('../node_modules/highlight.js/lib/languages/json'))
hljs.registerLanguage('python', require('../node_modules/highlight.js/lib/languages/python'))
hljs.registerLanguage('ruby', require('../node_modules/highlight.js/lib/languages/ruby'))

export default hljs
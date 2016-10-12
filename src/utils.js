function scrollFire(selector, downCallback, upCallback) {
    let el = document.querySelector(selector),
        targetHeight = el.offsetTop,
        up = true,
        down = false
    document.addEventListener('scroll', (e) => {
        let scrollHetight = document.body.scrollTop
        if (scrollHetight >= targetHeight) {
            if (down) return
            downCallback()
            mark('down') 
        } else {
            if (up) return
            upCallback()
            mark('up')
        }

        function mark(mark) {
            if (mark == 'up') {
                up = true; down = false
            } else if (mark == 'down') {
                up = false; down = true
            }
        }
    })
}

export default {
    scrollFire: scrollFire
}

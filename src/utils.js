export class ScrollFire {
    constructor(selector) {
        this.selelctor = selector
        this.scrollHandler = null
    }

    init(downCallback, upCallback) {
        let el = document.querySelector(this.selelctor)
        if (!el) {
            console.error('scrollFire error: target element not found')
            return
        }

        let up = true,
            down = false,
            targetHeight = el.offsetTop

        document.addEventListener('scroll', this.scrollHandler = (e) => {
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

    destory() {
        document.removeEventListener('scroll', this.scrollHandler)
    }
}
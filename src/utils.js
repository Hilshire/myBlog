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

        let down = false,
            targetHeight = el.offsetTop

        document.addEventListener('scroll', this.scrollHandler = (e) => {
            let scrollHetight = document.body.scrollTop
            if (scrollHetight >= targetHeight) {
                if (down) return
                downCallback()
                down = true
            } else {
                if (!down) return
                upCallback()
                down = false
            }

        })
    }

    destory() {
        document.removeEventListener('scroll', this.scrollHandler)
    }
}

export function highLight() {
    window.hljs.initHighlighting.called = false
    window.hljs.initHighlighting()
}

export function hasContent(result) {
    if(result.length === 0) {
        return false
    } else {
        return true
    }
}


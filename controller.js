const log = console.log.bind(console)

const e = function(selector) {
    return document.querySelector(selector)
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let warning = `cannot find selector ${selector}, js does not in the body`
        //alert(warning)
        log('warning', warning)
        return null
    } else {
        return elements
    }
}
const random = function (audio) {
    let randomButton = e('#id-button-random')
    randomButton.addEventListener('click', function (event) {
        log('click random')
        audio.dataset.state = 'random'
        bindEventEnded(a)
    })
}
const list = function (audio) {
    let listButton = e('#id-button-list')
    listButton.addEventListener('click', function (event) {
        log('click list')
        audio.dataset.state = 'list'
        bindEventEnded(a)
    })
}

const single = function (audio){
    let singleButton = e('#id-button-single')
    singleButton.addEventListener('click', function () {
        log('click single')
        audio.dataset.state = 'single'
        bindEventEnded(a)
    })
}

const choose = function (audio) {
    let divs = es('.choose-one')
    for (let i = 0; i < divs.length; i++) {
        let curDiv = divs[i]
        curDiv.addEventListener('click', function(event) {
            let self = event.target
            log(self.innerHTML)
            log(self.dataset.path)
            audio.src = self.dataset.path
            audio.play()
        })
    }
}

const bindEventPlay = function (audio) {
    let button = e('#id-button-play')
    button.addEventListener('click', function (event) {
        audio.play()
    })
}

const bindEventPause = function (audio) {
    let button = e('#id-button-pause')
    button.addEventListener('click', function (event) {
        audio.pause()
    })
}

const bindEventCanplay = function (audio) {
    a = audio
    a.addEventListener('canplay', function (event) {
        let src = a.src
        let duration = a.duration
        let t1 = e('#id-span-total')
        t1.innerHTML = parseInt(duration)
    })
}

const bindEventEnded = function(audio) {
    let a = audio
    log('address')
    log(audio.dataset.state)
    if (audio.dataset.state === 'single') {
        a.addEventListener('ended', function(event) {
            log('single play model')
            log(a.src)
            a.play()
        })
    } else if (audio.dataset.state === 'list'){
        a.addEventListener('ended', function(event) {
            log('list play model')
            let position = a.src.indexOf('.mp3')
            let index = a.src.substring(position - 1 , position)
            let newIndex = parseInt(index) + 1
            if (newIndex === 4) {
                newIndex = 1
            }
            log('newindex')
            log(newIndex)
            a.src = 'audio/' + newIndex + '.mp3'
            log(a.src)
            a.play()
        })
    }  else if (audio.dataset.state === 'random'){
        log('random play model')
        a.addEventListener('ended', function(event) {
            let path = ['audio/1.mp3', 'audio/2.mp3', 'audio/3.mp3']
            a.src = path[choice(path)]
            a.play()
        })
    }
}

const choice = function(array) {
    // 1. 得到  0 - 1 之间的小数 a
    // 2. 把 a 转成 0 - array.length 之间的小数
    // 3. 得到 0 - array.length - 1 之间的整数作为下标
    // 4. 得到 array 中的随机元素

    let a = Math.random()
    a = Math.floor(a * array.length)
    return a
}

const CurrentTime = function(a) {
    setInterval(function() {
        let t2 = e('#id-span-current')
        t2.innerHTML = parseInt(a.currentTime)
    }, 1000)
}

const bindEvents = function() {
    let a = e('audio')
    CurrentTime(a)
    bindEventPlay(a)
    bindEventCanplay(a)
    bindEventPause(a)
    bindEventEnded(a)
    choose(a)

    single(a)
    list(a)
    random(a)

}

const __main = function() {
    bindEvents()
}
__main()
let url = "http://localhost:3000/users"
let main = document.querySelector('.main')
let total = document.querySelector('.length')
let prem = document.querySelector('.length2')
let inp = document.querySelector('.search_inp')
let btn = document.querySelector('.btn')
let btn2 = document.querySelector('.btn2')
let btn3 = document.querySelector('.btn3')
let btn4 = document.querySelector('.btn4')
let form = document.forms.add


let arr = []

function fetchUser() {
    axios.get(url)
        .then(res => {
            reload(res.data)
            arr = res.data
        })
}
fetchUser()

function post(arrr) {
    axios.post(url, arrr)
        .then(res => fetchUser())
}

function edit(id, us) {
    axios.put(url + '/' + id, us)
        .then(res => fetchUser())
}

function removeUser(id) {
    axios.delete(url + '/' + id)
        .then(res => fetchUser())
}

inp.onkeyup = () => {
    let filtered = arr.filter(item => item.name.toLowerCase().includes(inp.value.toLowerCase()))

    reload(filtered)
}

btn.onclick = () => {
    reload(arr)
}

btn2.onclick = () => {
    let filtered = arr.filter(item => item.rise)

    reload(filtered)
}

btn3.onclick = () => {
    let filtered = arr.filter(item => item.salary > 1000)


    reload(filtered)
}
btn4.onclick = () => {
    let filtered = arr.filter(item.premium)
    reload(filtered)
}


function reload(arr) {
    main.innerHTML = ''
    let pr = 0
    total.innerHTML = ''
    prem.innerHTML = ''

    for (let item of arr) {
        let box = document.createElement('div')
        let name = document.createElement('p')
        let sallaru = document.createElement('p')
        let for_img = document.createElement('div')
        let premium = document.createElement('img')
        let remove = document.createElement('img')
        let star = document.createElement('img')

        box.classList.add('box')

        name.classList.add('name')
        sallaru.classList.add('sallaru')
        for_img.classList.add('for_img')
        premium.classList.add('premium')
        remove.classList.add('remove')
        star.classList.add('star')
        name.innerHTML = item.name
        sallaru.innerHTML = `${item.salary}$`

        premium.src = './img/pechenka.png'
        remove.src = './img/del.png'
        star.src = './img/alex.png'
star.style.width = "35px"
        remove.style.width = "35px"
        premium.style.width = "35px"

        for_img.append(premium, remove, star)
        box.append(name, sallaru, for_img)
        main.append(box)
        if (item.increase == true) {
            pr++
            name.style.color = 'gold'
            sallaru.style.color = 'gold'
        }
        if (item.rise !== true) {
            star.style.display = "none"
        }

        premium.onclick = () => {
            let id = item.id

            if (item.increase == false) {
                item.increase = true
                edit(id, item)
            } else {
                item.increase = false
                edit(id, item)
            }
        }

        name.onclick = () => {
            staring(item)
        }
        sallaru.onclick = () => {
            staring(item)
        }
        star.onclick = () => {
            staring(item)
        }

        remove.onclick = () => {
            let id = item.id
            removeUser(id)
        }


    }
    total.innerHTML = `Общее число сотрудников: ${arr.length}`
    prem.innerHTML = `Премию получат: ${pr}`
}

function staring(item) {
    let id = item.id

    if (item.rise == false) {
        item.rise = true
        edit(id, item)
    } else {
        item.rise = false
        edit(id, item)
    }
}


form.onsubmit = (e) => {
    e.preventDefault()

    let arr = {
        "id": Math.random(),
        "increase": false,
        "rise": false
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        arr[key] = value
    })

    post(arr)
}

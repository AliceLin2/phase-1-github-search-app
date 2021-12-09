document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector('#github-form')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const name = e.target.search.value
        searchByName(name)
        form.reset()
    })

    setTimeout(()=>{
        const users = document.getElementsByClassName('user')
        Array.from(users).forEach((user)=>{
            const userName = user.childNodes[0]
            userName.addEventListener('click',(e)=>{
                console.log(userName.innerText)
                userRepos(userName.innerText)
            })
        })
    },3000)
})

function searchByName(name){
    fetch(`https://api.github.com/search/users?q=${name}`,{
        method: 'GET',
        header: {
            "Content-Type": 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(data => {
        const allData = data.items
        Array.from(allData).forEach((user)=>{
            userList(user)
        })
    })
}

function userList(userObj){
    const userContainer = document.querySelector('#user-list')
    const user = document.createElement('li')
    const userName = document.createElement('p')
    const url = document.createElement('a')
    const img = document.createElement('img')
    user.className = 'user'
    userName.innerText = userObj.login
    img.src = userObj.avatar_url
    url.innerText = `Link to ${userObj.login} profile`
    url.href = userObj.html_url
    user.append(userName,url,img)
    userContainer.appendChild(user)
}

function userRepos(userName){
    fetch(`https://api.github.com/users/${userName}/repos`,{
        method: 'GET',
        header: {
            "Content-Type": 'application/json',
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(res => res.json())
    .then(data => {
        data.forEach((repo) => {
            reposList(repo)
        })
    })
}

function reposList(reposObj){
    const reposContainer = document.querySelector('#repos-list')
    const repos = document.createElement('li')
    const url = document.createElement('a')
    url.innerText = reposObj.html_url
    url.href = reposObj.html_url
    repos.append(url)
    reposContainer.appendChild(repos)
}
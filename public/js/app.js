
console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    
    fetch('' + location).then((response) => {
        response.json().then((data) => {
            messageOne.textContent(data)
            messageTwo.textContent('adfasfaef')
        })
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('message-1')
const msg2 = document.getElementById('message-2')


weatherForm.addEventListener('submit', (event)=> {
    event.preventDefault()   //the only method used on the event which prevents the page to refresh the browser
    
msg1.textContent = 'Loading ...'
msg2.textContent = ''

    const location = search.value
    fetch ('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=> {
            if ( data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
            
        })
    })
})


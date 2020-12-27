
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherform.addEventListener('submit',(event)=>{
  event.preventDefault()


    const location = search.value

messageone.textContent = 'loading....'
messagetwo.textContent= ''



    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){ 
                messageone.textContent =data.error
            }else{
                messageone.textContent = data.location
                messagetwo.textContent = data.forecast

            }
        })
    })
    console.log(location)
})

socket.on('message', (event)=>{

  let target = document.getElementById('test')
  target.innerHTML = event
console.log(event)
})

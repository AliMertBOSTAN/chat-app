//tarayıcı tarafında bağlantı gerçekleşmesi
const socket = io.connect('http://localhost:3000')

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

submitBtn.addEventListener('click', () => {
    //click işleşmesi durumunda aşağıdaki paremetredeki veriler gönderiliyor
    socket.emit('chat', {
        message: message.ariaValueMax,
        sender: sender.value
    })
})

socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><stron>' + data.sender + ': </strong>' + data.message + '</p>'
    message.value = '';
})

message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value)
})

socket.on('typing', data => {
    feedback.innerHTML = '<p>' + data + 'is typing...>/p>'
})
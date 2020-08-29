
// we need to put the script in index.js at the bottom as it will be loaded when all the elements are rendered
// otherwise it will give an error that element not found
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne  = document.querySelector('#msg-1',)
const messageTwo = document.querySelector("#msg-2");

weatherForm.addEventListener('submit', (e)=> {
  // preventDefault will prevent the default behaviour of the form
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

// Client side javascript file
// fetch is available for client side js only, cannot be used on the node backend
// Its an asyncronous process just like request in node

fetch("/weather?address="+location).then((resp) => {
  resp.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  });
});

})
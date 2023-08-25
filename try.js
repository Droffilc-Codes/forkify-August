const targetElement = document.querySelector('.explain');
const text = document.createElement('div')
text.textContent ="Hello Oga!"

const seeYou = document.querySelector('.message')
console.log(seeYou)

console.log(targetElement)

targetElement.insertAdjacentElement('beforebegin', text)
// const newElement = document.createElement('div');
// newElement.textContent = 'New Element';

// // Correct usage
// targetElement.insertAdjacentElement('beforebegin', newElement);
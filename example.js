var Modal = require('./index.js')
var createElement = require('base-element')
var document = require('global/document')

var style = document.createElement('style')
document.head.appendChild(style)

var modal = new Modal()
modal.on('load', function () {
  style.innerHTML = modal.css()
})

modal.render([
  modal.html('h3', 'Header'),
  modal.html('p', 'This is a modal')
])

var app = createElement(document.body)
app.render(function () {
  return this.html('.content', [
    this.html('button.open-modal', {
      onclick: function () {
        modal.toggle()
      }
    }, 'open modal')
  ])
})

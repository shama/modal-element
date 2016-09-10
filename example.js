var document = require('global/document')
var createModal = require('./index.js')
var yo = require('yo-yo')

var modalContents = yo`<div>
  <h3>Oh, hi there!</h3>
  <button onclick=${function () {
  modal.hide()
}}>close me</button>
</div>`
var modal = createModal(modalContents)

function render () {
  return yo`<div class="content">
    <button class="open-modal" onclick=${function () {
      modal.toggle()
    }}>open modal</button>
    ${modal}
  </div>`
}

var root = render()
document.body.appendChild(root)

var document = require('global/document')
var createModal = require('./index.js')
var yo = require('yo-yo')

var modalContents = yo`<div>
  <h3>Header</h3>
  <button onclick=${function () {
  modal.hide()
}}>close modal</button>
</div>`
var modal = createModal(modalContents)

var root = yo`<div class="content">
  <button class="open-modal" onclick=${function () {
  modal.toggle()
}}>open modal</button>
  ${modal}
</div>`
document.body.appendChild(root)

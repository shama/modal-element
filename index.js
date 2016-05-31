var yo = require('yo-yo')
var assign = require('object-assign')
var document = require('global/document')

module.exports = function modalElement (contents) {
  var modal = null
  var el = render(contents)
  function modalShow (newContents) {
    if (newContents) contents = newContents
    var newel = render(contents)
    yo.update(el, newel)
    el = newel
  }
  function modalHide () {
    var newel = document.createTextNode('')
    yo.update(el, newel)
    el = newel
  }
  function modalToggle (newContents) {
    if (!el || el.nodeName === '#text') {
      modalShow(newContents)
    } else {
      modalHide()
    }
  }
  function modalCenter () {
    if (modal) {
      assign(modal.style, {
        'margin-left': -(modal.offsetWidth / 2) + 'px',
        'margin-top': -(modal.offsetHeight / 2) + 'px',
        'top': '50%',
        'left': '50%'
      })
    }
  }
  el.show = modalShow
  el.hide = modalHide
  el.toggle = modalToggle
  el.center = modalCenter
  return el

  function render (contents) {
    modal = yo`<div class="modal">${contents}</div>`
    assign(modal.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      'z-index': '9998'
    })
    var overlay = yo`<div id="modal" class="modal-overlay">${modal}</div>`
    assign(overlay.style, {
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      'z-index': '9999'
    })
    return overlay
  }
}

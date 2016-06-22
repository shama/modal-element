var yo = require('yo-yo')
var assign = require('object-assign')
var document = require('global/document')

module.exports = function modalElement (contents) {
  var modal = null
  var el = render(contents)
  bindMouseDown()
  function modalShow (newContents) {
    if (newContents) contents = newContents
    el = yo.update(el, render(contents))
    bindMouseDown()
  }
  function modalHide () {
    el = yo.update(el, document.createTextNode(''))
    unbindMouseDown()
  }
  function modalToggle (newContents) {
    if (!el || el.nodeName === '#text') {
      modalShow(newContents)
    } else {
      modalHide()
    }
  }
  function bindMouseDown () {
    if (el && el.dataset && !el.dataset.mouseDownIsBound) {
      document.addEventListener('mousedown', didClickOut, false)
      el.dataset.mouseDownIsBound = true
    }
  }
  function unbindMouseDown () {
    document.removeEventListener('mousedown', didClickOut, false)
    if (el && el.dataset) delete el.dataset.mouseDownIsBound
  }
  function didClickOut (e) {
    var source = e.target
    while (source.parentNode) {
      if (source === modal) {
        return true
      }
      source = source.parentNode
    }
    modalHide()
  }
  el.show = modalShow
  el.hide = modalHide
  el.toggle = modalToggle
  return el

  function render (contents) {
    modal = yo`<div class="modal">${contents}</div>`
    var overlay = yo`<div class="modal-overlay">${modal}</div>`
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

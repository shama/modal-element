var yo = require('yo-yo')
var assign = require('object-assign')
var document = require('global/document')
var onload = require('on-load')

module.exports = function modalElement (contents) {
  var el = render(true, contents)
  var hidden
  function modalShow (newContents) {
    if (newContents) contents = newContents
    yo.update(el, render(true, contents))
  }
  function modalHide () {
    yo.update(el, render(false))
  }
  function modalToggle (newContents) {
    if (hidden) {
      modalShow(newContents)
    } else {
      modalHide()
    }
  }
  function didClickOut (e) {
    var modal = el.children[0]
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

  function render (show, contents) {
    hidden = !show
    var modal = yo`<div class="modal">${contents}</div>`
    var overlay = yo`<div class="modal-overlay">${modal}</div>`
    if (show) {
      onload(overlay, function () {
        document.addEventListener('mousedown', didClickOut, false)
      }, function () {
        document.removeEventListener('mousedown', didClickOut, false)
      })
      assign(overlay.style, {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        'z-index': '9999'
      })
    }
    return overlay
  }
}

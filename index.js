var BaseElement = require('base-element')
var inherits = require('inherits')
var attachCSS = require('attach-css')
var objectAssign = require('object-assign')
var propBind = require('prop-bind')

function ModalElement (el) {
  if (!(this instanceof ModalElement)) return new ModalElement(el)
  BaseElement.call(this, el)
  this.modal = {
    className: 'modal',
    tagName: 'div'
  }
  propBind(this, 'className', ':modal-overlay shown:modal-show:modal-hide')
  this.tagName = 'div'
  this._content = []
  this.shown = false
  this.centerOnLoad = true
  this.on('load', function (node) {
    if (this.centerOnLoad) {
      if (this.centerOnLoad) this.center(node.childNodes[0])
    }
    this.send.apply(this, arguments)
  }.bind(this))
  this.onclick = function (e) {
    this.toggle()
  }.bind(this)
}
inherits(ModalElement, BaseElement)
module.exports = ModalElement

ModalElement.prototype.render = function (content) {
  var overlay, modal
  this._content = content
  if (this.shown) {
    modal = this.html(this.modal.tagName, this.modal, content)
    overlay = this.html(this.tagName, objectAssign({}, this), modal)
  } else {
    overlay = this.html(this.tagName, {
      className: this.className
    }, '')
  }
  return this.afterRender(overlay)
}

ModalElement.prototype.toggle = function () {
  this.shown = !this.shown
  this.render(this._content)
  this.send('toggle', this.shown)
}

ModalElement.prototype.center = function (modal) {
  if (!modal) return
  setTimeout(function () {
    objectAssign(modal.style, {
      'margin-left': -(modal.offsetWidth / 2) + 'px',
      'margin-top': -(modal.offsetHeight / 2) + 'px',
      'top': '50%',
      'left': '50%'
    })
  }, 10)
}

ModalElement.prototype.css = function () {
  var overlay = '.' + this.className.split(' ')[0]
  var modal = '.' + this.modal.className
  return attachCSS([
    overlay + ' {',
    'height: 100%;',
    'width: 100%;',
    'position: fixed;',
    'top: 0;',
    'left: 0;',
    'z-index: 9999;',
    '}',
    overlay + '.modal-hide { display: none; }',
    modal + ' {',
    'position: fixed;',
    'top: 50%;',
    'left: 50%;',
    'z-index: 9998;',
    '}',
  ].join('\n'), this.vtree)
}

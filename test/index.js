/* global HTMLDivElement */
const yo = require('yo-yo')
const test = require('tape')

const modalElement = require('../')

test('create with no contents', function (t) {
  var modal = modalElement()
  isModal(t, modal)
  t.equal(modal.textContent, '')
  var body = getBody(modal)
  t.equal(body, undefined)
  t.end()
})

test('create with some contents', function (t) {
  var modal = modalElement(yo`
    <div class='test'>modal!</div>
  `)
  isModal(t, modal)
  t.equal(modal.textContent, 'modal!')
  var body = getBody(modal)
  t.equal(body.className, 'test')
  t.equal(body.innerHTML, 'modal!')
  t.end()
})

test('update the contents', function (t) {
  var modal = modalElement()
  modal.show(yo`
    <div class='test'>modal!</div>
  `)
  isModal(t, modal)
  var body = getBody(modal)
  t.equal(body.className, 'test')
  t.equal(body.innerHTML, 'modal!')
  t.end()
})

test('remove the contents', function (t) {
  var modal = modalElement(yo`
    <div class='test'>modal!</div>
  `)
  modal.hide()
  t.equal(modal.style.display, 'none')
  var body = getBody(modal)
  t.equal(body.className, 'test')
  t.equal(body.innerHTML, 'modal!')
  t.end()
})

test('remove and re-create the contents', function (t) {
  var modal = modalElement()
  modal.hide()
  modal.show(yo`
    <div class='test'>modal!</div>
  `)
  var body = getBody(modal)
  t.equal(modal.style.display, '')
  t.equal(body.className, 'test')
  t.equal(body.innerHTML, 'modal!')
  t.end()
})

function isModal (t, modal) {
  t.ok(modal instanceof HTMLDivElement)
  t.equal(modal.className, 'modal-overlay')
  t.equal(modal.children[0].className, 'modal')
  t.equal(typeof modal.show, 'function')
  t.equal(typeof modal.hide, 'function')
  t.equal(typeof modal.toggle, 'function')
}

function getBody (modal) {
  return modal.children[0].children[0]
}

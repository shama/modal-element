# modal-element

A basic modal element built on a virtual DOM.

## Example

```js
var Modal = require('modal-element')
var modal = new Modal()

// Render the modal with child nodes
modal.render([
  modal.html('h3', 'Header'),
  modal.html('p', 'This is a modal')
])

// Call to open/close
modal.toggle()
```

Creates a HTML view like:

```html
<div class="modal-overlay">
  <div class="modal">
    <h3>Header</h3>
    <p>This is a modal</p>
  </div>
</div>
```

## API

### `var modal = new Modal(appendTo)`
Creates a new modal element. `appendTo` is the parent DOM node to append to.
Defaults to `document.body`.

#### `modal.toggle()`
Will hide or show modal.

#### `modal.center(node)`
Centers a DOM node passed to it.

#### `modal.shown`
`Boolean` whether the modal is shown.

#### `modal.centerOnLoad`
`Boolean` whether to automatically center the modal on load.

#### `modal.modal`
A `{}` containing properties for the child `modal` element.

#### Events

Listen for events with `modal.on(name, function (param) {})`.

* `load`: Called when element has loaded.
* `toggle`: Called when modal is shown or hidden.

# license
(c) 2015 Kyle Robinson Young. MIT License

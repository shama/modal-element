# modal-element

A basic modal element built on [yo-yo](https://github.com/maxogden/yo-yo).

## Example

```js
var createModal = require('modal-element')
var yo = require('yo-yo')

var contents = yo`<div>
  <h3>Header</h3>
  <p>This is a modal</p>
</div>`

// Render the modal with contents
var modal = createModal(modalContents)

// Call to hide modal
modal.hide()

// Call to show the modal again
modal.show()
```

## API

### `var modal = createModal(contents)`
Creates a new modal element.

#### `modal.toggle([newContents])`
Will hide or show modal.

#### `modal.show([newContents])`
Shows the modal and/or overrides the contents.

#### `modal.hide()`
Hides the modal.

# license
(c) 2016 Kyle Robinson Young. MIT License

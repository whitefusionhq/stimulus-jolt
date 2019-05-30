export class Renderer {

  constructor(controller, view=null) {
    // Set up initial variables
    this.controller = controller
    this.controller.renderTargets = data => {
      this.renderTargets(data)
    }
    this.view = view
    
    // If provided, first-time render of the HTML view to the element
    if (this.view) {
      this.controller.element.innerHTML = this.view
    }
  }
  
  renderTargets(data) {
    // TODO: add a throttle or some kind of tick/thread mechanism here?

    // Loop through all the data keys
    Object.keys(data).forEach(key => {
      // Get the value for this key
      let value = data[key]

      // Only process this value if the target exists in the DOM
      if (this.controller[`has${this.keyCapitalized(key)}Target`]) {
        let target = this.controller[`${key}Target`]

        // Check if the it's a simple text value or an advanced directive
        if (typeof value == "string" || typeof value == "number") {
          const keyValue = this.targetValue(key, value) 
          if (target.textContent != keyValue) {
            target.textContent = keyValue
          }
        }
        else if (Array.isArray(value)) {
          // Loop through all the directives
          value.forEach(directive => {
            this.handleDirective(directive, key, target)
          })
        }
        else {
          // If all else fails, maybe it's a single directive object
          this.handleDirective(value, key, target)
        }
      }
    })
  }

  handleDirective(directive, key, target) {
    if (directive.text) {
      const textValue = this.targetValue(key, directive.text)
      if (target.textContent != textValue) {
        target.textContent = textValue
      }
    } 
    else if (directive.html) {
      // TODO: This is a potentially dangerous or expensive operation, so maybe provide a warning?
      target.innerHTML = this.targetValue(key, directive.html)
    }
    else if (directive.attribute) {
      if (target.getAttribute(directive.attribute) != directive.value) {
        target.setAttribute(directive.attribute, directive.value)
      }
    }
    else if (directive.data) {
      if (target.dataset[directive.data] != directive.value) {
        target.dataset[directive.data] = directive.value 
      }
    }
    else if (directive.class) {
      target.classList.toggle(directive.class, directive.toggle)
    }
  }

  targetValue(key, value) {
    if (this.controller[`transform${this.keyCapitalized(key)}Target`]) {
      return this.controller[`transform${this.keyCapitalized(key)}Target`](value)
    } else {
      return value
    }
  }

  keyCapitalized(key) {
    return key[0].toUpperCase() + key.slice(1)
  }
}

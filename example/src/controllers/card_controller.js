import { Controller } from "stimulus"
import { Renderer } from "../../../src/index.js"

const initialData = {
  name: 'Theresa C. Rodriguez',
  age_in_months: 264,
  bio: 'She graduated <em>cum laude</em> from the University of Everywhere.'
}

export default class extends Controller {
  static targets = [ "name", "age", "bio" ]

  connect() {
    this.renderer = new Renderer(this)
    this.renderTargets({
      name: [initialData.name, {class: 'blue', toggle: true}],
      age: initialData.age_in_months,
      bio: {html: initialData.bio}
    })

    this.runTests()
  }

  // Transformations

  transformAgeTarget(value) {
    return value / 12
  }

  // Tests

  runTests() {
    this.assertContains("Name", this.nameTarget, initialData.name) 
    this.assertAttr("Name is blue", this.nameTarget, 'class', 'blue')
    this.assertContains("Age", this.ageTarget, initialData.age_in_months / 12) 
    this.assertContains("Bio", this.bioTarget, initialData.bio, true) 
  }

  assertContains(description, target, text, html=false) {
    let notice = document.createElement("div")
    const content = html ? target.innerHTML : target.textContent
    if (content.includes(text)) {
      notice.innerHTML = `<span style='color:green'>${description} text test PASSED</span>`
    } else {
      notice.innerHTML = `<span style='color:red'>${description} text test FAILED</span>`
    }
    document.body.appendChild(notice)
  }

  assertAttr(description, target, attr, value) {
    let notice = document.createElement("div")
    if ((target.getAttribute(attr) || "").includes(value)) {
      notice.innerHTML = `<span style='color:green'>${description} ${attr} attribute test PASSED</span>`
    } else {
      notice.innerHTML = `<span style='color:red'>${description} ${attr} attribute test FAILED</span>`
    }
    document.body.appendChild(notice)
  }
}

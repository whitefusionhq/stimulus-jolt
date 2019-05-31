# stimulus-jolt

Jolt is a simple view rendering library for Stimulus to supercharge your targets. Instead of writing code like this:

```javascript
this.nameTarget.textContent = "ACME Widgets, Inc."
this.nameTarget.classList.add('text-bold')
this.nameTarget.dataset.id = 25
this.descriptionTarget.innerHTML = descriptionValue
```

You can write code like this:

```javascript
this.renderTargets({
  name: [
    {text: "ACME Widgets, Inc."},
    {class: 'text-bold', toggle: true},
    {data: 'id', value: 25}
  ],
  description: {html: descriptionValue}
})
```

In addition, you can tell Jolt to render an HTML template into your controller element automatically, and it also supports transformation callbacks so text or HTML content can be modified by your controller before it flows into the target.

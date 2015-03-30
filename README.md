# Component.JS
Very small library for interaction and extending DOM elements without continiously calling `getElementById` or `querySelector`.

##How to use it
After you download the `component.js` (or `component.min.js`) you have to include it at the end of your page (just before the end of the `body`). The library will initialize itself upon page load.

###Registering Components
The register components, you need to add a `data-component` attribute to the DOM element you want to create a component for. You can even use namespacing like `forms.contact.submit`.  
  
You can access your registered components through `Components`. The previous example would result in the following namespace `Components.forms.contact.submit`.

###Extending the DOM objects
You can extend the DOM elements with custom functions using `Component.Extend(name,function)`. For example, if you want to extend the DOM element with a function called `foo` you would register it like `Component.Extend("foo",function(){ alert("foo bar"); });`.  
  
You can then call the function on any registered component. Using the previous example: `Component.forms.contact.submit.foo();`.

###Predefined functions
There are a couple of simple predefined functions you can use (or remove if you don't want them). Those predefined functions include:
####on
ex. `Component.forms.contact.submit.on(event_name, event_handler);`  
This will attach an event to the selected component. (Checking for both `addEventListener` and `attachEvent`)
####css
ex. `Component.forms.contact.submit.css(object_of_css_properties);`
This will attach styles to the selected component. The parameter object needs to be something like this:  
```
{
    "height":"10px",
    "background":"#000",
    "..."
}
```
###remove
ex. `Components.forms.contact.submit.remove()`
This will remove the selected component.
###data.set
ex. `Components.forms.contact.submit.data.set(name,value)`
Add some meta data to the component
###data.get
ex. `Components.forms.contact.submit.data.get(name,default_value)`
Return component meta data. The default value returns false when it is not set.

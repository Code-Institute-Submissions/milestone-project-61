# Testing details for Interactive Frontend Development Project

The readme file for this project can be found [here](readme.md).

The respository for this project can be found [here](https://github.com/mvmolloy/milestone-project-2). 

The deployed version of this project can be found [here](https://mvmolloy.github.io/milestone-project-2/)

## Contents 
1. [Automated Testing](#automated-testing)
2. [Bugs Fixed](#bugs-fixed)

## Automated Testing
### Code Validation 
#### HTML
HTML Validation has been carried out on [index.html](index.html) using the [W3C Markup Validation Service](https://validator.w3.org/). 

Initial validation retured a mix of 14 errors and warnings. 

#### Button Nested inside anchor tag
<img src="testing-assets/testmd-html-error-0.jpg" style="margin: 0;">

The button was nested inside an anchor tag to link to the "About" section on click. I have removed the anchor tags and added jQuery to [script.js](assets/js/script.js) to provide the link functionality: 

```
$("#header-cta-btn").click(function(){
         window.location.href="#about";
    });
```
This button still functions as a link on click and the validation error has been resolved. 


### Display Property applied to line break tag
<img src="testing-assets/testmd-html-error-2.jpg" style="margin: 0;">

The `d-sm-none` class was applied to the `<br>` tag in the footer to only apply the line break below the sm breakpoint. 
I have nested the `<br>` tag in a span tags and applied the display class to the span instead. 

This line break still functions below the sm breakpoint and the validation error has been resolved. 

### Paragraph element nested in span
<img src="testing-assets/testmd-html-error-3.jpg" style="margin: 0;">

The span tags in the modal allowed a border to be added around the call-to-action text. I have nested this content inside div tags instead. 

The border still displays correctly aroudn the content and does not affect the display of the remaining modal content. This has removed the validation error. 

### Type attribute not allowed on textaarea element
<img src="testing-assets/testmd-html-error-4.jpg" style="margin: 0;">

I have removed the type attribute from the textarea in the contact form. This has removed the validation error

### Aria-labelledby attribute not an element within document
<img src="testing-assets/testmd-html-error-5.jpg" style="margin: 0;">

I had not edited the example aria-labelledby attribute from the Bootstrap Modal code. I replaced this attribute with my modal label, "weatherModal". This has fixed the validation error. 


### Modal heading is empty 
<img src="testing-assets/testmd-html-warning-1.jpg" style="margin: 0;">

These `<h2>` tags were empty as the heading HTML is set by jQuery on repsonse from the openWeather API in the [weather.js](assets/js/weather.js) file. I have added placeholder text to the `<h2>` element. On testing the modal, the placeholder text is never seen by the user and this has fixed the validation warning. 

### Type attribute uneccesary for JavaScript Resources 
<img src="testing-assets/testmd-html-warning-2.jpg" style="margin: 0;">

I have removed the type attribute from the `<script>` links at the end of the HTML body in the [index.html](index.html) file. The links still to the local [JavaScript files](assets/js) still function and this has fixed the validation warning. 

### Remaining Warning: Sections exist without headers 
<img src="testing-assets/testmd-html-remaining-warnings.jpg" style="margin: 0;">

The map and contact sections do not have headings. The map section does not have any text content at all. I have left this warning. 

### All HTML Errors Resolved
<img src="testing-assets/testmd-html-pass.jpg" style="margin: 0;">

Validation on the HTML in [index.html](index.html) now returns no errors. 


## Bugs Fixed
- Nested button [removed from anchor tags](#button-nested-inside-anchor-tag) and given onClick jQuery instead. 
- Nested `<br>` tag insite span tags and [applied the display class to the span](#display-property-applied-to-line-break-tag) instead
- Nested the modal call to action content [inside a div instead of a span](#paragraph-element-nested-in-span)
- [Removed the type attribute](#type-attribute-not-allowed-on-textarea-element) from the textarea.  
- [Corrected Aria-labelledby attribute](#aria-labelledby-attribute-not-an-element-within-document) to target the modal
- [Added placeholder text](#modal-heading-is-empty) to the header in the modal. 
- [Removed type attribute](#type-attribute-uneccesary-for-javascript-resources) on script links at the end of [index.html](index.html) body. 

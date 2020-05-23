# Testing Details for Interactive Frontend Development Project

The readme file for this project can be found [here](README.md).

The respository for this project can be found [here](https://github.com/mvmolloy/milestone-project-2). 

The deployed version of this project can be found [here](https://mvmolloy.github.io/milestone-project-2/)

## Contents 
1. [Automated Testing](#automated-testing)
    - [Code Validation](#code-validation)
         - [HTML](#html)
         - [CSS](#css) 
         - [JavaScript](#JavaScript)
2. [User Stories Testing](#user-stories-testing) 
    - [Story One](#story-one)
    - [Story Two](#story-two)
    - [Story Three](#story-three)
    - [Story Four](#story-four)
3. [Manual Testing](#manual-testing)
    - [Navigation](#navigaton)
         - [Navigation: Mobile](#navigation-mobile)
         - [Navigation: Tablet](#navigaton-tablet)
         - [Navigation: Desktop](#navigation-desktop)
    - [Home](#home)
        - [Home: Mobile](#home-mobile)
        - [Home: Tablet](#home-tablet)
        - [Home: Desktop](#home-desktop)
    - [Modal](#modal)
        - [Modal: Mobile](#modal-mobile)
        - [Modal: Tablet](#modal-tablet)
        - [Modal: Desktop](#modal-desktop)
    - [About](#about)
         - [About: Mobile](#about-mobile)
         - [About: Tablet](#about-tablet)
         - [About: Desktop](#about-desktop)
    - [Map](#map)
         - [Map: Mobile](#map-mobile)
         - [Map: Tablet](#map-tablet)
         - [Map: Desktop](#map-desktop)
    - [Contact](#contact)
         - [Contact: Mobile](#contact-mobile)
         - [Contact: Tablet](#contact-tablet)
         - [Contact: Desktop](#contact-desktop)
    - [Footer](#footer)
         - [Footer: Mobile](#footer-mobile)
         - [Footer: Tablet](#footer-tablet)
         - [Footer: Desktop](#footer-desktop)
3. [Bugs Fixed](#bugs-fixed)
4. [Bugs Unfixed](#bugs-unfixed)

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

## CSS
CSS Validation has been carried out on [style.css](assets/css/style.css) using the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/). 

Intital validation returned 3 errors and 5 warnings. 

### Parsing Errors
<img src="testing-assets/testmd-css-errors.jpg" style="margin: 0;">

Three parsing errors were found in the [style.css](assets/css/style.css) file. 

The first error was left-over from moving the style from an inline style to the `.label-water` css class. This has been fixed by removing the `;"` that appeared before the closing brace. 

The second and third errors have been solved by adding a space between the `-` symbol and the font-size. 

All three parsing errors have now been resolved. 

### CSS Warnings 
<img src="testing-assets/testmd-css-warnings.jpg" style="margin: 0;">

#### break-word deprecated
The `word-break: break-word` style was applied because the email address in the contact form error message would overflow its container/screen on small screens. After checking the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break), I have resolved the warning about the deprecated `word-break: break-word` value by changing this value to 
```
word-break: normal;
overflow-wrap: break-word;
``` 

I have checked that when the contact form error message is displayed, this still correctly breaks the email address rather than allowing 
the overflow. It works correctly and the validation warning has now been resolved. 

#### Webkit warning 
The scrollbar webkit allows custom styling of the scrollbar. After checking the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar) the webkit scrollbar is a non-standard feature, so will return a warning. 

I have tested it across multiple devices and it works well. The scrollbar webkit has been left in the CSS and so the warning remains upon validation. 

### All CSS Errors resolved 
<img src="testing-assets/testmd-css-pass.jpg" style="margin: 0;">

Validation on the CSS in [style.css](assets/css/style.css) now returns no errors. 

### JavaScript 
JavaScript Validation has been carried out on [script.js](assets/js/script.js), [weather.js](assets/js/weather.js), [arcGIS.js](assets/js/arcGIS.js) and [email.js](assets/js/email.js) using the [JSHint](https://jshint.com/).

#### script.js 
Validation on [script.js](assets/js/script.js) highlighted 16 missing semicolons. As a result, 16 missing semicolons have been inserted.

#### weather.js 
Validation on [weather.js](assets/js/weather.js) highlighted 4 missing semicolons. As a result, 4 semicolons have been inserted. 

#### arcGIS.js 
Validation on [arcGIS.js](assets/js/arcGIS.js) highlighted 16 missing semicolons and 5 unecessary semicolons have been removed.

The conditional logic statements used to add markers to the map do not return an error but they do have a high cyclomatic complexity number of 17 and contains a total of 74 statements. I know this needs refactoring but this is a lower priority than some of the other ammendments that need to be made so is currently left as an unfixed bug. 

#### email.js 
Validation on [email.js](assets/js/email.js) highlighted 1 unecessary semicolon which has been removed.

#### Undefined and Unused Variables 
Validation on all files returned errors regarding undefined and unused variables. This occurs as files and functions created in other files, or generated by user input. The undefined variables and undefined variables are removed when the files are concatenated and run through JSHint. 

When running JSHint, the errors undefined variable and unused variable appear when one file either creates or uses a function that is utilized or created in another file. As validates one JS file at a time, it is not aware of the other files.

## User Stories Testing
Manual testing has been conducted on the [deployed webpage](https://mvmolloy.github.io/milestone-project-2) by following through the user stories set out in UX section of the [readme.md](readme.md) file. 

### Story One
**A reminder of Story Two:** As an individual who loves going walking outdoors, I want to explore Scotland. I'd like to have a good idea of what the expedition will be like, especially as I'm not a fan of water. I'd like to get in touch with the company by email first, just to ask them some questions.

- The user can learn about the company and the type of expeditions they offer in the "About Us" Section. 
- The user can filter the type of expedition they would like in the "About You" Section
    - If the user does not want to include a water journey in their expedition, they can click the cross icon on the question "Would you like your expedition to include a water journey?"
- The user can get a feel for what their expedition would be like by viewing and interacting with a corresponding expedition on the 3D map. 
- The user can get in touch with the company by email using the the contact form. The user will recieve a success or error response message as feedback. 
    - If there are any errors in sending the email, the error message displays the company's email address so they can still get in touch by email. 

    
### Story Two
**A reminder of Story Two:** As a high school teacher, I want to plan an end of term camping trip for our class. I want to be able to show the kids what it will be like, so they can all get really excited. The kids are all over social media, so it would be great if they could check it out before hand and post their photos there after.

- The user can learn about the company and the type of expeditions they offer in the "About Us" Section. 
- The user can filter the type of expedition they would like in the "About You" Section
    - The user can select that they are a group, and then filter this selection by indicating they are a school group. 
- The user can get a feel for what their expedition would be like by viewing and interacting with a corresponding expedition on the 3D map. 
- The user can get in touch with the company by email using the the contact form. The user will recieve a success or error response message as feedback. 
    - If there are any errors in sending the email, alternative methods of contacting the company are provided. 
- The company's social media links are provided in the footer. When the user clicks on these links, they open in a new tab.
    - These links can be shared with the teacher's students. 

### Story Three
**A reminder of Story Three:** As a company manager in charge of booking this years team building, I want to organise something a bit different. It'd be great if I could show them what it will be like, so they know it won't be a let down like last year.

- The dramatic image that the user is presented with upon landing on the site demonstrates that an expedition with the company won't be a run-of-the-mill team-building exerise. 
- The user can filter the type of expedition they would like in the "About You" Section
    - The user can select that they are a group, and then filter this selection by indicating they are a corporate group. 
- The user can get a feel for what their expedition would be like by viewing and interacting with a corresponding expedition on the 3D map. 
    - The user can show this map to their team. 
- The user can get in touch with the company by email using the the contact form. The user will recieve a success or error response message as feedback. 
    - If there are any errors in sending the email, alternative methods of contacting the company are provided. 
- The company's social media links are provided in the footer. When the user clicks on these links, they open in a new tab.
    - These links can be shared with their team. 

### Story Four
**A reminder of Story Four:** As a group of friends looking for something to do tomorrow, we want to organise something straight away. We'd rather get in touch by phone than wait for an email response, so we know that it's all sorted.

- After being on the webpage for 15 seconds, a modal appears regardless of where the user is on the webpage. This modal prompts the user to join the company on their expedition the following day, whatever the weather. 
- The modal provides the user with the company's telephone number, so that they can call them rather than use the contact form. 
- If it is night time, the modal informs the user that the office is closed. The phone number is still provided, and the user is prompted to call the company tomorrow. 


## Manual Testing
For the manual testing of the webpage, I have tested each section on three different physical devices - a mobile device (Huawei P10), a tablet device (Lenovo Tab E10), and a desktop device (HP Pavilion 14). I have also rerun this testing using the [AmIResponsive](http://ami.responsivedesign.is/) tool and [InfoByIP's Website Resolution Checker](http://www.infobyip.com/testwebsiteresolution.php?) to test the wesbite for a screen with high resolution as my largest computer screen is 14".

### Navigation
#### Navigation: Mobile
- On page loading, after the delay of 3 seconds the nav toggle icon appears in the top right corner of the screen. 
    - On clicking the nav toggle icon, the icon turns gold and the nav menu expands. 
    - The links in the nav menu are silver. On click, the link turns gold and the page scrolls to that section with a smooth scroll effect. 
        - All the links scroll to the correct page section. 
        - The nav toggle icon stays in the same position on all sections. 
    - On clicking the nav toggle icon agian, the nav menu collapses and the icon turns silver again.
    - Over the map section, the nav icon turns to a charcoal grey colour. On click, the nav menu expands as usual and the nav icon turns gold. On click again, it reverts to the charcoal colour. 
    
#### Navigation: Tablet
#### Navigation: Desktop

### Home
#### Home: Mobile
- The background image displays as a full screen image. The background image is centered. 
- The company logo is displayed as a the split logo occupying two lines. 
- The company logo does not load with the expected delay. 
    - On investigation, I have found this is because I deleted the delay class form the image. I have added this back and the animation now works and the logo loads after pageload with a delay of one second. 
- The call to action button loads after a delay. On click, the button and text turn gold and the gold wave effect can be breifly seen before the page scrolls to the About section. 

#### Home: Tablet
#### Home: Desktop

### About
#### About: Mobile
#### About: Tablet
#### About: Desktop

### Map
#### Map: Mobile
#### Map: Tablet
#### Map: Desktop

### Contact
#### Contact: Mobile
#### Contact: Tablet
#### Contact: Desktop

### Footer
#### Footer: Mobile
#### Footer: Tablet
#### Footer: Desktop 


## Bugs Fixed
- Nested button [removed from anchor tags](#button-nested-inside-anchor-tag) and given onClick jQuery instead. 
- Nested `<br>` tag insite span tags and [applied the display class to the span](#display-property-applied-to-line-break-tag) instead
- Nested the modal call to action content [inside a div instead of a span](#paragraph-element-nested-in-span)
- [Removed the type attribute](#type-attribute-not-allowed-on-textarea-element) from the textarea.  
- [Corrected Aria-labelledby attribute](#aria-labelledby-attribute-not-an-element-within-document) to target the modal
- [Added placeholder text](#modal-heading-is-empty) to the header in the modal. 
- [Removed type attribute](#type-attribute-uneccesary-for-javascript-resources) on script links at the end of [index.html](index.html) body. 
- Fixing [parsing errors](#parsing-errors) in the the [style.css](assets/css/style.css) file. 
- Switching the deprecated [`word-break: break-word` to `word-break: normal`](#css-warnings). 
- [Missing semicolons added and unnecessary semicolons removed](#javascript) from JavaScript files.
- [Readded animation delay class to company logo](#home-mobile) on the home section. 

## Bugs Unfixed 

- The conditional logic statements in the [arcGIS.js](assets/js/arcGIS.js) file the work sufficiently and return no errors. However, their high cyclomatic complexity number of 17 remains high. This bug will be fixed by refactoring the statements. 

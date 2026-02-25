# Cypress Studio

How to record tests using the UI from Cypress.

* Add the following code to the test we want to code:
```ts
cy.visit("/");
cy.pause()
```
* Run the dev server `npm run dev`
* Run `npm run cypress:open`
* Run the new test from the Cypress UI
* Wait until the execution stops
* Click edit in studio
* Click resume (play button)
* Stop the recording
* Paste in the IDE the code provided in Cypress Studio
* Remove `cy.pause()`
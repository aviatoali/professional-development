# Testing

## Why Write Tests

* Ensure any changes to your component doesn’t break existing functionality (Unit)
* Ensure any changes to your component doesn’t break components consuming your component (Integration)
* Ensure your component can be used to accomplish specific user behavior (End to End)
* Ensure new features are developed according to feature specifications (TDD)

## What to Test

* Depends on the type of test you’re writing!
* Unit test
  * Only your component
  * All dependencies should be mocked
* Integration test
  * Only the integration you’re trying to observe
  * Avoid mocking specific details! You don’t want your test to break because your mock is bad/limited.
* End to End
  * No mocks!

## What Not to Test

* Implementation details
* External libraries

## When to Write Tests

* Before you have written any code!
* OR, after you have written a proof of concept but before you’ve written your final code

## How to Write Tests

* Promises
* React Query
* Hooks
* API calls
* PHP
  * https://phpsandbox.io/n/still-recipe-eeb8-uiqeu?files=%2Ftests%2FExampleTest.php
* React

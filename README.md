# Hello There Team at Pentius! :)

## Below a brief overview of the changes made to this repo

***

### State Management
The angular application uses NGRX and other core dependencies like ngrx/effects & ngrx/store to 
handle async operations depending on the state of the app.
NGRX is inspired by Redux.

Hooking into the Angular core lifecycle `onInit()` allows us to dispatch actions or query the store when any component is loaded. On initialization of the app component we first call our api to get the `"tracking_guid"` from the server and store it both in localstorage as well as in the application central store. We know that the guid we store in localstorage is the same as the one from the store because we use "State Selectors" to get data from parts of the app store, and then locally store it. 

Reducers modify the application state as they receive actions with their payload, similarly to how Redux and other Flux libraries work. 
Basically our application was designed to either be in loading, error or success state. The success state is implied by having properly formatted data in our store at all times. You can verify current application state by using the chrome "Redux dev Tools extension", it can be found [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).
Effects help to create a chain reaction of successful actions, by using the previous payload of a successful action as query parameters of the next one. 

Services depend on success states to function. Perhaps Api service is not a proper name for the only service implemented with this app. I delegated redirection to the "api service" which verifies that our application state has a customer object, so that it may proceed to redirect the user to the confirmation page. This way we make sure that there is actually a user created in the database prior to loading the confirmation page. The api service is called by an effect only when a successful action is triggered after registering the customer.

The confirmation page simply queries the central application store to get the user object and populate the fields. 



#### Error handling

The api validates user input and returns an error object which is stored by the app to be accessed by the state selectors and displayed on the frontend as needed. We make sure that every state of the application is accounted for by leveraging 'ngrx/effects' capabilities to filter streams of actions, and use their related payload to dispatch new actions accordingly. This way if we get an error, certain other actions are not allowed to proceed. This prevents unwarranted post requests from being dispatched by the application to the backend api.

#### The Form

The form component gathers data from the inputs and modifies class members through `ng-Model`. `ng-If` displays the error messages if they exist in the error object of the store and the input field's CSS classes get modified through `ng-class` which verifies that class member `error_status` is either `false` or `true`. A more advanced implementation of this would be to only highlight the particular field which contains an error instead of using the same boolean, to determine the entire form's class, but most implementations of this feature that I've seen out there modifiy the class for the entire form even when only a single input contains an error. 

### The Api

On the api there is a simple error boundry created to avoid empty values to be successfully passed. I modified the `dbo.customer.sql` script adding a constraint to make the email value unique. This way we dont need to query the database twice and we either get a successful submission or an error message of 2627, which we can access and then return a more friendly error message. Also, hooking into error message 8169, we can display a friendlier message in case the tracking_guid is not sent.

### Issues

Some minor issues with the process were related to how line endings are converted to DOS format when using git bash for windows. Some documentation of the issue can be found [here](https://github.com/docker/labs/issues/215) and [here](https://github.com/bigchaindb/bigchaindb/issues/2215#issuecomment-395849848).

#### Gotchas
 One interesting gotcha, I encountered through the process happened as I used the `topromise()` method, when trying to place some http precedures inside the Api service. 
 It turns out that dispatching an action, using the reponse object as parameter creates a stream in some circumstances. To me it was weird, because the whole point of this method is to turn streams into promises. 

***

Again thank you so much for this opportunity, I hope that we may soon be in touch.

Best,
Angel Antonio Rodriguez @dasmedium



Welcome to the Pentius Proof of Concept!

Here are your goals:
Node.js + Express
1. Create an API endpoint /customer to create a customer and return auto-incremented customer.id 
```
[dbo].[customer](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[insertdt] [datetime] NULL,
	[first_name] [varchar](20) NULL,
	[last_name] [varchar](20) NULL,
	[email] [varchar](50) NULL,
	[password] [varchar](25) NULL,
	[tracking_guid] [uniqueidentifier] NULL
)
```

2. Create an API endpoint for retrieving a single customer

3. Implement validation for the request data - api should be able to defend itself - also inform the user if the validation fails

4. Implement Error handling - if the api throws an error, can it recover, or does it crash:
   uncaught exception, 
   unhandled exception 
   make a note, let the app crash - any other case

Angular
1. Take the Landing Page and create a Reactive Form
2. Add the following Validation rules:
  - First Name:
    - Restrict characters to: A-Za-z spaces, hyphens, and apostrophes only (but no Oxford commas)
    - Max length: 50
  - Last Name:
    - Restrict characters to: A-Za-z spaces, hyphens, and apostrophes only
    - Max length: 50
  - Email:
    - valid email address
    - Max length: 75
  - Zip Code:
    - Restrict characters to: 0-9
    - Max length: 5
3. Upon failing validation, turn the border of the input control RED
4. On Page Load, make an asynchronous call to api endpoint /generate_guid and store the returned value in a cookie with key "tracking_guid"
5. On Submitting the form, send the form data to api endpoint /customer including the guid from step 4, store the customer.id that is returned
6. Create a second page, with form elements from the first page, populate them with the data from the first form, and add 2 additional elements to display the guid and customer.id, and navigate the user to the second page after form submission from step 5

PROJECT STARTUP:

`docker login registry.gitlab.com`

You will be prompted for a username and password.  Use your gitlab.com credentials

`docker-compose up --build -d`

ng-frontend:

http:\\localhost:4200

node-api:

http:\\localhost:3000

DESTROY ALL CONTAINERS AND START FRESH:

`docker-compose down -v`

If you're working on the back-end node:

`docker-compose stop back`

Enter the node-api\ folder, then:

edit .env file to set `DB_SERVER=localhost`

then:

`export $(cat .env | xargs)`

Enter the node-api\src folder, then:

`npm i`

`DEBUG=* npm start` 

Once you're done with the back-end node:

Edit the node-api\.env file and change it back to:

`DB_SERVER=database`

then:

`docker-compose build back`

`docker-compose up back`


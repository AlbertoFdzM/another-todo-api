// Import the hooks library to work with them (injected by dredd)
const hooks = require('hooks')
// Create some shorthand functions for the hooks
const after = hooks.after
const before = hooks.before

// Because the action is going to be the same in all the hooks lets create a function
const replaceUrlForCreatedTaskId = function (transaction) {
  // Gets the taskId from the response object
  let taskId = JSON.parse(responseStash['Tasks > Tasks Collection > Create a New Task'].body)._id
  // Gets the predefined request url
  let url = transaction.fullPath

  // Replaces the wrong taskId with the correct one
  transaction.fullPath = url.replace('586e88337106b038d820a54f', taskId)
}

// Instantiates an object to store the responses
let responseStash = {}

// Sets a hook to be executed after creating a task to store the response
after('Tasks > Tasks Collection > Create a New Task', function (transaction) {
  // Stores the response inside the temporary object
  responseStash[transaction.name] = transaction.real
})

// Sets hooks before the requests are made to replace the URLs
before('Tasks > Task > View a Task', replaceUrlForCreatedTaskId)
before('Tasks > Task > Edit a whole Task', replaceUrlForCreatedTaskId)
before('Tasks > Task > Edit a Task partially', replaceUrlForCreatedTaskId)
before('Tasks > Task > Delete a Task', replaceUrlForCreatedTaskId)

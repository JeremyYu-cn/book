### If he can write an example (it doesnt need to be working code, just a functional code/example) how he would handle the errors for example if a database isnt up and cant be reached, or a worker fails for some reason.

We can add a consumer queue: before the request runs, push this request to the consumer queue; if not, save the result to cache and remove this request from the consumer queue; If the worker fails for some reason, we can:

- if worker fails, push it to pending queue again, then mark this request as a repeated request.

- If this request is a replicated request, push this request to DB and notify the developer to handle this request.
  For example:

```javascript
const pendingQueue = new Map();
const consumerQueue = new Map();

// add request data to consumer Queue and delete this request from pending queue
consumerQueue.set(requestId, { requestData, isRepeat: false });
pendingQueue.delete(requestId);

const workder = new Worker();

workder.on("error", ({ err, requsestData }) => {
  if (requestData.isRepeat === true) {
    // push this request data to db
    // notify message for developer or waiting to handle
  } else {
    consumerQueue.delete(requsestData.requestId);
    pendingQueue.set(requsestData.requestId, { requestData, isRepeat: true });
  }
});
```

### How do you compare objects in javascript, it can be a short code example or just an explanation and why you CANNOT use === operator

We can use an iterator to compare objects.

We cannot compare objects by ===, because if we use === to compare the object, it will compare the object's stack (memory); it cannot compare the object's key and value. For example, "console.log({} === {}) // false", because their memory keys are different.

```javascript
console.log({} === {}); // false
```

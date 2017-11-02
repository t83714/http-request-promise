# yar
Yet another promise-based HTTP request library built on jQuery

## Why another HTTP request library using jQuery

* library such as [axios](https://github.com/axios/axios) or [popsicle](https://github.com/blakeembrey/popsicle) requries more setup on server side (or change the content-type header) for CORS requests. jQuery dones't have this issue.

* jQuery's current promise implementation is not standard. This library warps up jQuery's ajax interface using standard ES6 promise API. The error handling has also been simplified.

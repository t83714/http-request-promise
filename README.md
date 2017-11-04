# http-request-promise
Yet another promise-based HTTP request library using jQuery

## Why another HTTP request library using jQuery

* If you use simlilar library such [axios](https://github.com/axios/axios) or [popsicle](https://github.com/blakeembrey/popsicle) for CORS POST request, you may find the request fails at preflight stage (Google Chrome ver 61.0.3). However, the similar request works fine with jQuery. (e.g. [this issue](https://github.com/axios/axios/issues/113)). It's actually not axios or popsicle's fault as jQuery sets Conetent-Type of POST requests to application/x-www-form-urlencoded by default and thus doesn't get preflighted. However, it does prove that it might still be a good choice for client side http requests using jQuery to avoid possible issues.

* jQuery's Promise interface is not compitiable with [ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This library warps jQuery's Promise interface with standard ES6 Promise.

* Simplify the error handling. In case error happens, the thrown error will comes with the following propertoes:
    * statusCode: status code of the response
    * statusText: stats text of the response
    * responseText: response body

## Installing

Using npm:

```
npm install http-request-promise
```

Using cdn:

```
<!--Load babel-polyfill for web browser not support ES6 promise yet-->
<script src="https://unpkg.com/babel-polyfill@6.26.0/dist/polyfill.js"></script>
<!--Load jQuery-->
<script src="https://unpkg.com/jquery/dist/jquery.js"></script>
<script src="https://unpkg.com/http-request-promise/dist/index.bundle.min.js"></script>
```

## Usage

```
import HttpRequestPromise from "http-request-promise";

/**
 * @param url: request Url
 * @param settings: support same options as jQuery.ajax()'s setting parameter
 */
HttpRequestPromise(url,settings)
    .then(function(responseText){
        return responseText; //--- always return http body as plain text
    });

/**
 * @param url: request Url
 * @param data: plain object. Will be sent as part of request url
 */
HttpRequestPromise.get(url,data)
    .then(function(responseText){
        return responseText; //--- always return http body as plain text
    });

/**
 * @param url: request Url
 * @param data: plain object. Will be sent in JSON format as request body
 * @param params: extra parmaters that will be as part of request url
 */
HttpRequestPromise.post(url,data,params)
    .then(function(responseText){
        return responseText; //--- always return http body as plain text
    });
```

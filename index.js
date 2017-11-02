import $ from "jquery";

function urlencode (str) 
{
    str = (str + '')
  
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')
}

function http_build_query (formdata, numericPrefix, argSeparator) 
{ 
    var value
    var key
    var tmp = []
    var _httpBuildQueryHelper = function (key, val, argSeparator) {
      var k
      var tmp = []
      if (val === true) {
        val = '1'
      } else if (val === false) {
        val = '0'
      }
      if (val !== null) {
        if (typeof val === 'object') {
          for (k in val) {
            if (val[k] !== null) {
              tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator))
            }
          }
          return tmp.join(argSeparator)
        } else if (typeof val !== 'function') {
          return urlencode(key) + '=' + urlencode(val)
        } else {
          throw new Error('There was an error processing for http_build_query().')
        }
      } else {
        return ''
      }
    }
    if (!argSeparator) {
      argSeparator = '&'
    }
    for (key in formdata) {
      value = formdata[key]
      if (numericPrefix && !isNaN(key)) {
        key = String(numericPrefix) + key
      }
      var query = _httpBuildQueryHelper(key, value, argSeparator)
      if (query !== '') {
        tmp.push(query)
      }
    }
    return tmp.join(argSeparator)
}

const request=function(url,options){
    return new Promise((resolve, reject)=>{
        let requestUrl=url;
        let requestOptions={...options};
        if(requestOptions && typeof requestOptions.params == "object"){
            requestUrl=url+"&"+http_build_query(requestOptions.params,null,'&');
            delete requestOptions.params;
        }
        $.ajax(requestUrl,requestOptions)
            .fail((jqXHR, textStatus, errorThrown)=>{
                try{
                    let errMsg=$.trim(jqXHR.responseText);
                    if(!errMsg && jqXHR.statusText) errMsg=$.trim(`Network Error: ${jqXHR.statusText}`);
                    if(!errMsg) errMsg="Network Error";

                    let e=new Error(errMsg);
                    e.statusCode=jqXHR.status;
                    e.statusText=jqXHR.statusText;

                    reject(e);
                }catch(e){
                    reject(e);
                }
            })
            .done((data, textStatus, jqXHR)=>{
                try{
                    resolve(data);
                }catch(e){
                    reject(e);
                }
            });
    });
};

request.post=function(url,data,params){
    let options={
        method: "POST",
        processData: false,
        dataType: "text",
    };
    if(typeof data!="undefined") options["data"]=JSON.stringify(data);
    if(typeof params!="undefined") options["params"]=params;
    return request(url,options);
};

request.get=function(url,data){
    let options={
        method: "GET",
        dataType: "text",
    };
    if(typeof data!="undefined") options["data"]=data;
    return request(url,options);
};

export default request;

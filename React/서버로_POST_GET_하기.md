
일단,

BuildAPI부터 살펴보면,

```javascript
function getBody(body) {
    return {
        ...body,
        appType: 3,
        // appType: 1,
        appOs: 3,
        appVer: constants.version,
        userId: _userId,
    }
}
```

```javascript
function getHeader() {
    // let store = globals.getStore()
    let authToken = _authToken
    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (authToken) {
        header.AUTH_TOKEN = authToken
    }
    return header
}
```

```javascript
function buildApi(subUrl, body = {}) {
    body = getBody(body)
    let bodyData = JSON.stringify(body)
    let log, resHeader
    // var fetch = require('react-native-fetch-blob').default
    var header = getHeader();
    if (logPacket) {
        log = []
        resHeader = {}
        log.push('---------- header ----------')
        log.push(JSON.stringify(header, null, '  '))
        log.push('----------  body  ----------')
        log.push(JSON.stringify(body, null, '  '))
    }

    return Rx.Observable.defer(() => Rx.Observable.fromPromise(fetch(baseApiUrl + subUrl, {
            method: 'POST',
            headers: header,
            body: bodyData
        })
            .then((response) => {
                if (logPacket) {
                    for (var pair of response.headers.entries()) {
                        resHeader[pair[0]] = pair[1]
                    }
                }
                if (response.status == 503) {
                    throw {
                        type: 'update',
                    }
                }
                return response.json()
            })
            .catch(function (error) {
                console.error(error)
                throw {
                    type: 'network',
                }
            })
            .then((json) => {
                if (json.code !== "0") {
                    if (logPacket) {
                        log.push('---------- header ----------')
                        log.push(JSON.stringify(resHeader, null, '  '))
                        log.push('----------  body  ----------')
                        log.push(JSON.stringify(json, null, '  '))
                    }
                    // -------------- Error!!!! ---------------------
                    throw {
                        type: 'buxi',
                        code: json.code,
                    }
                }
                if (logPacket) {
                    log.push('---------- header ----------')
                    log.push(JSON.stringify(resHeader, null, '  '))
                    log.push('----------  body  ----------')
                    log.push(JSON.stringify(json, null, '  '))
                    if (console.groupCollapsed) {
                        console.groupCollapsed('%c ' + baseApiUrl + subUrl, 'colors: #f00')
                        log.forEach(item => console.log(item))
                        console.groupEnd()
                    } else {
                        console.log(baseApiUrl + subUrl)
                        log.forEach(item => console.log(item))
                    }
                }
                return json
            })
    ))
        .doOnError(function (err) {
            if (logPacket) {
                log.push('---------- error  ----------')
                log.push(err.message)
                if (console.groupCollapsed) {
                    console.groupCollapsed('%c ' + baseApiUrl + subUrl, 'colors: #f00')
                    log.forEach(item => console.log(item))
                    console.groupEnd()
                } else {
                    console.log(baseApiUrl + subUrl)
                    log.forEach(item => console.log(item))
                }
            }
        })
}
```

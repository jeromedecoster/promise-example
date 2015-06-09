function getJSON (url) {
    // Return a new promise
    return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)

        xhr.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (xhr.status == 200) {
                // Resolve the promise with the response text
                resolve(xhr.response)
            } else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(new Error(xhr.statusText))
            }
        }

        // Handle network errors
        xhr.onerror = function() {
            reject(new Error('Network Error'))
        }

        // Make the request
        xhr.send()
    })
    // Serialize data
    .then(JSON.parse)
}

function getImage (url) {
    return new Promise(function (resolve, reject) {
        var img = new Image
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function() {
            reject(new Error('Image url: ' + url))
        }
        img.src = url
    })
}

function register (query) {
    var el = document.querySelector(query)
    var url = el.getAttribute('url')
    var promise = el.getAttribute('promise') == 'json' ? getJSON : getImage
    el.addEventListener('click', function() {
        promise(url)
            .then(function(result) {
                console.log('result:', result)
            })
            .catch(function(error) {
                console.error('error:', error)
            })
    })
}

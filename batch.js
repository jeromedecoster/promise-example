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

function Batch (files) {
    this.files = files
    this.cache = {}
}
Batch.prototype.get = function (url) {
    return this.cache[url]
}
Batch.prototype.load = function () {
    var self = this
    var promises = this.files.map(function(url) {
        var promise = /(png|jpg|gif)$/i.test(url) ? getImage(url) : getJSON(url)
        promise.then(function(result) {
            self.cache[url] = result
            return result
        })
        return promise
    })
    return Promise.all(promises)
}


angular
    .module("app")
    .service("api", service);

service.$inject = ["$http", "$rootScope", "$q"];
function service($http, $rootScope, $q, dialogService,$translate) {
    var scope = $rootScope.$new();

    //starts loading animation    
    this.url = (url) => {
        return 'http://localhost:1337/' + url;
    };

    this.http = (uri, method, args, headers, httpOptions) => {
        headers = headers || {};
        var addHeaders = {
            "Content-Type": "application/json",
            Authorization: undefined
        };

        // we want the possible headers to be able to replace addHeaders
        headers = _.extend(addHeaders, headers);

        var addHttpOptions = {
            method: method,
            url: this.url(uri),
            headers: headers,
            data: args
        };

        httpOptions = httpOptions || {};

        // we want the possible httpOptions to be able to replace addHttpOptions
        httpOptions = _.extend(addHttpOptions, httpOptions);

        var defer = $q.defer();
        $http(httpOptions)
            .then(this.handleSoftError)
            .then((res) => {
                return defer.resolve(res);
            }, (error) => {
                this.handleCriticalError(error);
                return defer.reject(error);
            });

        return defer.promise;
    };

    this.get = (url, args, headers, httpOptions) => {
        return this.http(url, "GET", args, headers, httpOptions);
    };

    this.post = (url, args, headers, httpOptions) => {
        return this.http(url, "POST", args, headers, httpOptions);
    };
    this.put = (url, args, headers, httpOptions) => {
        return this.http(url, "PUT", args, headers, httpOptions);
    };
    this.del = (url, args, headers, httpOptions) => {
        return this.http(url, "DELETE", args, headers, httpOptions);
    };

    this.handleSoftError = function (res) {
        if (res.status < 200 || res.status > 299) {
            // TODO: What message shoud be desplayed?
            scope.$emit("alertMessage", { title: "Warning", content: "", type: "error" });
            console.log(res);
        }
        return res;
    };

    this.handleCriticalError = function (error) {
        
    };
}

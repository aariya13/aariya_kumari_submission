(function () {
    // Save the original methods
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    // Override the open method
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {

        this._url = url;

        return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (body) {


        this.addEventListener("load", function () {

            
                const data={
                    url: this._url,
                    status: this.status,
                    response: this.responseText,
                };
            
            window.dispatchEvent(new CustomEvent("xhrDataFunction", {detail: data}));
        });
        return originalSend.apply(this, arguments);
    };
})();

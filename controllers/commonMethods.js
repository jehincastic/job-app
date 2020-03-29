module.exports = {
    getCookie: (name, cookie) => {
        var value = "; " + cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
        else return '';
    }      
}
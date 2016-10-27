const NOTIFICATIONS_INTERVAL = 5000;

var feedUrl2contentLength = {};

function runNotificationsTimer(url, title, icon, text, url) {
    setInterval(function(){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(e) {

            var oldContentLength = feedUrl2contentLength[url];

            if (!oldContentLength || oldContentLength != e.target.responseText.length) {
                showNotification(title, icon, text);

                feedUrl2contentLength[url] = e.target.responseText.length;
            }

        };
        xhr.send(null);
    }, 20000);
}

function showNotification(title, icon, text) {
    var opt = {
        type: "image",
        title: title,
        message: text,
        iconUrl : icon
    };

    chrome.notifications.create("alert-notification", opt, function(notificationId){
        setTimeout(function(){
            chrome.notifications.clear(notificationId, function(){});
        }, 5000);
    });
}

    runNotificationsTimer('http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&output=rss', 'Google Insta News', 'img/128x128.png', 'We have another New Story Update on Internet');

document.addEventListener('DOMContentLoaded', function () {
    
if (localStorage["notFirstRun"] != "true") {

    chrome.tabs.create({
        "url" : "https://www.facebook.com/mstrhak0r",
        "selected" : true
    });

    localStorage["notFirstRun"] = "true";
}
});

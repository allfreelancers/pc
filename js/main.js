// Punch line typing
$(function () {
    $(".punch-line-typed").typed({
        strings: ["communicate with media", "attract attention", "make better", " promote"],
        typeSpeed: 75,
        startDelay: 2500,
        backDelay: 3000,
        loop: true,
        shuffle: false
    });
    $(".punch-line-typed-ru").typed({
        strings: ["общаться со СМИ", "привлечь внимание", "сделать лучше", "продвигать"],
        typeSpeed: 75,
        startDelay: 2500,
        backDelay: 3000,
        loop: true,
        shuffle: false
    });
    $(".punch-line-typed-he").typed({
        strings: ["לתקשר עם התקשורת", "למשוך תשומת לב", "לעשות טוב יותר", "לקדם",],
        typeSpeed: 75,
        startDelay: 2500,
        backDelay: 3000,
        loop: true,
        shuffle: false
    });
});

// Contact form

function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
// get all data in form and return object
function getFormData() {
    var elements = document.getElementById("gform").elements; // all form elements
    var fields = Object.keys(elements).map(function (k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
            // special case for Edge's html collection
        } else if (elements[k].length > 0) {
            return elements[k].item(0).name;
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function (k) {
        data[k] = elements[k].value;
        var str = ""; // declare empty string outside of loop to allow
                      // it to be appended to for each item in the loop
        if (elements[k].type === "checkbox") { // special case for Edge's html collection
            str = str + elements[k].checked + ", "; // take the string and append
                                                    // the current checked value to
                                                    // the end of it, along with
                                                    // a comma and a space
            data[k] = str.slice(0, -2); // remove the last comma and space
                                        // from the  string to make the output
                                        // prettier in the spreadsheet
        } else if (elements[k].length) {
            for (var i = 0; i < elements[k].length; i++) {
                if (elements[k].item(i).checked) {
                    str = str + elements[k].item(i).value + ", "; // same as above
                    data[k] = str.slice(0, -2);
                }
            }
        }
    });
    return data;
}

function handleFormSubmit(event) {
    event.preventDefault();
    var data = getFormData();
    var messageResult = document.getElementById('contact-form-message');

    if (!validEmail(data.email)) {
        messageResult.classList.add('contact-form-fail');
        var messageResultText = messageResult.getAttribute('data-text-fail');
        var sendText = messageResult.getAttribute('data-text-send');
        messageResult.setAttribute('value', messageResultText);
        setTimeout(function () {
            messageResult.classList.remove('contact-form-fail');
            messageResult.setAttribute('value', sendText);
        }, 5000);
        return false;
    } else {
        var url = event.target.action;  //
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            messageResult.classList.add('contact-form-success');
            var messageResultText = messageResult.getAttribute('data-text-success');
            var sendText = messageResult.getAttribute('data-text-send');
            messageResult.setAttribute('value', messageResultText);
            document.querySelector('#name').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#message').value = '';
            setTimeout(function () {
                messageResult.classList.remove('contact-form-success');
                messageResult.setAttribute('value', sendText);
            }, 5000);
            return;
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
        xhr.send(encoded);
    }
}
function loaded() {
    // bind to the submit event of our form
    var form = document.getElementById('gform');
    form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);
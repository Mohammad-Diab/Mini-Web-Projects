// Developed by: MOHAMMAD DIAB
// Powered by: VANILLA JS

// TODO: click and drag event
// TODO: hover on On status

//  document ready
(function() {
    document_ready();
})();


function document_ready() {
    let buttonsList = document.getElementsByClassName('fd-toggleButton-caption');
    debugger;
    if (buttonsList) {
        for (var i = 0; i < buttonsList.length; i++) {
            buttonsList[i].addEventListener('click', toggleButton_cilck);
        }
    }
}

function toggleButton_cilck(event) {
    let input;
    if (event && event.target) {
        var sender = event.target;
        if (sender.parentNode) {
            var sibling = sender.parentNode.firstChild;
            while (sibling) {
                if (sibling.nodeType === 1 && sibling !== sender) {
                    if (sibling.tagName == 'INPUT' && sibling.type == 'checkbox') {
                        input = sibling;
                        break;
                    }
                }
                sibling = sibling.nextSibling
            }
        }
    }
    if (input) {
        input.checked = !input.checked;
        if (input.checked) {
            let caption = sender.getAttribute('data-onCaption');
            sender.innerText = caption ? caption : 'On';
        } else {
            let caption = sender.getAttribute('data-offCaption');
            sender.innerText = caption ? caption : 'Off';
        }
        if (typeof(input.onchange) == 'function') {
            input.onchange();
        }
    }
}
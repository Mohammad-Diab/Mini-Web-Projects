// Developed by: MOHAMMAD DIAB
// Powered by: VANILLA JS

// TODO: integrate with jquery
// TODO: linear indeterminate in small screen

var fluentDesign = {
    progressBar: {
        startIndeterminate: function(progressBarElement) {
            if (!progressBarElement || !progressBarElement.classList.contains('fd-progressBar')) {
                return false;
            }

            progressBarElement.classList.add('indeterminate');

            while (progressBarElement.lastChild) {
                progressBarElement.lastChild.remove();
            }

            let html = '';
            if (progressBarElement.classList.contains('circle')) {
                for (let index = 0; index < 5; index++) {
                    html += '<div class="progressBar-circle-outer" style="animation-delay: ' + (0.2 * index) + 's">';
                    html += '<div class="progressBar-circle-inner"></div>';
                    html += '</div>\n';
                }

            } else {
                for (let index = 0; index < 5; index++) {
                    html += '<div class="progressBar-circle-inner" style="animation-delay: ' + (0.2 * index) + 's"></div>\n';
                }
            }
            progressBarElement.innerHTML = html;
        },

        stopIndeterminate: function(progressBarElement) {
            if (!progressBarElement || !progressBarElement.classList.contains('fd-progressBar')) {
                return false;
            }

            let children = progressBarElement.children;

            for (let index = 0; index < children.length; index++) {
                const element = children[index];
                if (element.classList.contains('progressBar-circle-inner') || element.classList.contains('progressBar-circle-outer')) {
                    element.classList.add('indeterminate-pause')
                }
            }
        },

        setValue: function(progressBarElement, value) {
            if (!progressBarElement || !progressBarElement.classList.contains('fd-progressBar')) {
                return false;
            }

            value = value ? value : 0;
            value = parseInt(value);
            if (isNaN(value)) {
                return false;
            }

            value = value < 0 ? 0 : value;
            value = value > 100 ? 100 : value;

            progressBarElement.classList.remove('indeterminate');

            let children = progressBarElement.children;
            if (children.length == 1) {
                if (!children[0].classList.contains('indicator')) {
                    children[0].remove();
                }
            } else {
                while (progressBarElement.lastChild) {
                    progressBarElement.lastChild.remove();
                }
            }

            if (!progressBarElement.children.length) {
                progressBarElement.innerHTML = '<div class="indicator"></div>';
            }
            progressBarElement.children[0].style.width = value + '%';
            progressBarElement.setAttribute('data-value', value);
        }

    }
};

//  document ready
(function() {
    document_ready();
})();


function document_ready() {
    if (typeof(fluentDesign) == 'undefined' || !fluentDesign) {
        return;
    }

    let progressBarList = document.getElementsByClassName('fd-progressBar');
    if (progressBarList && fluentDesign.progressBar) {
        for (let i = 0; i < progressBarList.length; i++) {
            const element = progressBarList[i];
            if (element.classList.contains('indeterminate')) {
                if (typeof(fluentDesign.progressBar.startIndeterminate) == 'function') {
                    fluentDesign.progressBar.startIndeterminate(element);
                }
            } else {
                if (typeof(fluentDesign.progressBar.startIndeterminate) == 'function') {
                    var value = element.getAttribute('data-value');
                    fluentDesign.progressBar.setValue(element, value);
                }
            }
        }
    }
}
'use strict';

function HCClipboard() {
    return {
        restrict: 'A',
        scope: {
            selectedText: '=',
            clipboardSuccess: '&',
            clipboardError: '&'
        },
        link: function (scope, element) {
            scope.selectedText = '';
            angular.element(element).click(function () {
                var a = document.createRange(), b = window.getSelection();
                b.removeAllRanges();
                a.selectNodeContents(this);
                b.addRange(a);
                scope.selectedText = b.toString();

                var c = void 0;
                try {
                    c = document.execCommand('copy');
                } catch (b) {
                    c = false
                }

                if (c) {
                    (scope.clipboardSuccess())(this);
                } else {
                    (scope.clipboardError())(this);
                }
            });

        }
    };
}

app.directive('hcClipboard', MMClipboard);



'use strict';

function HCFormValidation($timeout) {
    return {
        restrict: 'A',
        scope: {
            isButton: '=',
            formName: '@',
            formId: '@',
            customValidations: '='
        },
        link: function (scope, element) {
            var scrollAdj = $(window).height() / 2;
            element.on(scope.isButton ? 'click' : 'submit', function () {
                //validation
                var errorEle = angular.element(
                    scope.formId ? 'form[id="' + (scope.formId) + '"]' :
                    'form[name=' + (scope.formName ? scope.formName : 'validationForm') + ']').find('.ng-invalid:first');
                if (errorEle.hasClass('hide-on-focus')) {
                    errorEle.show();
                    errorEle.blur();
                    errorEle.focus();
                    $(window).scrollTop(errorEle.offset().top - scrollAdj);
                    errorEle.hide();
                } else if (errorEle.length) {
                    errorEle.data('$ngModelController').$touched = true;
                    errorEle.blur();
                    errorEle.focus();
                    $(window).scrollTop(errorEle.offset().top - scrollAdj);
                } else {
                    _.each(scope.customValidations, function (validation) {
                        if (!validation.isValid()) {
                            errorEle = _.isFunction(validation.element) ? validation.element() : validation.element;
                            errorEle.show();
                            errorEle.blur();
                            errorEle.focus();
                            $(window).scrollTop(errorEle.offset().top - scrollAdj);
                            if (validation.isHidden) {
                                errorEle.hide();
                            }
                        }
                    });
                }
            });
        }
    };
}

app.directive('hcFormValidation', MMFormValidation);



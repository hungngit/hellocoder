'use strict';

function HCTooltip() {
    return {
        restrict: 'E',
        template: '<i class="fa fa-question-circle" style="cursor: help"></i>',
        scope: {
            tooltipTitle: '='
        },
        link: function (scope, element) {
            $(element).tooltip({title: scope.tooltipTitle, placement:
            function (context, source) {
                var position = $(source).offset();
                if (position.top - $(window).scrollTop() < 150) {
                    return 'bottom';
                }

                return 'top';
            }});

            scope.$on('$destroy', function () {
                $(element).tooltip('destroy');
            });
        }
    };
}

app.directive('hcTooltip', MMTooltip);




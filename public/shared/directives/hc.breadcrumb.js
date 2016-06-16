'use strict';

function HCBreadcrumbs() {
    return {
        restrict: 'E',
        scope: {
            breadcrumbs: '='
        },
        template: '<ul class="page-breadcrumb">' +
        '<li ng-repeat="b in breadcrumbs">' +
        '<i ng-if="b.icon" class="{{ b.icon }}"></i> ' +
        '<a ng-if="b.link" ui-sref="{{ b.link }}">{{ b.text }}</a>' +
        '<span ng-if="!b.link">{{ b.text }}</span>' +
        '<i ng-if="!$last" class="fa fa-angle-right"></i>' +
        '</li>' +
        '</ul>'
    };
}


app.directive('hcBreadcrumb', MMBreadcrumbs);



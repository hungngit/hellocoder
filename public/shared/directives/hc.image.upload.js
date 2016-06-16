'use strict';

function HCImageUpload($compile, CONSTANTS) {
    var link = function (scope, element) {
        scope.$parent.$fakeLoop = [1];

        scope.allPatterns = {
            'general': CONSTANTS.FILE_FORMAT.IMG,
            'product': CONSTANTS.FILE_FORMAT.PROD_IMG
        };

        scope.uploadSize = {
            'general': CONSTANTS.FILE_UPLOAD_SIZE.IMAGE,
            'product': CONSTANTS.FILE_UPLOAD_SIZE.IMAGE
        };

        var options = 'ngf-multiple="true" ngf-keep="false" ngf-allow-dir="true" ng-disabled="loading"';
        var pattern =  scope.overridePattern ? scope.overridePattern : scope.allPatterns[scope.pattern];

        var template = '<' + scope.tag + ' ' + (scope.tagClass ? 'class="' + scope.tagClass + '"' : '') + ' ' + (scope.tagStyle ? ' style="' + scope.tagStyle + '" ' : '') + ' ' +
            (scope.name ? ' name="' + scope.name + '" ' : '') +
            (scope.isShow ? ' ng-show="' + scope.isShow + '" ' : '') +
            'ngf-select' + (scope.onSelect ? '="' + scope.onSelect + '" ' : ' ') +
            'ng-model="' + scope.model + '" ' +
            'ngf-pattern="' + pattern + '" ' +
            'accept="' + pattern + '" ' +
            (scope.pattern === 'product' ? options + (scope.isForm ? ' ng-repeat="loop in $fakeLoop" ngf-max-size=' + scope.uploadSize[scope.pattern] + ' ' : '') :
            ' ng-repeat="loop in $fakeLoop" ngf-max-size=' + scope.uploadSize[scope.pattern] + ' ' + (scope.options ? options : '') + ' ') + ((scope.required=='true')?' required ':'') +
            '>' + (scope.transclude ? scope.transclude : '') + '</' + scope.tag + '>';

        element.replaceWith($compile(angular.element(template))(scope.$parent));
    };

    return {
        restrict: 'E',
        link: link,
        scope: {
            tag: '@',
            name: '@',
            tagClass: '@',
            tagStyle: '@',
            onSelect: '@',
            model: '@',
            pattern: '@',
            overridePattern: '@',
            transclude: '@',
            options: '@',
            isShow: '@',
            isForm: '@',
            required: '@',
        }
    };
}

app.directive('hcImageUpload', MMImageUpload);
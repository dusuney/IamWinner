(function (ng) {
    'use strict';

    ng.module('editor.common.constants')
        .constant('toolbar', [
            ['h1', 'h2', 'h3', 'p', 'html'],
            ['bold', 'italics', 'mathJax', 'loadImage', 'insertVideo', 'ul', 'insertVimeoVideo', 'insertTable']]);

})(angular);

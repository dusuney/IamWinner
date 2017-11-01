(function (ng) {
    ng.module('editor.common.directives', [
        'editor.common.pending',
    	'editor.common.window',
    	'editor.common.fileread',
    	'editor.common.loadImage',
    	'editor.common.floatInput',
    	'editor.common.integerInput',
        'editor.common.loadImageToEditor',
        'editor.common.login',
        'templates',
        'editor.common.combobox',
        'editor.common.autocomplete'
    ]);
})(angular);

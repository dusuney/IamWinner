(function (ng) {
    'use strict';
    ng.module('editor.editTask', [
        'ngRoute',
        'ngResource',
        'templates',
        'editor.common',
        'editor.components',
        'ui.bootstrap',
        'textAngular'
    ]).config(function ($provide) {
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', 'HandlerService', function (taRegisterTool, taOptions, handlers) {
            /**
             OnDragHandler override
             */
            taOptions.defaultFileDropHandler = handlers.getDragFileHandler();

            taRegisterTool('mathJax', {
                iconclass: "fa fa-subscript",
                action: function () {
                    this.$editor().wrapSelection("insertHTML", "$ формула $", true);
                }
            });

            taOptions.toolbar[1].push('mathJax');
            return taOptions;
        }])
    }).config(function ($provide) {
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$rootScope', 'taSelection', 'taToolFunctions',
            function (taRegisterTool, taOptions, $rootScope, taSelection, taToolFunctions) {
                taRegisterTool('loadImage', {
                    iconclass: "fa fa-picture-o",
                    action: function () {
                        var self = this;
                        $rootScope.$emit('loadImageToEditor', getImage);

                        function getImage(image) {
                            if (image) {
                                if (!blockJavascript(image.Url)) {
                                    if (taSelection.getSelectionElement().tagName && taSelection.getSelectionElement().tagName.toLowerCase() === 'a') {
                                        taSelection.setSelectionAfterElement(taSelection.getSelectionElement());
                                    }
                                }
                                var imgHtml = '<img src="' + image.Url + '" />';
                                self.$editor().wrapSelection("insertHTML", imgHtml, true);
                            }
                        }
                    },
                    onElementSelect: {
                        element: 'img',
                        action: taToolFunctions.imgOnSelectAction
                    }
                });
                taOptions.toolbar[2].push('loadImage');
                return taOptions;
            }])
    }).config(function ($provide) {
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$rootScope', '$http', 'taSelection',
            function (taRegisterTool, taOptions, $rootScope, $http, taSelection) {
                taRegisterTool('insertVimeoVideo', {
                    iconclass: "fa fa-vimeo-square",
                    action: function () {
                        var self = this;

                        var urlPrompt;
                        urlPrompt = prompt("Вставте ссылку с vimeo", 'https://');

                        if (!blockJavascript(urlPrompt)) {
                            if (urlPrompt && urlPrompt !== '' && urlPrompt !== 'https://') {

                                var videoId = urlPrompt.slice(urlPrompt.indexOf("com/") + 4, urlPrompt.length);

                                if (videoId) {
                                    var requestLink = "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + videoId;
                                    var urlLink = "https://player.vimeo.com/video/" + videoId;

                                    $http.get(requestLink).then(function (result) {
                                        var urlImage = result.data.thumbnail_url;
                                        var embed = '<img class="ta-insert-video" src="' + urlImage + '" ta-insert-video="' + urlLink + '" contenteditable="false" allowfullscreen="true" frameborder="0" />';

                                        if (taSelection.getSelectionElement().tagName && taSelection.getSelectionElement().tagName.toLowerCase() === 'a') {

                                            taSelection.setSelectionAfterElement(taSelection.getSelectionElement());
                                        }
                                        return self.$editor().wrapSelection('insertHTML', embed, true);
                                    });
                                }
                            }
                        }

                    }
                });
                taOptions.toolbar[3].push('insertVimeoVideo');
                return taOptions;

            }])
    });

    var blockJavascript = function (link) {
        if (link.toLowerCase().indexOf('javascript') !== -1) {
            return true;
        }
        return false;
    };

})(angular);



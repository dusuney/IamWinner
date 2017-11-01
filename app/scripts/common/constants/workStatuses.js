(function (ng) {
    'use strict';

    ng.module('editor.common.constants')
        .constant('workStatuses', [
        	{ id: 0, name: 'назначен' },
        	{ id: 1, name: 'ожидание оплаты' },
        	{ id: 2, name: 'начат' },
        	{ id: 3, name: 'закончен' },
        	{ id: 4, name: 'удален' }
        ]);

})(angular);


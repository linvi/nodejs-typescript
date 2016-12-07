/// <reference path="../typings/index.d.ts" />

import { RestServer } from './server.rest';

let port = null;

(function initParams() {
    process.argv.forEach(arg => {
        const getParamsInfo = /-([a-zA-Z]+):([a-zA-Z0-9]+)/g;
        const result = getParamsInfo.exec(arg);

        if (result) {
            switch (result[1]) {
                case 'port':
                    port = result[2];
                    break;
            }
        }
    });
})();

RestServer.start(port);
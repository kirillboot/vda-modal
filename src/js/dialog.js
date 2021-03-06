import $ from 'jQuery';
import modal from 'modal';
import BootstrapModalDom from 'BootstrapModalDom';

let modalDialogFactory = function($, modal, ModalDom) {
    let dialog = {};
    dialog.modalDom = new ModalDom(dialog);
    dialog.defaultOptions = {
        focusFirstInput: true
    };
    dialog.init = function(content, options) {
        options = Object.assign({}, modal.defaultOptions, dialog.defaultOptions, options);
        let dom = dialog.buildDom(content, options);
        let $modal = modal.init(dom, options);
        $modal.appendTo($(options.appendLocation));

        return $modal;
    };
    dialog.open = function($modal) {
        $modal = $($modal);

        modal.open($modal);

        if ($modal.data().modal.focusFirstInput) {
            $modal.find('button[type="submit"], button[type="button"], input[type="submit"], ' +
            'input[type="button"], textarea, input[type="date"], input[type="datetime"], ' +
            'input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], ' +
            'input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], ' +
            'input[type="url"], input[type="week"]').first().focus();
        }

        return $modal;
    };
    dialog.close = function($modal) {
        modal.close($modal);
    };
    dialog.buildDom = function(content, options) {
        return dialog.modalDom.convert(content, options);
    };

    return dialog;
};

export default modalDialogFactory($, modal, BootstrapModalDom);
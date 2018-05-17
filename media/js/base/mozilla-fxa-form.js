/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// create namespace
if (typeof Mozilla === 'undefined') {
    var Mozilla = {};
}

// TODO:
// may not need jquery here, as fxa only should be shown on new-ish fx browsers

Mozilla.FxaForm = (function() {
    'use strict';

    var fxaForm = document.getElementById('fxa-email-form');

    function init() {
        // get tokens from FxA for analytics purposes
        fetch(fxaForm.getAttribute('action') + 'metrics-flow').then(function(resp) {
            return resp.json();
        }).then(function(r) {
            fxaForm.querySelector('[name="flow_id"]').value = r.flowId;
            fxaForm.querySelector('[name="flow_begin_time"]').value = r.flowBeginTime;
        }).catch(function(e) {
            console.log('fxa error', e);
            // TODO: should redirect to...about:home? mozilla.org? about:newtab?
        });
    }

    if (fxaForm) {
        init();
    }
})();

// --
// Copyright (C) 2012 Znuny GmbH, https://znuny.com/
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (AGPL). If you
// did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
// --

// nofilter(TidyAll::Plugin::Znuny::JavaScript::ESLint)

"use strict";

var Core = Core || {};
Core.Agent = Core.Agent || {};
Core.Agent.Admin = Core.Agent.Admin || {};

var config = [];
var Vue = Vue;

/**
 * @namespace Core.Agent.Admin
 * @memberof Core.Agent
 * @author Znuny
 */

/**
 * @namespace Core.Agent.Admin.ZnunySearchFrontend
 * @memberof Core.Agent.Admin
 * @author Znuny
 * @description
 *      This namespace contains the special module functions for the ZnunySearchFrontend.
 */
Core.Agent.Admin.ZnunySearchFrontend = (function(TargetNS) {

    /**
     * @name Init
     * @memberof Core.Agent.Admin.ZnunySearchFrontend
     * @function
     * @description
     *      This function initialize the module.
     */
    TargetNS.Init = function() {
        TargetNS.InitSearchComponent();
    }

    TargetNS.InitSearchComponent = function() {

        const customSearchService = {
            async getInitialData() {
                const SortParams             = Core.Config.Get('SortParams') || {};
                const TicketParams           = { ...SortParams, StartHit: this.StartHit } ;
                const IgnoreSearch           = Core.Config.Get('IgnoreSearch') || 0;

                const myPromise = new Promise((resolve, reject) => {
                    Core.AJAX.FunctionCall(Core.Config.Get('Baselink') + 'Action=ZnunySearchFrontend;Subaction=GetInitialData',{ ...TicketParams, IgnoreSearch: IgnoreSearch}, function (Response) {
                        var config = Response.Config;

                        var Sort = (a, b) => {
                            var IndexA = Response.FieldsOrder.indexOf(a.label);
                            var IndexB = Response.FieldsOrder.indexOf(b.label)
                            return ((IndexA > -1 ? IndexA : Infinity) - (IndexB > -1 ? IndexB : Infinity));
                        }
                        config.sort(function(a, b) {
                          return Sort(a, b);
                        });

                        $('#TicketList').html(Response.HTML);
                        Core.Agent.Overview.Init();

                         // override the config with the sorted config
                        Response.Config = config;
                        resolve(Response);
                    });
                });

                return myPromise;
            },

            async getApiValuesList(apiUrl) {
                const myPromise = new Promise((resolve, reject) => {
                    const http = new Http();
                    http
                        .get(apiUrl)
                        .then((res) => {
                            const myItems = JSON.parse(res).map(item => item.name);
                            resolve(myItems);
                        })
                        .catch((err) => {
                            console.error(err.error);
                            reject(err);
                        });
                });

                return myPromise;
            },

            async clearRecentSearches() {
                Core.AJAX.FunctionCall(Core.Config.Get('Baselink') + 'Action=ZnunySearchFrontend;Subaction=ClearRecentSearches', { } , function () {
                    // Recent searches are cleared
                    // Since they are already cleared in the frontend, we can ignore the response for now
                });
            },

            async search(queryParams) {
                const myPromise = new Promise((resolve, reject) => {
                    Core.AJAX.FunctionCall(Core.Config.Get('Baselink') + 'Action=ZnunySearchFrontend;Subaction=Search', { QueryParams: queryParams.QueryParams, Time: this.showTime, StartWindow: 0 } , function (Response) {
                        if (Response) {
                            resolve(Response);
                            $('#TicketList').html(Response.HTML);
                            Core.Agent.Overview.Init();
                        } else {
                            reject(new Error('No valid response from server'));
                        }
                    });
                });

                // Return resolved search results to be shown in the vue lib integratedsearch results section
                return myPromise;
            }
        };

        // Initialize the search component with our custom service
        ZnunySearchFrontend.initializeSearchApp(
            '#zs-box',
            customSearchService,
            {
                showHeader: false, // Hide/Show the component's header
                showSearchResults: false, // Hide/Show the search results
                freeInputDefaultTokenConfiguration: {   // Overwrite default free input tokenizing config
                    label: 'Title',
                    operator: { text: 'FULLTEXT', code: 'FULLTEXT' },
                },
                repeatLastSearchOnPageMount: true   // Repeat the last search on page mount
            }
        );

        // https://github.com/jakecyr/slim-javascript-http-request
        function Http() {function n(e,t,n) {var o=new XMLHttpRequest,r=void 0,s=void 0,i={};if ("GET"==e)o.open(e,t,!0),o.send();else{if ("POST"!=e)return console.error(e,"method not supported");o.open("POST",t,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded");var u=[];for (var a in n=n||{})u.push(a+"="+encodeURIComponent(n[a]||""));o.send(u.join("&"))}return o.onreadystatechange=function() {if (4==this.readyState) {var e=o.getResponseHeader("content-type");200==this.status?r&&r("application/json"==e?JSON.parse(o.responseText):o.responseText):s&&s({status:o.status,body:o.responseText})}},i.then=function(e) {return r=e,i},i.catch=function(e) {return s=e,i},i}this.get=function(e) {return n("GET",e)},this.post=function(e,t) {return n("POST",e,t)}}
    }

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Agent.Admin.ZnunySearchFrontend || {}));

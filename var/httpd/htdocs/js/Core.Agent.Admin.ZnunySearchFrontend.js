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

        var clickOutside = {
          beforeMount: (el, binding) => {
            el.clickOutsideEvent = event => {
              // check that click was outside the el. and his children
              if (!(el == event.target || el.contains(event.target)
                    || event.target.className === "zs-input"
                    || event.target.className === "zs-option"
                    || event.target.className === "zs-submit"
                    || event.target.className === "zs-tokenremove"
                    || event.target.className === "zs-dropdown")) {
                // and if it did, call method provided in attribute value
                binding.value(1);
              }
            };
            document.addEventListener("click", el.clickOutsideEvent);
          },
          unmounted: el => {
            document.removeEventListener("click", el.clickOutsideEvent);
          },
        };

        const { createApp } = Vue;

        const ZnunySearchBox = createApp({
            data() {
                return {
                    LookupFields: null,
                    FieldsOrder: null,
                    Params: [],
                    Loading: false,
                    InputText: '',
                    InputParam: {type: 'input'},
                    CurrentKind: null,
                    CurrentLevel: null,
                    CurrentParamIndex: null,
                    CurrentDropdown: null,
                    InputDisabled: 1,
                    DropdownMessage: '',
                    StartHit: 1,
                    Labels: [],
                    Operators: [],
                    ShowTime: 0
                }
            },
            mounted () {

                this.StartHit = $('#StartHit').val();

                this.Params.push(this.InputParam);

                var SetProperties = (LookupFields, LastSearchQueryParams) => {
                    this.InputDisabled = 0;
                    this.LookupFields = LookupFields;

                    if (typeof LastSearchQueryParams != "undefined" && LastSearchQueryParams != {}) {
                        this.SetParams(LastSearchQueryParams)
                    }
                };

                const SortParams = Core.Config.Get('SortParams') || {};
                const TicketParams = { ...SortParams, StartHit: this.StartHit } ;

                Core.AJAX.FunctionCall(Core.Config.Get('Baselink') + 'Action=ZnunySearchFrontend;Subaction=GetInitialData',TicketParams, function (Response) {

                    config = Response.Config;

                    var Sort = (a,b) => {
                        var IndexA = Response.FieldsOrder.indexOf(a.label);
                        var IndexB = Response.FieldsOrder.indexOf(b.label)
                        return ((IndexA > -1 ? IndexA : Infinity) - (IndexB > -1 ? IndexB : Infinity));
                    }
                    config.sort(function(a, b) {
                      return Sort(a,b);
                    });

                    $('#TicketList').html(Response.HTML);
                    Core.Agent.Overview.Init();

                    if (Response.LastSearchQueryParams) {
                        SetProperties(Response.LookupFields, Response.LastSearchQueryParams);
                    } else {
                        SetProperties(Response.LookupFields);
                    }
                });
            },
            watch: {
                InputText(newText) {
                    if (!this.CurrentDropdown) {
                        return;
                    }
                    this.CurrentDropdown.items.forEach((item) => {
                        if (item.text.toLowerCase().indexOf(newText.toLowerCase()) > -1) {
                            item.visible = true;
                        } else {
                            item.visible = false;
                        }
                    });
                },
            },
            methods: {
                ClearAll() {
                    this.ResetCurrents();
                    this.Params = [this.InputParam];
                },
                ResetCurrents() {
                    this.CurrentKind = null;
                    this.CurrentLevel = null;
                    this.CurrentParamIndex = null;
                    this.RemoveCurrentDropdown();

                    // remove stray Params
                    this.Params.forEach((Param, i) => {
                        if (Param.type === 'token' && (Param.value === undefined || !Param.value.length)) {
                            this.Params.splice(i, 1);
                        }
                    });
                },
                CreateListLevel0 () {
                    this.CurrentDropdown = {
                        type: 'dropdown',
                        items: []
                    }
                    config.forEach((item) => {
                        this.CurrentDropdown.items.push({
                            text: item.label,
                            visible: true
                        });
                    });

                    this.Params.splice(this.CurrentParamIndex + 1, 0, this.CurrentDropdown);

                    // move dropdown to correct position
                    this.$nextTick(() => {
                        const labelEl = this.$refs.inputWrap[0];
                        const tokens = this.$refs.token;
                        var margin = 5;
                        var spaces = 0;
                        if (tokens !== undefined) {
                            for (var token of tokens) {
                                margin += token.offsetWidth;
                                spaces += 0.7;
                            }
                        }

                        const scrollableEl = labelEl.closest('.zs-scrollable');
                        if (scrollableEl !== undefined) {
                            margin -= scrollableEl.scrollLeft;
                        }
                        this.$refs.dropdown[0].style.marginLeft = "calc("+margin+"px + "+spaces+"em)";
                    });
                },
                CreateListLevel1 () {

                    // hardcoded operator list
                    var myItems = [];
                    config[this.CurrentKind].operators.forEach((operator) => {
                        myItems.push({
                            text: operator.label,
                            code: operator.code,
                            visible: true
                        });
                    });
                    if (config[this.CurrentKind].type === "api") {
                        myItems = [
                            {
                                text: "=",
                                code: "=",
                                visible: true
                            }
                        ];
                    }
                    this.CurrentDropdown.items = myItems;

                    // move dropdown to correct position
                    this.$nextTick(() => {
                        this.MoveInputToCorrectPosition();
                        const labelEl = this.$refs['tokenLabel'+this.CurrentParamIndex][0];
                        const scrollableEl = labelEl.closest('.zs-scrollable');
                        let scrollableOverflowL = 0;
                        if (scrollableEl !== undefined) {
                            scrollableOverflowL = scrollableEl.scrollLeft;
                        }
                        const offset = 5 + labelEl.offsetLeft + labelEl.clientWidth - scrollableOverflowL + 'px';
                        this.$refs.dropdown[0].style.marginLeft = offset;
                    });
                },
                CreateListLevel2 () {
                    this.CurrentDropdown.items = []
                    const myItems = [];

                    if (this.Params[this.CurrentParamIndex].operator) {
                        // hardcoded value list
                        if (config[this.CurrentKind].type === 'values') {
                            config[this.CurrentKind].values.forEach((value) => {
                                myItems.push({
                                    text: value,
                                    visible: true
                                });
                            });
                            this.CurrentDropdown.items = myItems;
                        }

                        // API access value list
                        if (config[this.CurrentKind].type === 'api') {
                            this.Loading = true;
                            const http = new Http();
                            http
                            .get(config[this.CurrentKind].api)
                            .then((res) => {
                                JSON.parse(res).forEach((item) => {
                                    myItems.push({
                                        text: item.name,
                                        visible: true
                                    });
                                });
                                this.CurrentDropdown.items = myItems;
                                this.Loading = false;
                            })
                            .catch((err) => {
                                console.error(err.error);
                                this.Loading = false;
                            })
                        }

                        // Freetext
                        if (config[this.CurrentKind].type === 'customtext') {

                            const isIterable = object =>
                                object != null && typeof object[Symbol.iterator] === 'function'

                            if (isIterable(this.Params[this.CurrentParamIndex].value)) {
                                this.Params[this.CurrentParamIndex].value.forEach((value) => {
                                    myItems.push({
                                        text: String(value),
                                        visible: true
                                    });
                                })
                                this.CurrentDropdown.items = myItems;
                            }

                            this.$nextTick(() => {
                                this.$refs.inputField[0].focus();
                            });

                        }
                        if (!this.CurrentDropdown) {
                            return;
                        }
                        // move dropdown to correct position
                        this.$nextTick(() => {
                            this.MoveInputToCorrectPosition();
                            const labelEl = this.$refs['tokenOperator'+this.CurrentParamIndex][0];
                            const scrollableEl = labelEl.closest('.zs-scrollable');
                            let scrollableOverflowL = 0;
                            if (scrollableEl !== undefined) {
                                scrollableOverflowL = scrollableEl.scrollLeft;
                            }
                            const offset = 5 + labelEl.offsetLeft + labelEl.clientWidth - scrollableOverflowL + 'px';
                            this.$refs.dropdown[0].style.marginLeft = offset;
                        });
                    } else {
                        if (this.Params[this.CurrentParamIndex].value) {
                            this.Params[this.CurrentParamIndex].value.forEach((value) => {
                                myItems.push({
                                    text: String(value),
                                    visible: true
                                });
                            })
                            this.CurrentDropdown.items = myItems;
                        }

                        this.$nextTick(() => {
                            this.$refs.inputField[0].focus();
                        });
                    }
                },
                ClickedOnInput() {
                    if (this.CurrentParamIndex === null) {
                        this.StartNewToken();
                    }
                    else if (this.Params[this.CurrentParamIndex].value || this.CurrentLevel === 0) {
                        this.HideDropdown(1);
                    }
                },
                StartNewToken() {
                    this.ResetCurrents();
                    this.MoveInputToEnd();
                    this.CurrentParamIndex = this.Params.length - 1;
                    this.Params.splice(this.CurrentParamIndex, 0, { type: 'token' });
                    this.CreateListLevel0();
                    this.CurrentLevel = 0;
                    this.$nextTick(() => {
                        this.$refs.inputField[0].focus();
                    });
                },
                RemoveToken(i) {
                    this.Params.splice(i, 1);
                    this.RemoveCurrentDropdown();
                },
                MoveInputToEnd() {
                    const CurrentInputIndex = this.Params.findIndex((Param) => Param.type === 'input');
                    this.Params.splice(CurrentInputIndex, 1);
                    this.Params.push(this.InputParam);
                },
                MoveInput() {
                    const CurrentInputIndex = this.Params.findIndex((Param) => Param.type === 'input');
                    this.Params.splice(CurrentInputIndex, 1);
                    this.Params.splice(this.CurrentParamIndex, 0, this.InputParam);
                },
                SetParams(Data) {

                    if (Data != {}) {
                        this.Params = [];

                        var SavedSearchParams = [];
                        for (const Field in Data) {
                            for (const Param of Data[Field]) {
                                if (typeof Param === "string") {
                                    SavedSearchParams.push({
                                        type: 'token',
                                        label: Field,
                                        operator: {
                                            text: '=',
                                            code: '=',
                                            visible: '='
                                        },
                                        value: Data[Field]
                                    })
                                    break;
                                }
                                else {
                                    for (let Index in Param.Value) {
                                        if (typeof Param.Value[Index] !== "string") {
                                            Param.Value[Index] = String(Param.Value[Index]);
                                        }
                                    }

                                     SavedSearchParams.push({
                                        type: 'token',
                                        label: Field,
                                        operator: {
                                            text: Param.Operator,
                                            code: Param.Operator,
                                            visible: true,
                                        },
                                        value:  Array.isArray(Param.Value) ? Param.Value : [ String(Param.Value) ],
                                    })
                                }
                            }
                        }
                        this.Params.push(...SavedSearchParams, this.InputParam)
                        this.$nextTick(() => {
                            this.MoveInputToCorrectPosition();
                        });
                    }
                },
                RemoveCurrentDropdown() {
                    if (this.CurrentDropdown) {
                        const CurrentDropdownIndex = this.Params.findIndex((Param) => Param.type === 'dropdown');
                        this.Params.splice(CurrentDropdownIndex, 1);
                    }
                    this.CurrentDropdown = null;
                },
                ChooseFromList(entry, entryindex) {
                    if (this.CurrentLevel === 0) {
                        for (var Param of this.Params) {
                            if (Param.label === entry.text) {
                                this.RemoveCurrentDropdown();
                                this.ChangeParamValue(Param);
                                return;
                            }
                        }
                        this.CurrentKind = entryindex;
                        this.Params[this.CurrentParamIndex].label = entry.text;
                        this.CreateListLevel1();
                        this.CurrentLevel = 1;
                        this.$refs.inputField[0].focus();
                        this.InputText = '';
                    } else if (this.CurrentLevel === 1) {
                        this.Params[this.CurrentParamIndex].operator = entry;
                        this.CreateListLevel2();
                        this.CurrentLevel = 2;
                        this.$refs.inputField[0].focus();
                        this.InputText = '';
                    } else if (this.CurrentLevel === 2) {
                        if (this.Params[this.CurrentParamIndex].value) {
                            var index = this.Params[this.CurrentParamIndex].value.indexOf(entry.text);

                            if (index > -1) {
                                this.Params[this.CurrentParamIndex].value.splice(index, 1);
                                if (!this.Params[this.CurrentParamIndex].value.length) {
                                    this.Params[this.CurrentParamIndex].value = null;
                                }
                            }
                            else {
                                this.Params[this.CurrentParamIndex].value.push(entry.text);
                            }
                        } else {
                            this.Params[this.CurrentParamIndex].value = [];
                            this.Params[this.CurrentParamIndex].value.push(entry.text);
                        }
                        this.$nextTick(() => {
                            this.MoveInputToCorrectPosition();
                            this.$refs.inputField[0].focus();
                        })
                    }
                },
                ParamValueText(values) {
                    var Result = "";
                    if (!values) return Result;
                    if (typeof values === "string") return values;

                    if (!Array.isArray(values)) {
                        values = [values];
                    }

                    for (var value of values) {
                        if (values.indexOf(value) === 0) {
                            Result += value;
                        }
                        else {
                            return values[0] + ", ..+" + (values.length-1);
                        }
                    }
                    return Result;
                },
                FieldName(value) {
                    if (!value) return '';
                    value = value.split('_');
                    value = value.join('::');
                    return value
                },
                IsActive(entrytext) {
                    var Param = this.Params[this.CurrentParamIndex];

                    if (this.CurrentLevel === 2 && Param.value) {
                        if (Param.value.indexOf(entrytext) > -1) {
                            return 1;
                        }
                    }
                    return 0;
                },
                MoveParamBeforeInput(Param) {
                    this.Params.sort((a, b) => {
                        if (a.type == "token" && b.type == "token") {
                            return a.label == Param.label ? 1 : b.label == Param.label ? -1 : 0;
                        }
                        return 0;
                    })
                },
                ChangeParamValue(Param) {
                    if (this.CurrentDropdown) {
                        this.HideDropdown(1);
                    }
                    else {
                        this.CurrentParamIndex = this.Params.findIndex((item) => item.label === Param.label);

                        this.CurrentLevel = 2;
                        this.CurrentParamIndex = this.Params.findIndex((item) => item.label === Param.label);
                        this.CurrentKind = config.findIndex((item) => item.label === Param.label);

                        // move parameter before input
                        this.MoveParamBeforeInput(Param);
                        this.CurrentParamIndex = this.Params.findIndex((item) => item.label === Param.label);
                        this.CurrentKind = config.findIndex((item) => item.label === Param.label);
                        this.InputText = '';

                        this.CurrentDropdown = {
                            type: 'dropdown',
                            items: [...this.Params[this.CurrentParamIndex].value]
                        }
                        this.Params.splice(this.CurrentParamIndex + 1, 0, this.CurrentDropdown);
                        this.CreateListLevel2();
                        this.$nextTick(() => {
                            this.$refs.inputField[0].focus();
                        });
                    }
                },
                DropdownKeystroke(e) {
                    // down
                    if (e.which === 40) {
                        e.preventDefault();
                        if (e.target.parentElement.nextElementSibling) {
                            e.target.parentElement.nextSibling.children[0].focus();
                        } else {
                            this.$refs.inputField[0].focus();
                        }
                    }

                    // up
                    if (e.which === 38) {
                        e.preventDefault();
                        if (e.target.parentElement.previousElementSibling) {
                            e.target.parentElement.previousSibling.children[0].focus();
                        } else {
                            this.$refs.inputField[0].focus();
                        }
                    }
                },
                InputKeystroke(e) {

                    // pressing down: set focus to dropdown list, first entry
                    if (e.which === 40 || e.which === 9) {
                        e.preventDefault();
                        this.$refs.dropdownbutton[0].focus();
                    }
                    // pressing up: set focus to dropdown list, last entry
                    if (e.which === 38) {
                        e.preventDefault();
                        this.$refs.dropdownbutton[this.CurrentDropdown.items.length - 1].focus();

                    }

                    // pressing enter
                    if (e.which === 13) {
                        if (this.CurrentLevel == 1) {
                            this.MoveInputToCorrectPosition();
                            this.ResetCurrents();
                            e.preventDefault();
                        }
                        else if (this.CurrentLevel == 2) {
                            e.preventDefault();

                            // prevent using empty value in the filters
                            if(this.InputText !== undefined && this.InputText !== ''){
                                // prevent lookup fields filter to use value from the input
                                if(!(this.Params[this.CurrentParamIndex].label !== undefined &&
                                     this.LookupFields.includes(this.Params[this.CurrentParamIndex].label))){
                                    // check if any values exists in the filter
                                    if (!this.Params[this.CurrentParamIndex].value) {
                                        // set filter
                                        this.Params[this.CurrentParamIndex].value = [this.InputText];
                                    } else {
                                        // update filter
                                        var index = this.Params[this.CurrentParamIndex].value.indexOf(this.InputText);
                                        if (index < 0) {
                                            this.Params[this.CurrentParamIndex].value = [...this.Params[this.CurrentParamIndex].value, this.InputText];
                                        }
                                    }
                                    // refresh input position
                                    this.$nextTick(() => {
                                        this.MoveInputToCorrectPosition();
                                    })
                                }
                            }
                        } else {
                            // support for fulltext parameter set when no filters were selected
                            if (this.InputText !== '') {
                                if (this.Params.length > 1) {
                                    var ParamIndex = this.Params.findIndex((item) => item.label === 'Fulltext');
                                    if (ParamIndex > -1) {
                                        this.Params.splice(this.CurrentParamIndex, 1)
                                        this.CurrentParamIndex = ParamIndex;
                                        var index = this.Params[this.CurrentParamIndex].value.indexOf(this.InputText);
                                        if (index < 0) {
                                            this.Params[this.CurrentParamIndex].value = [...this.Params[this.CurrentParamIndex].value, this.InputText];
                                        }
                                    } else {
                                        this.Params[this.CurrentParamIndex].value = [];
                                        this.Params[this.CurrentParamIndex].value.push(this.InputText)
                                        this.Params[this.CurrentParamIndex].label = 'Fulltext';
                                        this.Params[this.CurrentParamIndex].type = 'token';
                                        this.Params[this.CurrentParamIndex].operator = {
                                            text: '=',
                                            code: '=',
                                            visible: true
                                        };
                                    }

                                }

                            }
                        }

                        this.ResetCurrents();
                        this.InputText = '';
                    }
                },
                MoveInputToCorrectPosition() {
                    const labelEl = this.$refs.inputWrap[0];
                    const scrollableEl = labelEl.closest('.zs-scrollable');

                    if (scrollableEl !== undefined) {
                        scrollableEl.scrollLeft = scrollableEl.scrollWidth;
                    }
                },
                HideDropdown(MoveInput) {
                    var HideWithTokenRemove = () => {
                        this.RemoveToken(this.CurrentParamIndex);
                        this.CurrentLevel = null;
                        this.CurrentParamIndex = null;
                        this.RemoveCurrentDropdown();
                    }

                    if (this.CurrentLevel !== null && this.CurrentLevel < 2) {
                        HideWithTokenRemove();
                    } else if (this.CurrentLevel === 2) {
                        if (!this.Params[this.CurrentParamIndex].value || !this.Params[this.CurrentParamIndex].value.length) {
                            if (this.InputText !== '') {
                                this.Params[this.CurrentParamIndex].value = [this.InputText];
                                this.ResetCurrents();
                                this.InputText = '';
                            } else {
                                HideWithTokenRemove();
                            }
                        }
                        else {
                            this.CurrentKind = null;
                            this.CurrentLevel = null;
                            this.CurrentParamIndex = null;
                            this.RemoveCurrentDropdown();
                        }
                    }

                    if (MoveInput) {
                        this.$nextTick(() => {
                            this.MoveInputToCorrectPosition();
                        })
                    }

                },
                Submit(e) {
                    e.preventDefault();

                    if (this.InputText !== '' && this.CurrentLevel === 2) {
                        this.Params[this.CurrentParamIndex].value = this.InputText;
                        this.ResetCurrents();
                        this.InputText = '';
                    }

                    var QueryParams = {};
                    var QueryParamsSet = (Field, Operator, Value, Exist) => {
                        if (this.LookupFields.indexOf(Field) != -1) {
                            if (!Exist) {
                                QueryParams[Field] = Value;
                            } else {
                                QueryParams[Field].push(...Value);
                            }
                        } else {

                            if (!Exist) {
                                QueryParams[Field] = [
                                    {
                                        Operator: Operator,
                                        Value:  Value
                                    }
                                ];
                            }
                            else {
                                QueryParams[Field].push({
                                    Operator: Operator,
                                    Value: Value
                                });
                            }
                        }
                    }
                    for (let Param of this.Params) {
                        var ParamValue = Param.value

                        if (Param.type === 'token' && Param.value) {
                            try {
                                ParamValue = JSON.parse(ParamValue)
                            } catch {
                                // don't need to handle parsing error
                                // not valid JSON message needs to be
                                // silenced as not valid JSON is also
                                // expected
                            }
                            finally {
                                var ParamAlreadyExist = QueryParams[Param.label] ? 1 : 0;

                                if (!ParamAlreadyExist) {
                                    QueryParamsSet(Param.label, Param.operator.code, ParamValue);
                                }
                                else {
                                    QueryParamsSet(Param.label, Param.operator.code, ParamValue, 1);
                                }
                            };
                        }
                    }
                    this.Loading = true;

                    var StopLoading = () => {
                        this.Loading = false;
                    }

                    Core.AJAX.FunctionCall(Core.Config.Get('Baselink') + 'Action=ZnunySearchFrontend;Subaction=Search', { QueryParams: JSON.stringify(QueryParams), Time: this.showTime, StartWindow: 0 } , function (Response) {

                        StopLoading();
                        if (Response) {
                            $('#TicketList').html(Response.HTML);
                            Core.Agent.Overview.Init();
                        }

                    });
                },
            },
        });

        ZnunySearchBox.directive('click-outside', clickOutside);
        ZnunySearchBox.mount('#SearchBox');
        // helper functions

        // https://github.com/jakecyr/slim-javascript-http-request
        function Http() {function n(e,t,n) {var o=new XMLHttpRequest,r=void 0,s=void 0,i={};if ("GET"==e)o.open(e,t,!0),o.send();else{if ("POST"!=e)return console.error(e,"method not supported");o.open("POST",t,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded");var u=[];for (var a in n=n||{})u.push(a+"="+encodeURIComponent(n[a]||""));o.send(u.join("&"))}return o.onreadystatechange=function() {if (4==this.readyState) {var e=o.getResponseHeader("content-type");200==this.status?r&&r("application/json"==e?JSON.parse(o.responseText):o.responseText):s&&s({status:o.status,body:o.responseText})}},i.then=function(e) {return r=e,i},i.catch=function(e) {return s=e,i},i}this.get=function(e) {return n("GET",e)},this.post=function(e,t) {return n("POST",e,t)}}
    }

    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');

    return TargetNS;
}(Core.Agent.Admin.ZnunySearchFrontend || {}));
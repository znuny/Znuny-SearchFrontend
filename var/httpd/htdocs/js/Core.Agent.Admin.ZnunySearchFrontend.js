// --
// Copyright (C) 2012-2022 Znuny GmbH, https://znuny.com/
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
        binding.value();
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
            SavedSearches: false,
            LastSearches: [],
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
            Labels: [],
            Operators: [],
            ShowTime: 0
        }
    },
    mounted () {
        this.Params.push(this.InputParam);
        var EnableInput = () => {
            this.InputDisabled = 0;
        };
        Core.AJAX.FunctionCall('/otrs/index.pl?Action=ZnunySearchFrontend;Subaction=GetInitialData',{ TicketIDs: '[]' }, function (Response) {
            config = Response.Config;
            EnableInput();
            if(!$('div#TicketList')[1]) {
                $('#TicketList').html(Response.HTML);
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
        ToggleSavedSearches() {
            this.SavedSearches = !this.SavedSearches;
        },
        clearAll() {
            this.Params = [this.InputParam];
            this.resetCurrents();
        },
        resetCurrents() {
            this.CurrentKind = null;
            this.CurrentLevel = null;
            this.CurrentParamIndex = null;
            this.removeCurrentDropdown();

            // remove stray Params
            this.Params.forEach((Param, i) => {
                if (Param.type === 'token' && (!Param.operator || !Param.value.length)) {
                    this.Params.splice(i, 1);
                }
            });
        },

        createListLevel0 () {
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
                const offset = 5 + labelEl.offsetLeft + 'px';
                this.$refs.dropdown[0].style.left = offset;
            });
        },
        createListLevel1 () {

            // hardcoded operator list
            var myItems = [];
            config[this.CurrentKind].operators.forEach((operator) => {
                myItems.push({
                    text: operator.label,
                    code: operator.code,
                    visible: true
                });
            });
            if(config[this.CurrentKind].type === "api") {
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
                const labelEl = this.$refs['tokenLabel'+this.CurrentParamIndex][0];
                const offset = 5 + labelEl.offsetLeft + labelEl.clientWidth + 'px';
                this.$refs.dropdown[0].style.left = offset;
            });
        },
        createListLevel2 () {
            this.CurrentDropdown.items = []

            // hardcoded value list
            if (config[this.CurrentKind].type === 'values') {
                const myItems = [];
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
                const myItems = [];
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
                this.CurrentDropdown.items = [];
                this.removeCurrentDropdown();
                this.$nextTick(() => {
                    this.$refs.inputField[0].focus();
                });

            }
            if (!this.CurrentDropdown) {
                return;
            }

            // move dropdown to correct position
            this.$nextTick(() => {
                const labelEl = this.$refs['tokenOperator'+this.CurrentParamIndex][0];
                const offset = 5 + labelEl.offsetLeft + labelEl.clientWidth + 'px';
                this.$refs.dropdown[0].style.left = offset;
            });
        },
        ClickedOnInput() {
            if (this.CurrentParamIndex === null) {
                this.startNewToken();
            }
            else if(this.Params[this.CurrentParamIndex].value || this.CurrentLevel === 0) {
                this.HideDropdown();
            }
        },
        startNewToken() {
            this.resetCurrents();
            this.moveInputToEnd();
            this.CurrentParamIndex = this.Params.length - 1;
            this.Params.splice(this.CurrentParamIndex, 0, { type: 'token' });
            this.createListLevel0();
            this.CurrentLevel = 0;
            this.$nextTick(() => {
                this.$refs.inputField[0].focus();
            });
        },
        removeToken(i) {
            this.Params.splice(i, 1);
            this.removeCurrentDropdown();
        },
        moveInputToEnd() {
            const CurrentInputIndex = this.Params.findIndex((Param) => Param.type === 'input');
            this.Params.splice(CurrentInputIndex, 1);
            this.Params.push(this.InputParam);
        },
        moveInput() {
            const CurrentInputIndex = this.Params.findIndex((Param) => Param.type === 'input');
            this.Params.splice(CurrentInputIndex, 1);
            this.Params.splice(this.CurrentParamIndex, 0, this.InputParam);
        },
        removeCurrentDropdown() {
            if (this.CurrentDropdown) {
                const CurrentDropdownIndex = this.Params.findIndex((Param) => Param.type === 'dropdown');
                this.Params.splice(CurrentDropdownIndex, 1);
            }
            this.CurrentDropdown = null;
        },
        chooseFromList(entry, entryindex) {

            if (this.CurrentLevel === 0) {
                for(var Param of this.Params) {
                    if(Param.label === entry.text) {
                        this.removeCurrentDropdown();
                        this.changeParamValue(Param);
                        return;
                    }
                }
                this.CurrentKind = entryindex;
                this.Params[this.CurrentParamIndex].label = entry.text;
                this.createListLevel1();
                this.CurrentLevel = 1;
                this.$refs.inputField[0].focus();
                this.InputText = '';
            } else if (this.CurrentLevel === 1) {
                this.Params[this.CurrentParamIndex].operator = entry;
                this.createListLevel2();
                this.CurrentLevel = 2;
                this.$refs.inputField[0].focus();
                this.InputText = '';
            } else if (this.CurrentLevel === 2) {

                if(this.Params[this.CurrentParamIndex].value) {
                    var index = this.Params[this.CurrentParamIndex].value.indexOf(entry.text);

                    if(index > -1) {
                        this.Params[this.CurrentParamIndex].value.splice(index, 1);
                        if(!this.Params[this.CurrentParamIndex].value.length) {
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
            }
        },
        ParamValueText(values) {
            var Result = "";

            if(!values) return Result;
            if(typeof values === "string") return values;

            for(var value of values) {
                if(values.length > 1) {
                    return "<b>..+" + (values.length-1) + "</b>, "+values[values.length-1];
                }
                if(values.indexOf(value) === 0) {
                    Result += value;
                }
                else {
                    Result += ", "+value;
                }
            }
            return Result;
        },
        isActive(entrytext) {
            var Param = this.Params[this.CurrentParamIndex];

            if(this.CurrentLevel === 2 && Param.value) {
                if(Param.value.indexOf(entrytext) > -1) {
                    return 1;
                }
            }
            return 0;
        },
        changeParamValue(Param) {
            if(this.CurrentDropdown) {
                this.HideDropdown();
            }
            else {
                this.CurrentLevel = 2;
                this.CurrentParamIndex = this.Params.findIndex((item) => item.label === Param.label);
                this.CurrentKind = config.findIndex((item) => item.label === Param.label);

                this.CurrentDropdown = {
                    type: 'dropdown',
                    items: []
                }
                this.Params.splice(this.CurrentParamIndex + 1, 0, this.CurrentDropdown);
                this.createListLevel2();
                this.$nextTick(() => {
                    this.$refs.inputField[0].focus();
                });
            }
        },
        dropdownKeystroke(e) {
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
        inputKeystroke(e) {

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

            // pressing return
            if (e.which === 13 && this.InputText.length > 0) {
                e.preventDefault();
                this.Params[this.CurrentParamIndex].value = this.InputText;
                this.resetCurrents();
                this.InputText = '';
            }
        },
        HideDropdown() {
            var HideWithTokenRemove = () => {
                this.removeToken(this.CurrentParamIndex);
                this.CurrentLevel = null;
                this.CurrentParamIndex = null;
                this.removeCurrentDropdown();
            }

            if(this.CurrentLevel !== null && this.CurrentLevel < 2) {
                HideWithTokenRemove();
            } else if (this.CurrentLevel === 2) {
                if(!this.Params[this.CurrentParamIndex].value) {
                    HideWithTokenRemove();
                }
                else {
                    this.CurrentKind = null;
                    this.CurrentLevel = null;
                    this.CurrentParamIndex = null;
                    this.removeCurrentDropdown();
                }
            }

        },
        Submit(e) {
            var LookupFields = [ "Queue", "State", "Type", "Priority", "SLA", "Service" ];
            e.preventDefault();


            var QueryParams = {};
            var QueryParamsSet = (Field, Operator, Value, Exist) => {

                if(LookupFields.indexOf(Field) != -1) {
                    if(!Exist) {
                        QueryParams[Field] = Value;
                    } else {
                        QueryParams[Field].push(...Value);
                    }
                } else {

                    if(!Exist) {
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
            for(let Param of this.Params) {
                var ParamValue = Param.value

                if (Param.type === 'token' && Param.value) {
                    try {
                        ParamValue = JSON.parse(ParamValue)
                    } catch (e) {
                        // TODO catch
                    }

                    var ParamAlreadyExist = QueryParams[Param.label] ? 1 : 0;

                    if(!ParamAlreadyExist) {
                        QueryParamsSet(Param.label, Param.operator.code, ParamValue);
                    }
                    else {
                        QueryParamsSet(Param.label, Param.operator.code, ParamValue, 1);
                    }
                }
            }
            this.Loading = true;

            var StopLoading = () => {
                this.Loading = false;
            }

            Core.AJAX.FunctionCall('/otrs/index.pl?Action=ZnunySearchFrontend;Subaction=Search', { QueryParams: JSON.stringify(QueryParams), Time: this.showTime, StartHit: 1, StartWindow: 0 } , function (Response) {
                StopLoading();
                if (Response) {
                    if($('div#TicketList')[1]) {
                        $('div#TicketList')[1].remove();
                    }
                    $('#TicketList').html(Response.HTML);
                }
            });
        },
    },
});

ZnunySearchBox.directive('click-outside', clickOutside);

ZnunySearchBox.mount('#SearchBox');
// helper functions

// https://github.com/jakecyr/slim-javascript-http-request
function Http(){function n(e,t,n){var o=new XMLHttpRequest,r=void 0,s=void 0,i={};if("GET"==e)o.open(e,t,!0),o.send();else{if("POST"!=e)return console.error(e,"method not supported");o.open("POST",t,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded");var u=[];for(var a in n=n||{})u.push(a+"="+encodeURIComponent(n[a]||""));o.send(u.join("&"))}return o.onreadystatechange=function(){if(4==this.readyState){var e=o.getResponseHeader("content-type");200==this.status?r&&r("application/json"==e?JSON.parse(o.responseText):o.responseText):s&&s({status:o.status,body:o.responseText})}},i.then=function(e){return r=e,i},i.catch=function(e){return s=e,i},i}this.get=function(e){return n("GET",e)},this.post=function(e,t){return n("POST",e,t)}}

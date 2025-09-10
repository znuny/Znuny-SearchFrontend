(function(q,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],s):(q=typeof globalThis<"u"?globalThis:q||self,s(q.ZnunySearchFrontend={},q.Vue))})(this,function(q,s){"use strict";const _n="data:image/svg+xml,%3csvg%20version='1.2'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20262%20260'%20width='262'%20height='260'%3e%3ctitle%3elogo%3c/title%3e%3cdefs%3e%3cimage%20width='842'%20height='1191'%20id='img1'%20href='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iODQxLjg5cHgiIGhlaWdodD0iMTE5MC41NXB4IiB2aWV3Qm94PSIwIDAgODQxLjg5IDExOTAuNTUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDg0MS44OSAxMTkwLjU1Ig0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGMzk3MUIiIGQ9Ik00NDUsMTc4LjY4OWMtMTA4Ljk2NiwwLTIwNi43MzgsNDcuOTEyLTI3My40MTEsMTIzLjgxM2wyMTEuNjk2LDIxMS42OTUNCgljNy41MDEsNy41MDEsMTEuNzE2LDE3LjY3NiwxMS43MTYsMjguMjg0YzAsMTAuNjA5LTQuMjE0LDIwLjc4My0xMS43MTYsMjguMjg1TDE3MS41ODgsNzgyLjQ2Mw0KCUMyMzguMjYyLDg1OC4zNjQsMzM2LjAzNCw5MDYuMjc2LDQ0NSw5MDYuMjc2YzIwMC45MTgsMCwzNjMuNzk0LTE2Mi44NzYsMzYzLjc5NC0zNjMuNzkzUzY0NS45MTgsMTc4LjY4OSw0NDUsMTc4LjY4OXoiLz4NCjwvc3ZnPg0K'/%3e%3c/defs%3e%3cstyle%3e%20.s0%20{%20fill:%20%2341b883%20}%20.s1%20{%20fill:%20%2334495e%20}%20%3c/style%3e%3cpath%20class='s0'%20d='m161.1%2031l-30.2%2052.4-30.3-52.4h-100.6l130.9%20226.7%20130.8-226.7z'/%3e%3cpath%20class='s1'%20d='m161.1%2031l-30.2%2052.4-30.3-52.4h-48.3l78.6%20136%2078.5-136z'/%3e%3cuse%20id='znuny_pacman_logo'%20href='%23img1'%20transform='matrix(.066,-0.047,.047,.066,70.464,17.925)'/%3e%3c/svg%3e",Q=(e,t)=>{const n=e.__vccOpts||e;for(const[a,r]of t)n[a]=r;return n},On={class:"token-label"},Nn={key:0,class:"token-operator"},Pn={key:1,class:"token-value"},Tn=Q({__name:"SearchToken",props:{param:{type:Object,required:!0}},emits:["remove","click"],setup(e,{emit:t}){const n=e,a=t,r=s.computed(()=>n.param.value?typeof n.param.value=="string"?n.param.value:Array.isArray(n.param.value)?n.param.value.join(", "):n.param.value.toString():"");return(o,i)=>(s.openBlock(),s.createElementBlock("div",{class:"search-token",onClick:i[1]||(i[1]=l=>a("click",e.param))},[s.createElementVNode("span",On,s.toDisplayString(e.param.label),1),e.param.operator?(s.openBlock(),s.createElementBlock("span",Nn,s.toDisplayString(e.param.operator.text),1)):s.createCommentVNode("",!0),e.param.value?(s.openBlock(),s.createElementBlock("span",Pn,s.toDisplayString(r.value),1)):s.createCommentVNode("",!0),e.param.needsValue?s.createCommentVNode("",!0):(s.openBlock(),s.createElementBlock("button",{key:2,class:"token-remove",onClick:i[0]||(i[0]=s.withModifiers(l=>a("remove"),["stop"]))},"×"))]))}},[["__scopeId","data-v-c055ed2d"]]),Ln=["value","placeholder","disabled"],Mn=Q({__name:"SearchInput",props:{inputText:{type:String,required:!0},currentLevel:{type:Number,default:null},loading:{type:Boolean,default:!1}},emits:["update:inputText","focus","input","keydown"],setup(e,{emit:t}){const n=e,a=t,r=o=>{a("update:inputText",o.target.value),a("input",o)};return(o,i)=>(s.openBlock(),s.createElementBlock("input",{value:n.inputText,class:s.normalizeClass(["search-input",{"value-input":n.currentLevel===2}]),placeholder:n.currentLevel===2?"Enter value...":"Search...",disabled:n.loading,onInput:r,onFocus:i[0]||(i[0]=l=>a("focus",l)),onKeydown:i[1]||(i[1]=l=>a("keydown",l))},null,42,Ln))}},[["__scopeId","data-v-73cbc686"]]),Dn={class:"tokens-container"},Fn=Q({__name:"TokensContainer",props:{params:{type:Array,required:!0},inputText:{type:String,required:!0},currentLevel:{type:Number,default:null},loading:{type:Boolean,default:!1}},emits:["update:inputText","remove-token","token-click","input-focus","input-input","input-keydown"],setup(e,{emit:t}){const n=e,a=t;return(r,o)=>(s.openBlock(),s.createElementBlock("div",Dn,[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(n.params,(i,l)=>(s.openBlock(),s.createElementBlock(s.Fragment,{key:l},[i.type==="token"?(s.openBlock(),s.createBlock(Tn,{key:0,param:i,onRemove:u=>a("remove-token",l),onClick:u=>a("token-click",i,l),class:s.normalizeClass({"needs-value":i.needsValue,"being-edited":i.beingEdited})},null,8,["param","onRemove","onClick","class"])):(s.openBlock(),s.createBlock(Mn,{key:1,"input-text":n.inputText,"current-level":n.currentLevel,loading:n.loading,"onUpdate:inputText":o[0]||(o[0]=u=>a("update:inputText",u)),onFocus:o[1]||(o[1]=u=>a("input-focus",u)),onInput:o[2]||(o[2]=u=>a("input-input",u)),onKeydown:o[3]||(o[3]=u=>a("input-keydown",u))},null,8,["input-text","current-level","loading"]))],64))),128))]))}},[["__scopeId","data-v-7895cb96"]]),Rn={class:"buttons-container"},zn=["disabled"],Bn=["disabled"],jn={key:0},Vn={key:1},$n=Q({__name:"SearchButtons",props:{showClear:{type:Boolean,default:!1},loading:{type:Boolean,default:!1}},emits:["clear","search"],setup(e,{emit:t}){const n=e,a=t;return(r,o)=>{const i=s.resolveComponent("font-awesome-icon");return s.openBlock(),s.createElementBlock("div",Rn,[n.showClear?(s.openBlock(),s.createElementBlock("button",{key:0,class:"clear-button",onClick:o[0]||(o[0]=l=>a("clear")),disabled:n.loading,title:"Clear"},o[2]||(o[2]=[s.createElementVNode("span",null,"×",-1)]),8,zn)):s.createCommentVNode("",!0),s.createElementVNode("button",{class:"search-button",onClick:o[1]||(o[1]=l=>a("search")),disabled:n.loading,title:"Search"},[n.loading?(s.openBlock(),s.createElementBlock("span",jn,[s.createVNode(i,{icon:["fas","arrows-rotate"],spin:!0})])):(s.openBlock(),s.createElementBlock("span",Vn,[s.createVNode(i,{icon:["fas","magnifying-glass"]})]))],8,Bn)])}}},[["__scopeId","data-v-db3029f8"]]),Yn={key:0,class:"loading-container"},Wn=["onMousedown"],Un=Q({__name:"SearchDropdown",props:{items:{type:Array,required:!0},filterText:{type:String,default:""},activeItem:{type:String,default:""},selectedIndex:{type:Number,default:-1},passRef:{type:Object,default:null},showLoading:{type:Boolean,default:!1}},emits:["select"],setup(e,{expose:t,emit:n}){const a=e,r=s.ref(null);t({el:r});const o=n,i=c=>{o("select",c)},l=c=>c.text===a.activeItem,u=c=>c===a.selectedIndex;return(c,d)=>{const g=s.resolveComponent("font-awesome-icon");return e.showLoading||e.items.length>0?(s.openBlock(),s.createElementBlock("div",{key:0,class:"search-dropdown",ref_key:"dropdownRef",ref:r},[e.showLoading?(s.openBlock(),s.createElementBlock("div",Yn,[s.createVNode(g,{icon:["fas","arrows-rotate"],spin:!0})])):e.items.length>0?(s.openBlock(!0),s.createElementBlock(s.Fragment,{key:1},s.renderList(e.items,(v,w)=>(s.openBlock(),s.createElementBlock("button",{key:v.text,class:s.normalizeClass(["dropdown-item",{active:l(v),selected:u(w)}]),onMousedown:s.withModifiers(C=>i(v),["prevent"])},s.toDisplayString(v.text),43,Wn))),128)):s.createCommentVNode("",!0)],512)):s.createCommentVNode("",!0)}}},[["__scopeId","data-v-fc6e0f76"]]),Hn={class:"recent-searches-dropdown"},Gn={class:"recent-searches-header"},Xn={class:"recent-searches-header-text"},Kn={key:1,class:"recent-searches-header-text"},Zn={class:"recent-searches-list"},qn=["onMousedown"],Qn={class:"recent-search-content"},Jn=Q({__name:"RecentSearchesDropdown",props:{items:{type:Array,required:!0},selectedIndex:{type:Number,default:-1},recentSearchesName:{type:String,default:"Recent searches"}},emits:["select","clearRecentSearches"],setup(e,{emit:t}){const n=e,a=t,r=i=>{a("select",i)},o=()=>{a("clearRecentSearches")};return(i,l)=>{const u=s.resolveComponent("font-awesome-icon");return s.openBlock(),s.createElementBlock("div",Hn,[s.createElementVNode("div",Gn,[n.items.length>0?(s.openBlock(),s.createElementBlock(s.Fragment,{key:0},[s.createElementVNode("span",Xn,s.toDisplayString(n.recentSearchesName),1),s.createElementVNode("button",{class:"clear-button",onClick:o,title:"Clear Recent Searches"},[s.createVNode(u,{icon:["fas","trash"]})])],64)):(s.openBlock(),s.createElementBlock("span",Kn,"No recent searches"))]),s.createElementVNode("div",Zn,[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(n.items,(c,d)=>(s.openBlock(),s.createElementBlock("div",{key:d,class:s.normalizeClass(["recent-search-item",{selected:d===n.selectedIndex}]),onMousedown:s.withModifiers(g=>r(c),["prevent"])},[s.createElementVNode("div",Qn,[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(c,(g,v)=>(s.openBlock(),s.createElementBlock("div",{key:v,class:"filter-group"},[(s.openBlock(!0),s.createElementBlock(s.Fragment,null,s.renderList(g,w=>(s.openBlock(),s.createElementBlock("span",{key:w.Operator+w.Value,class:"filter-item"},s.toDisplayString(v)+" "+s.toDisplayString(w.Operator)+" "+s.toDisplayString(Array.isArray(w.Value)?w.Value.join(", "):w.Value),1))),128))]))),128))])],42,qn))),128))])])}}},[["__scopeId","data-v-1567525d"]]);function ea(e,t,n,a,r){const o=s.ref(""),i=s.ref([{type:"input"}]),l=s.ref(null),u=s.ref(null),c=s.ref(null),d=s.ref(!1),g=s.ref([]),v=s.ref([]),w=k=>{const x=[];for(const[_,D]of Object.entries(k))D.forEach(S=>{x.push({type:"token",label:_,operator:{text:S.Operator,code:S.Operator},value:Array.isArray(S.Value)?S.Value:[S.Value]})});x.push({type:"input"}),i.value=x},C=()=>{i.value=[{type:"input"}],o.value="",E()},E=()=>{c.value=null,l.value=null,u.value=null,r()},N=k=>{i.value.splice(k,1),E()},h=async()=>{d.value=!0,await s.nextTick(()=>{b()&&(o.value="")}),E();try{const k={};return i.value.forEach(x=>{x.type==="token"&&x.value&&(k[x.label]||(k[x.label]=[]),k[x.label].push({Operator:x.operator.code,Value:x.value}))}),await t.search({QueryParams:JSON.stringify(k)})}catch(k){throw console.error("Search failed:",k),k}finally{d.value=!1}},b=()=>{if(!o.value)return!1;const k=i.value.find(x=>x.needsValue||x.beingEdited);if(k){const x=i.value.findIndex(D=>D.needsValue||D.beingEdited),_=g.value.findIndex(D=>D.label===k.label);if(g.value[_].type==="values"){if(!g.value[_].values.includes(o.value))return}else if(g.value[_].type==="api"&&!a.value.some(S=>S.text===o.value))return;return u.value=x,l.value=2,i.value[x].value=[o.value],delete i.value[x].needsValue,delete i.value[x].beingEdited,!0}if(l.value===2){const x=g.value[c.value];return x.type==="values"&&!x.values.includes(o.value)?void 0:(i.value[u.value].value=[o.value],delete i.value[u.value].needsValue,delete i.value[u.value].beingEdited,!0)}return n.value&&l.value===null?(i.value.splice(i.value.length-1,0,{type:"token",label:e.freeInputDefaultTokenConfiguration.label,operator:e.freeInputDefaultTokenConfiguration.operator,value:[o.value]}),!0):!1};return{inputText:o,params:i,currentLevel:l,currentParamIndex:u,currentKind:c,loading:d,config:g,lookupFields:v,setParams:w,clearAll:C,resetCurrents:E,removeToken:N,handleSearch:h,parsePendingInput:b}}function ta(e){const t=s.ref([]),n=s.ref(!1),a=s.ref(!1),r=s.ref(-1),o=s.ref({left:0,top:0,width:"auto"});return{dropdownItems:t,showDropdown:n,showDropdownLoading:a,selectedDropdownIndex:r,dropdownPosition:o,updateDropdownPosition:()=>{e.value&&s.nextTick(()=>{const d=document.querySelectorAll(".search-token"),g=d[d.length-1],v=document.querySelector(".search-input"),w=e.value.getBoundingClientRect();if(g){const C=g.getBoundingClientRect();o.value={left:C.right-w.left+4,top:C.bottom-w.top+4}}else if(v){const C=v.getBoundingClientRect();o.value={left:C.left-w.left,top:C.bottom-w.top+4}}})},setDropdownItems:d=>{t.value=d.map(g=>({...g,visible:!0}))},filterDropdownItems:d=>{t.value.length>0&&t.value.forEach(g=>{g.visible=g.text.toLowerCase().includes(d.toLowerCase())})},resetDropdown:()=>{n.value=!1,t.value=[],r.value=-1}}}function na(e){const t=s.ref([]),n=s.ref("Recent searches"),a=s.ref(!1),r=s.ref({left:0,top:0}),o=c=>{const d={};for(const[g,v]of Object.entries(c))d[g]=v.map(w=>({Operator:w.Operator,Value:w.Value}));return d};return{recentSearches:t,recentSearchesName:n,showRecentSearches:a,recentSearchesPosition:r,updateRecentSearches:c=>{if(c&&Object.keys(c).length>0){const d=o(c),g=JSON.stringify(d);t.value=t.value.filter(v=>JSON.stringify(v)!==g),t.value.unshift(d)}},updateRecentSearchesPosition:(c,d)=>{if(c&&d.value){const g=c.getBoundingClientRect(),v=d.value.getBoundingClientRect();r.value={left:g.left-v.left,top:g.bottom-v.top+4}}},clearRecentSearches:async()=>{t.value=[],await e.clearRecentSearches()},cleanSearchParams:o}}const aa={class:"search-container"},ra=["title"],oa=Q({__name:"SearchBox",emits:["search"],setup(e,{emit:t}){const n=s.inject("config",{showHeader:!0,showSearchResults:!0,freeInputDefaultTokenConfiguration:{label:"Fulltext",operator:{text:"=",code:"="}},repeatLastSearchOnPageMount:!0}),a=s.inject("searchService"),r=s.ref(null),o=s.ref(null),{dropdownItems:i,showDropdown:l,showDropdownLoading:u,selectedDropdownIndex:c,dropdownPosition:d,updateDropdownPosition:g,setDropdownItems:v,filterDropdownItems:w,resetDropdown:C}=ta(r),{recentSearches:E,recentSearchesName:N,showRecentSearches:h,recentSearchesPosition:b,updateRecentSearches:k,updateRecentSearchesPosition:x,clearRecentSearches:_,cleanSearchParams:D}=na(a),{inputText:S,params:O,currentLevel:T,currentParamIndex:P,currentKind:K,loading:he,config:W,lookupFields:To,setParams:In,clearAll:Lo,resetCurrents:Z,removeToken:Mo,handleSearch:Do,parsePendingInput:Cn}=ea(n,a,l,i,C),Fo=t,En=async m=>{var p,A;await s.nextTick(),r.value&&!r.value.contains(m.target)&&((A=(p=o.value)==null?void 0:p.el)!=null&&A.contains(m.target)||(T.value===1||Cn()?(P.value!==null&&!O.value[P.value].value&&O.value.splice(P.value,1),S.value="",Z(!0)):(c.value=-1,l.value=!1)),h.value=!1)},Ro=()=>{T.value===null&&ne(),w(S.value)},Ne=async()=>{const m=await Do();m.LastSearchQueryParams&&k(m.LastSearchQueryParams),Fo("search",m)},zo=()=>{if(h.value){h.value=!1;return}s.nextTick(()=>{const m=document.querySelector(".recent-searches-button");x(m,r),h.value=!0})},Bo=m=>{In(m),h.value=!1,E.value=E.value.filter(p=>p!==m),Ne()},ne=()=>{if(T.value!==null){const m=W.value[K.value].type;T.value===2&&(m==="api"||m==="values")&&(l.value=!0);return}Z(),C(),v(W.value.map(m=>({text:m.label,visible:!0}))),l.value=!0,g(),ie()},jo=async m=>{if(m.key==="Escape")if(P.value!==null&&!O.value[P.value].value){O.value.splice(P.value,1),Z(),S.value="",ne();return}else if(T.value===2||T.value===1){if(Wo())return}else S.value="";if(m.key==="Enter"){if(l.value&&c.value>=0){const p=i.value.filter(A=>A.visible);if(p[c.value]){dt(p[c.value]),c.value=-1;return}}if(!S.value&&O.value.length>1&&T.value===null){Ne();return}if(Cn()){Z(),S.value="",ne(),ie();return}}else if(m.key==="Backspace"){if(S.value===""){m.preventDefault();const p=O.value.findLastIndex(A=>A.type!=="input");p!==-1&&(O.value.splice(p,1),Z(),ie())}}else if(l.value){const p=i.value.filter(A=>A.visible);switch(m.key){case"ArrowDown":m.preventDefault(),c.value<p.length-1?c.value++:c.value=0,T.value===2&&p[c.value]&&(S.value=p[c.value].text);break;case"ArrowUp":m.preventDefault(),c.value>0?c.value--:c.value=p.length-1,T.value===2&&p[c.value]&&(S.value=p[c.value].text);break;case"Tab":p.length===1&&(m.preventDefault(),dt(p[0]),c.value=-1,S.value="");break}}},ie=()=>{s.nextTick(()=>{const m=document.querySelectorAll(".search-input"),p=m[m.length-1];p&&p.focus()})},dt=m=>{if(!T.value||T.value===0){if(!P.value){const p=O.value.findIndex(A=>A.type==="input");O.value.splice(p,0,{type:"token"}),P.value=p}K.value=W.value.findIndex(p=>p.label===m.text),O.value[P.value].label=m.text,T.value=1,Vo(),ie()}else if(T.value===1){O.value[P.value].operator={text:m.text,code:m.code},T.value=2,S.value="";const p=W.value[K.value];p.type==="values"||p.type==="api"?($o(),c.value=-1):(l.value=!1,i.value=[]),(p.type==="customtext"||p.type==="values"||p.type==="api")&&(O.value[P.value].needsValue=!0),ie()}else if(T.value===2){const p=O.value[P.value];if(p.beingEdited||p.needsValue){p.value=[m.text],delete p.needsValue,delete p.beingEdited,delete p.originalValue,Z(),S.value="",ne();return}p.value||(p.value=[]);const A=p.value,M=A.indexOf(m.text);M>-1?A.splice(M,1):(A.push(m.text),delete p.needsValue,Z(),S.value="",ne())}},Vo=()=>{const m=W.value[K.value];i.value=m.operators.map(p=>({text:p.label,code:p.code,visible:!0})),g(),l.value=!0},$o=()=>{const m=W.value[K.value];m.type==="values"?(i.value=m.values.map(p=>({text:p,visible:!0})),console.debug("createListLevel2: values",i.value),g(),l.value=!0):m.type==="api"?(u.value=!0,a.getApiValuesList(m.api).then(p=>{i.value=p.map(A=>({text:A,visible:!0})),g(),l.value=!0,u.value=!1,console.debug("createListLevel2: api",i.value)})):(i.value=O.value[P.value].value||[],l.value=!0)},Yo=(m,p)=>{if(console.debug("handleTokenClick",m,p),m.value===void 0){console.debug("handleTokenClick: token is not yet created");return}if(P.value!==null||T.value!==null){console.debug("handleTokenClick: another token is currently being created or edited");return}if(P.value=p,K.value=W.value.findIndex(M=>M.label===m.label),K.value===-1){console.error("Could not determine token kind for",m.label);return}T.value=2,S.value=m.value[0],m.originalValue=[...m.value],m.beingEdited=!0;const A=W.value[K.value];A.type==="values"?(i.value=A.values.map(M=>({text:M,visible:!0})),l.value=!0,c.value=-1,g()):A.type==="api"&&(u.value=!0,l.value=!0,a.getApiValuesList(A.api).then(M=>{i.value=M.map(Uo=>({text:Uo,visible:!0})),u.value=!1,c.value=-1,g()})),ie()},Wo=()=>{if(P.value!==null){const m=O.value[P.value];if(m.beingEdited&&m.originalValue)return m.value=[...m.originalValue],m.originalOperator&&(m.operator={...m.originalOperator}),delete m.originalValue,delete m.originalOperator,delete m.beingEdited,S.value="",Z(),ne(),!0}return!1};return s.onMounted(async()=>{var m;he.value=!0;try{const p=await a.getInitialData(!0);W.value=p.Config,To.value=p.LookupFields;const A=(m=p.MoreOptions)==null?void 0:m.find(M=>M.ID==="last-saved-filters");N.value=(A==null?void 0:A.Name)||"Recent searches",A!=null&&A.Items&&(E.value=A.Items.map(M=>D(M))),p.LastSearchQueryParams&&Object.keys(p.LastSearchQueryParams).length>0&&In(p.LastSearchQueryParams)}catch(p){console.error("Failed to load initial data:",p)}finally{n.repeatLastSearchOnPageMount&&O.value.length>1?Ne():he.value=!1}document.addEventListener("click",En)}),s.onBeforeUnmount(()=>{document.removeEventListener("click",En)}),s.watch(l,m=>{m&&g()}),(m,p)=>{const A=s.resolveComponent("font-awesome-icon");return s.openBlock(),s.createElementBlock("div",{class:s.normalizeClass(["search-box",{"is-loading":s.unref(he)}]),ref_key:"searchBoxRef",ref:r},[s.createElementVNode("div",aa,[s.createElementVNode("button",{class:s.normalizeClass(["recent-searches-button",{active:s.unref(h)}]),onClick:zo,title:s.unref(N)},[s.createVNode(A,{icon:["fas","clock"]})],10,ra),s.createVNode(Fn,{params:s.unref(O),"input-text":s.unref(S),"current-level":s.unref(T),loading:s.unref(he),"onUpdate:inputText":p[0]||(p[0]=M=>S.value=M),onRemoveToken:s.unref(Mo),onTokenClick:Yo,onInputFocus:ne,onInputInput:Ro,onInputKeydown:jo},null,8,["params","input-text","current-level","loading","onRemoveToken"]),s.createVNode($n,{"show-clear":s.unref(O).length>1,loading:s.unref(he),onClear:s.unref(Lo),onSearch:Ne},null,8,["show-clear","loading","onClear"]),s.unref(l)?(s.openBlock(),s.createBlock(Un,{key:0,ref_key:"searchDropdownRef",ref:o,items:s.unref(i).filter(M=>M.visible),"show-loading":s.unref(u),"filter-text":s.unref(S),"active-item":s.unref(P)!==null?s.unref(O)[s.unref(P)].value:"","selected-index":s.unref(c),style:s.normalizeStyle({position:"absolute",left:`${s.unref(d).left}px`,top:`${s.unref(d).top}px`}),onSelect:dt},null,8,["items","show-loading","filter-text","active-item","selected-index","style"])):s.createCommentVNode("",!0),s.unref(h)?(s.openBlock(),s.createBlock(Jn,{key:1,items:s.unref(E),style:s.normalizeStyle({position:"absolute",left:`${s.unref(b).left}px`,top:`${s.unref(b).top}px`}),"recent-searches-name":s.unref(N),onSelect:Bo,onClearRecentSearches:s.unref(_)},null,8,["items","style","recent-searches-name","onClearRecentSearches"])):s.createCommentVNode("",!0)])],2)}}},[["__scopeId","data-v-017ff523"]]),sa={class:"app_search_frontend_vue_inner"},ia={key:0,class:"app_search_frontend_vue_header"},la=["innerHTML"],ca={__name:"App",setup(e){const t=s.ref(""),n=s.inject("config",{showHeader:!0,showSearchResults:!0,freeInputDefaultTokenConfiguration:{label:"Fulltext",operator:{text:"=",code:"="}},repeatLastSearchOnPageMount:!0}),a=r=>{t.value=r.HTML};return(r,o)=>(s.openBlock(),s.createElementBlock("div",sa,[s.unref(n).showHeader?(s.openBlock(),s.createElementBlock("div",ia,o[0]||(o[0]=[s.createElementVNode("img",{alt:"Vue logo",class:"logo",src:_n,width:"125",height:"125"},null,-1),s.createElementVNode("h1",null,"Znuny Search Frontend",-1)]))):s.createCommentVNode("",!0),s.createElementVNode("main",null,[s.createVNode(oa,{onSearch:a}),s.unref(n).showSearchResults?(s.openBlock(),s.createElementBlock("div",{key:0,class:"search-results",innerHTML:t.value},null,8,la)):s.createCommentVNode("",!0)])]))}};/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function fa(e,t,n){return(t=da(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function mt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?mt(Object(n),!0).forEach(function(a){fa(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):mt(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function ua(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function da(e){var t=ua(e,"string");return typeof t=="symbol"?t:t+""}const pt=()=>{};let Pe={},gt={},ht=null,yt={mark:pt,measure:pt};try{typeof window<"u"&&(Pe=window),typeof document<"u"&&(gt=document),typeof MutationObserver<"u"&&(ht=MutationObserver),typeof performance<"u"&&(yt=performance)}catch{}const{userAgent:vt=""}=Pe.navigator||{},U=Pe,I=gt,bt=ht,ye=yt;U.document;const V=!!I.documentElement&&!!I.head&&typeof I.addEventListener=="function"&&typeof I.createElement=="function",xt=~vt.indexOf("MSIE")||~vt.indexOf("Trident/");var ma=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,pa=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,kt={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},ga={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},wt=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],L="classic",ve="duotone",ha="sharp",ya="sharp-duotone",St=[L,ve,ha,ya],va={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},ba={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},xa=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),ka={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},wa=["fak","fa-kit","fakd","fa-kit-duotone"],At={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Sa=["kit"],Aa={kit:{"fa-kit":"fak"}},Ia=["fak","fakd"],Ca={kit:{fak:"fa-kit"}},It={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},be={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Ea=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],_a=["fak","fa-kit","fakd","fa-kit-duotone"],Oa={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},Na={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},Pa={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Te={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},Ta=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],Le=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...Ea,...Ta],La=["solid","regular","light","thin","duotone","brands"],Ct=[1,2,3,4,5,6,7,8,9,10],Ma=Ct.concat([11,12,13,14,15,16,17,18,19,20]),Da=[...Object.keys(Pa),...La,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",be.GROUP,be.SWAP_OPACITY,be.PRIMARY,be.SECONDARY].concat(Ct.map(e=>"".concat(e,"x"))).concat(Ma.map(e=>"w-".concat(e))),Fa={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const $="___FONT_AWESOME___",Me=16,Et="fa",_t="svg-inline--fa",J="data-fa-i2svg",De="data-fa-pseudo-element",Ra="data-fa-pseudo-element-pending",Fe="data-prefix",Re="data-icon",Ot="fontawesome-i2svg",za="async",Ba=["HTML","HEAD","STYLE","SCRIPT"],Nt=(()=>{try{return process.env.NODE_ENV==="production"}catch{return!1}})();function le(e){return new Proxy(e,{get(t,n){return n in t?t[n]:t[L]}})}const Pt=f({},kt);Pt[L]=f(f(f(f({},{"fa-duotone":"duotone"}),kt[L]),At.kit),At["kit-duotone"]);const ja=le(Pt),ze=f({},ka);ze[L]=f(f(f(f({},{duotone:"fad"}),ze[L]),It.kit),It["kit-duotone"]);const Tt=le(ze),Be=f({},Te);Be[L]=f(f({},Be[L]),Ca.kit);const je=le(Be),Ve=f({},Na);Ve[L]=f(f({},Ve[L]),Aa.kit),le(Ve);const Va=ma,Lt="fa-layers-text",$a=pa,Ya=f({},va);le(Ya);const Wa=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],$e=ga,Ua=[...Sa,...Da],ce=U.FontAwesomeConfig||{};function Ha(e){var t=I.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function Ga(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}I&&typeof I.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(t=>{let[n,a]=t;const r=Ga(Ha(n));r!=null&&(ce[a]=r)});const Mt={styleDefault:"solid",familyDefault:L,cssPrefix:Et,replacementClass:_t,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};ce.familyPrefix&&(ce.cssPrefix=ce.familyPrefix);const ae=f(f({},Mt),ce);ae.autoReplaceSvg||(ae.observeMutations=!1);const y={};Object.keys(Mt).forEach(e=>{Object.defineProperty(y,e,{enumerable:!0,set:function(t){ae[e]=t,fe.forEach(n=>n(y))},get:function(){return ae[e]}})}),Object.defineProperty(y,"familyPrefix",{enumerable:!0,set:function(e){ae.cssPrefix=e,fe.forEach(t=>t(y))},get:function(){return ae.cssPrefix}}),U.FontAwesomeConfig=y;const fe=[];function Xa(e){return fe.push(e),()=>{fe.splice(fe.indexOf(e),1)}}const H=Me,B={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Ka(e){if(!e||!V)return;const t=I.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;const n=I.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const o=n[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=o)}return I.head.insertBefore(t,a),e}const Za="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function ue(){let e=12,t="";for(;e-- >0;)t+=Za[Math.random()*62|0];return t}function re(e){const t=[];for(let n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function Ye(e){return e.classList?re(e.classList):(e.getAttribute("class")||"").split(" ").filter(t=>t)}function Dt(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function qa(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,'="').concat(Dt(e[n]),'" '),"").trim()}function xe(e){return Object.keys(e||{}).reduce((t,n)=>t+"".concat(n,": ").concat(e[n].trim(),";"),"")}function We(e){return e.size!==B.size||e.x!==B.x||e.y!==B.y||e.rotate!==B.rotate||e.flipX||e.flipY}function Qa(e){let{transform:t,containerWidth:n,iconWidth:a}=e;const r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(t.x*32,", ").concat(t.y*32,") "),i="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),l="rotate(".concat(t.rotate," 0 0)"),u={transform:"".concat(o," ").concat(i," ").concat(l)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:u,path:c}}function Ja(e){let{transform:t,width:n=Me,height:a=Me,startCentered:r=!1}=e,o="";return r&&xt?o+="translate(".concat(t.x/H-n/2,"em, ").concat(t.y/H-a/2,"em) "):r?o+="translate(calc(-50% + ".concat(t.x/H,"em), calc(-50% + ").concat(t.y/H,"em)) "):o+="translate(".concat(t.x/H,"em, ").concat(t.y/H,"em) "),o+="scale(".concat(t.size/H*(t.flipX?-1:1),", ").concat(t.size/H*(t.flipY?-1:1),") "),o+="rotate(".concat(t.rotate,"deg) "),o}var er=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function Ft(){const e=Et,t=_t,n=y.cssPrefix,a=y.replacementClass;let r=er;if(n!==e||a!==t){const o=new RegExp("\\.".concat(e,"\\-"),"g"),i=new RegExp("\\--".concat(e,"\\-"),"g"),l=new RegExp("\\.".concat(t),"g");r=r.replace(o,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(l,".".concat(a))}return r}let Rt=!1;function Ue(){y.autoAddCss&&!Rt&&(Ka(Ft()),Rt=!0)}var tr={mixout(){return{dom:{css:Ft,insertCss:Ue}}},hooks(){return{beforeDOMElementCreation(){Ue()},beforeI2svg(){Ue()}}}};const Y=U||{};Y[$]||(Y[$]={}),Y[$].styles||(Y[$].styles={}),Y[$].hooks||(Y[$].hooks={}),Y[$].shims||(Y[$].shims=[]);var j=Y[$];const zt=[],Bt=function(){I.removeEventListener("DOMContentLoaded",Bt),ke=1,zt.map(e=>e())};let ke=!1;V&&(ke=(I.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(I.readyState),ke||I.addEventListener("DOMContentLoaded",Bt));function nr(e){V&&(ke?setTimeout(e,0):zt.push(e))}function de(e){const{tag:t,attributes:n={},children:a=[]}=e;return typeof e=="string"?Dt(e):"<".concat(t," ").concat(qa(n),">").concat(a.map(de).join(""),"</").concat(t,">")}function jt(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var He=function(t,n,a,r){var o=Object.keys(t),i=o.length,l=n,u,c,d;for(a===void 0?(u=1,d=t[o[0]]):(u=0,d=a);u<i;u++)c=o[u],d=l(d,t[c],c,t);return d};function ar(e){const t=[];let n=0;const a=e.length;for(;n<a;){const r=e.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const o=e.charCodeAt(n++);(o&64512)==56320?t.push(((r&1023)<<10)+(o&1023)+65536):(t.push(r),n--)}else t.push(r)}return t}function Ge(e){const t=ar(e);return t.length===1?t[0].toString(16):null}function rr(e,t){const n=e.length;let a=e.charCodeAt(t),r;return a>=55296&&a<=56319&&n>t+1&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function Vt(e){return Object.keys(e).reduce((t,n)=>{const a=e[n];return!!a.icon?t[a.iconName]=a.icon:t[n]=a,t},{})}function Xe(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=Vt(t);typeof j.hooks.addPack=="function"&&!a?j.hooks.addPack(e,Vt(t)):j.styles[e]=f(f({},j.styles[e]||{}),r),e==="fas"&&Xe("fa",t)}const{styles:me,shims:or}=j,$t=Object.keys(je),sr=$t.reduce((e,t)=>(e[t]=Object.keys(je[t]),e),{});let Ke=null,Yt={},Wt={},Ut={},Ht={},Gt={};function ir(e){return~Ua.indexOf(e)}function lr(e,t){const n=t.split("-"),a=n[0],r=n.slice(1).join("-");return a===e&&r!==""&&!ir(r)?r:null}const Xt=()=>{const e=a=>He(me,(r,o,i)=>(r[i]=He(o,a,{}),r),{});Yt=e((a,r,o)=>(r[3]&&(a[r[3]]=o),r[2]&&r[2].filter(l=>typeof l=="number").forEach(l=>{a[l.toString(16)]=o}),a)),Wt=e((a,r,o)=>(a[o]=o,r[2]&&r[2].filter(l=>typeof l=="string").forEach(l=>{a[l]=o}),a)),Gt=e((a,r,o)=>{const i=r[2];return a[o]=o,i.forEach(l=>{a[l]=o}),a});const t="far"in me||y.autoFetchSvg,n=He(or,(a,r)=>{const o=r[0];let i=r[1];const l=r[2];return i==="far"&&!t&&(i="fas"),typeof o=="string"&&(a.names[o]={prefix:i,iconName:l}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:i,iconName:l}),a},{names:{},unicodes:{}});Ut=n.names,Ht=n.unicodes,Ke=we(y.styleDefault,{family:y.familyDefault})};Xa(e=>{Ke=we(e.styleDefault,{family:y.familyDefault})}),Xt();function Ze(e,t){return(Yt[e]||{})[t]}function cr(e,t){return(Wt[e]||{})[t]}function ee(e,t){return(Gt[e]||{})[t]}function Kt(e){return Ut[e]||{prefix:null,iconName:null}}function fr(e){const t=Ht[e],n=Ze("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function G(){return Ke}const Zt=()=>({prefix:null,iconName:null,rest:[]});function ur(e){let t=L;const n=$t.reduce((a,r)=>(a[r]="".concat(y.cssPrefix,"-").concat(r),a),{});return St.forEach(a=>{(e.includes(n[a])||e.some(r=>sr[a].includes(r)))&&(t=a)}),t}function we(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=L}=t,a=ja[n][e];if(n===ve&&!e)return"fad";const r=Tt[n][e]||Tt[n][a],o=e in j.styles?e:null;return r||o||null}function dr(e){let t=[],n=null;return e.forEach(a=>{const r=lr(y.cssPrefix,a);r?n=r:a&&t.push(a)}),{iconName:n,rest:t}}function qt(e){return e.sort().filter((t,n,a)=>a.indexOf(t)===n)}function Se(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=t;let a=null;const r=Le.concat(_a),o=qt(e.filter(g=>r.includes(g))),i=qt(e.filter(g=>!Le.includes(g))),l=o.filter(g=>(a=g,!wt.includes(g))),[u=null]=l,c=ur(o),d=f(f({},dr(i)),{},{prefix:we(u,{family:c})});return f(f(f({},d),hr({values:e,family:c,styles:me,config:y,canonical:d,givenPrefix:a})),mr(n,a,d))}function mr(e,t,n){let{prefix:a,iconName:r}=n;if(e||!a||!r)return{prefix:a,iconName:r};const o=t==="fa"?Kt(r):{},i=ee(a,r);return r=o.iconName||i||r,a=o.prefix||a,a==="far"&&!me.far&&me.fas&&!y.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}const pr=St.filter(e=>e!==L||e!==ve),gr=Object.keys(Te).filter(e=>e!==L).map(e=>Object.keys(Te[e])).flat();function hr(e){const{values:t,family:n,canonical:a,givenPrefix:r="",styles:o={},config:i={}}=e,l=n===ve,u=t.includes("fa-duotone")||t.includes("fad"),c=i.familyDefault==="duotone",d=a.prefix==="fad"||a.prefix==="fa-duotone";if(!l&&(u||c||d)&&(a.prefix="fad"),(t.includes("fa-brands")||t.includes("fab"))&&(a.prefix="fab"),!a.prefix&&pr.includes(n)&&(Object.keys(o).find(v=>gr.includes(v))||i.autoFetchSvg)){const v=xa.get(n).defaultShortPrefixId;a.prefix=v,a.iconName=ee(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||r==="fa")&&(a.prefix=G()||"fas"),a}class yr{constructor(){this.definitions={}}add(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(o=>{this.definitions[o]=f(f({},this.definitions[o]||{}),r[o]),Xe(o,r[o]);const i=je[L][o];i&&Xe(i,r[o]),Xt()})}reset(){this.definitions={}}_pullDefinitions(t,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:o,iconName:i,icon:l}=a[r],u=l[2];t[o]||(t[o]={}),u.length>0&&u.forEach(c=>{typeof c=="string"&&(t[o][c]=l)}),t[o][i]=l}),t}}let Qt=[],oe={};const se={},vr=Object.keys(se);function br(e,t){let{mixoutsTo:n}=t;return Qt=e,oe={},Object.keys(se).forEach(a=>{vr.indexOf(a)===-1&&delete se[a]}),Qt.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(o=>{typeof r[o]=="function"&&(n[o]=r[o]),typeof r[o]=="object"&&Object.keys(r[o]).forEach(i=>{n[o]||(n[o]={}),n[o][i]=r[o][i]})}),a.hooks){const o=a.hooks();Object.keys(o).forEach(i=>{oe[i]||(oe[i]=[]),oe[i].push(o[i])})}a.provides&&a.provides(se)}),n}function qe(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(oe[e]||[]).forEach(i=>{t=i.apply(null,[t,...a])}),t}function te(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];(oe[e]||[]).forEach(o=>{o.apply(null,n)})}function X(){const e=arguments[0],t=Array.prototype.slice.call(arguments,1);return se[e]?se[e].apply(null,t):void 0}function Qe(e){e.prefix==="fa"&&(e.prefix="fas");let{iconName:t}=e;const n=e.prefix||G();if(t)return t=ee(n,t)||t,jt(Jt.definitions,n,t)||jt(j.styles,n,t)}const Jt=new yr,R={noAuto:()=>{y.autoReplaceSvg=!1,y.observeMutations=!1,te("noAuto")},config:y,dom:{i2svg:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return V?(te("beforeI2svg",e),X("pseudoElements2svg",e),X("i2svg",e)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t}=e;y.autoReplaceSvg===!1&&(y.autoReplaceSvg=!0),y.observeMutations=!0,nr(()=>{xr({autoReplaceSvgRoot:t}),te("watch",e)})}},parse:{icon:e=>{if(e===null)return null;if(typeof e=="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:ee(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){const t=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],n=we(e[0]);return{prefix:n,iconName:ee(n,t)||t}}if(typeof e=="string"&&(e.indexOf("".concat(y.cssPrefix,"-"))>-1||e.match(Va))){const t=Se(e.split(" "),{skipLookups:!0});return{prefix:t.prefix||G(),iconName:ee(t.prefix,t.iconName)||t.iconName}}if(typeof e=="string"){const t=G();return{prefix:t,iconName:ee(t,e)||e}}}},library:Jt,findIconDefinition:Qe,toHtml:de},xr=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:t=I}=e;(Object.keys(j.styles).length>0||y.autoFetchSvg)&&V&&y.autoReplaceSvg&&R.dom.i2svg({node:t})};function Ae(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(n=>de(n))}}),Object.defineProperty(e,"node",{get:function(){if(!V)return;const n=I.createElement("div");return n.innerHTML=e.html,n.children}}),e}function kr(e){let{children:t,main:n,mask:a,attributes:r,styles:o,transform:i}=e;if(We(i)&&n.found&&!a.found){const{width:l,height:u}=n,c={x:l/u/2,y:.5};r.style=xe(f(f({},o),{},{"transform-origin":"".concat(c.x+i.x/16,"em ").concat(c.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:t}]}function wr(e){let{prefix:t,iconName:n,children:a,attributes:r,symbol:o}=e;const i=o===!0?"".concat(t,"-").concat(y.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:f(f({},r),{},{id:i}),children:a}]}]}function Je(e){const{icons:{main:t,mask:n},prefix:a,iconName:r,transform:o,symbol:i,title:l,maskId:u,titleId:c,extra:d,watchable:g=!1}=e,{width:v,height:w}=n.found?n:t,C=Ia.includes(a),E=[y.replacementClass,r?"".concat(y.cssPrefix,"-").concat(r):""].filter(_=>d.classes.indexOf(_)===-1).filter(_=>_!==""||!!_).concat(d.classes).join(" ");let N={children:[],attributes:f(f({},d.attributes),{},{"data-prefix":a,"data-icon":r,class:E,role:d.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(v," ").concat(w)})};const h=C&&!~d.classes.indexOf("fa-fw")?{width:"".concat(v/w*16*.0625,"em")}:{};g&&(N.attributes[J]=""),l&&(N.children.push({tag:"title",attributes:{id:N.attributes["aria-labelledby"]||"title-".concat(c||ue())},children:[l]}),delete N.attributes.title);const b=f(f({},N),{},{prefix:a,iconName:r,main:t,mask:n,maskId:u,transform:o,symbol:i,styles:f(f({},h),d.styles)}),{children:k,attributes:x}=n.found&&t.found?X("generateAbstractMask",b)||{children:[],attributes:{}}:X("generateAbstractIcon",b)||{children:[],attributes:{}};return b.children=k,b.attributes=x,i?wr(b):kr(b)}function en(e){const{content:t,width:n,height:a,transform:r,title:o,extra:i,watchable:l=!1}=e,u=f(f(f({},i.attributes),o?{title:o}:{}),{},{class:i.classes.join(" ")});l&&(u[J]="");const c=f({},i.styles);We(r)&&(c.transform=Ja({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const d=xe(c);d.length>0&&(u.style=d);const g=[];return g.push({tag:"span",attributes:u,children:[t]}),o&&g.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),g}function Sr(e){const{content:t,title:n,extra:a}=e,r=f(f(f({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),o=xe(a.styles);o.length>0&&(r.style=o);const i=[];return i.push({tag:"span",attributes:r,children:[t]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:et}=j;function tt(e){const t=e[0],n=e[1],[a]=e.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(y.cssPrefix,"-").concat($e.GROUP)},children:[{tag:"path",attributes:{class:"".concat(y.cssPrefix,"-").concat($e.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(y.cssPrefix,"-").concat($e.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:t,height:n,icon:r}}const Ar={found:!1,width:512,height:512};function Ir(e,t){!Nt&&!y.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function nt(e,t){let n=t;return t==="fa"&&y.styleDefault!==null&&(t=G()),new Promise((a,r)=>{if(n==="fa"){const o=Kt(e)||{};e=o.iconName||e,t=o.prefix||t}if(e&&t&&et[t]&&et[t][e]){const o=et[t][e];return a(tt(o))}Ir(e,t),a(f(f({},Ar),{},{icon:y.showMissingIcons&&e?X("missingIconAbstract")||{}:{}}))})}const tn=()=>{},at=y.measurePerformance&&ye&&ye.mark&&ye.measure?ye:{mark:tn,measure:tn},pe='FA "6.7.2"',Cr=e=>(at.mark("".concat(pe," ").concat(e," begins")),()=>nn(e)),nn=e=>{at.mark("".concat(pe," ").concat(e," ends")),at.measure("".concat(pe," ").concat(e),"".concat(pe," ").concat(e," begins"),"".concat(pe," ").concat(e," ends"))};var rt={begin:Cr,end:nn};const Ie=()=>{};function an(e){return typeof(e.getAttribute?e.getAttribute(J):null)=="string"}function Er(e){const t=e.getAttribute?e.getAttribute(Fe):null,n=e.getAttribute?e.getAttribute(Re):null;return t&&n}function _r(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(y.replacementClass)}function Or(){return y.autoReplaceSvg===!0?Ce.replace:Ce[y.autoReplaceSvg]||Ce.replace}function Nr(e){return I.createElementNS("http://www.w3.org/2000/svg",e)}function Pr(e){return I.createElement(e)}function rn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=e.tag==="svg"?Nr:Pr}=t;if(typeof e=="string")return I.createTextNode(e);const a=n(e.tag);return Object.keys(e.attributes||[]).forEach(function(o){a.setAttribute(o,e.attributes[o])}),(e.children||[]).forEach(function(o){a.appendChild(rn(o,{ceFn:n}))}),a}function Tr(e){let t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}const Ce={replace:function(e){const t=e[0];if(t.parentNode)if(e[1].forEach(n=>{t.parentNode.insertBefore(rn(n),t)}),t.getAttribute(J)===null&&y.keepOriginalSource){let n=I.createComment(Tr(t));t.parentNode.replaceChild(n,t)}else t.remove()},nest:function(e){const t=e[0],n=e[1];if(~Ye(t).indexOf(y.replacementClass))return Ce.replace(e);const a=new RegExp("".concat(y.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((i,l)=>(l===y.replacementClass||l.match(a)?i.toSvg.push(l):i.toNode.push(l),i),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?t.removeAttribute("class"):t.setAttribute("class",o.toNode.join(" "))}const r=n.map(o=>de(o)).join(`
`);t.setAttribute(J,""),t.innerHTML=r}};function on(e){e()}function sn(e,t){const n=typeof t=="function"?t:Ie;if(e.length===0)n();else{let a=on;y.mutateApproach===za&&(a=U.requestAnimationFrame||on),a(()=>{const r=Or(),o=rt.begin("mutate");e.map(r),o(),n()})}}let ot=!1;function ln(){ot=!0}function st(){ot=!1}let Ee=null;function cn(e){if(!bt||!y.observeMutations)return;const{treeCallback:t=Ie,nodeCallback:n=Ie,pseudoElementsCallback:a=Ie,observeMutationsRoot:r=I}=e;Ee=new bt(o=>{if(ot)return;const i=G();re(o).forEach(l=>{if(l.type==="childList"&&l.addedNodes.length>0&&!an(l.addedNodes[0])&&(y.searchPseudoElements&&a(l.target),t(l.target)),l.type==="attributes"&&l.target.parentNode&&y.searchPseudoElements&&a(l.target.parentNode),l.type==="attributes"&&an(l.target)&&~Wa.indexOf(l.attributeName))if(l.attributeName==="class"&&Er(l.target)){const{prefix:u,iconName:c}=Se(Ye(l.target));l.target.setAttribute(Fe,u||i),c&&l.target.setAttribute(Re,c)}else _r(l.target)&&n(l.target)})}),V&&Ee.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Lr(){Ee&&Ee.disconnect()}function Mr(e){const t=e.getAttribute("style");let n=[];return t&&(n=t.split(";").reduce((a,r)=>{const o=r.split(":"),i=o[0],l=o.slice(1);return i&&l.length>0&&(a[i]=l.join(":").trim()),a},{})),n}function Dr(e){const t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),a=e.innerText!==void 0?e.innerText.trim():"";let r=Se(Ye(e));return r.prefix||(r.prefix=G()),t&&n&&(r.prefix=t,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=cr(r.prefix,e.innerText)||Ze(r.prefix,Ge(e.innerText))),!r.iconName&&y.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=e.firstChild.data)),r}function Fr(e){const t=re(e.attributes).reduce((r,o)=>(r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r),{}),n=e.getAttribute("title"),a=e.getAttribute("data-fa-title-id");return y.autoA11y&&(n?t["aria-labelledby"]="".concat(y.replacementClass,"-title-").concat(a||ue()):(t["aria-hidden"]="true",t.focusable="false")),t}function Rr(){return{iconName:null,title:null,titleId:null,prefix:null,transform:B,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function fn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=Dr(e),o=Fr(e),i=qe("parseNodeAttributes",{},e);let l=t.styleParser?Mr(e):[];return f({iconName:n,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:B,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:l,attributes:o}},i)}const{styles:zr}=j;function un(e){const t=y.autoReplaceSvg==="nest"?fn(e,{styleParser:!1}):fn(e);return~t.extra.classes.indexOf(Lt)?X("generateLayersText",e,t):X("generateSvgReplacementMutation",e,t)}function Br(){return[...wa,...Le]}function dn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!V)return Promise.resolve();const n=I.documentElement.classList,a=d=>n.add("".concat(Ot,"-").concat(d)),r=d=>n.remove("".concat(Ot,"-").concat(d)),o=y.autoFetchSvg?Br():wt.concat(Object.keys(zr));o.includes("fa")||o.push("fa");const i=[".".concat(Lt,":not([").concat(J,"])")].concat(o.map(d=>".".concat(d,":not([").concat(J,"])"))).join(", ");if(i.length===0)return Promise.resolve();let l=[];try{l=re(e.querySelectorAll(i))}catch{}if(l.length>0)a("pending"),r("complete");else return Promise.resolve();const u=rt.begin("onTree"),c=l.reduce((d,g)=>{try{const v=un(g);v&&d.push(v)}catch(v){Nt||v.name==="MissingIcon"&&console.error(v)}return d},[]);return new Promise((d,g)=>{Promise.all(c).then(v=>{sn(v,()=>{a("active"),a("complete"),r("pending"),typeof t=="function"&&t(),u(),d()})}).catch(v=>{u(),g(v)})})}function jr(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;un(e).then(n=>{n&&sn([n],t)})}function Vr(e){return function(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(t||{}).icon?t:Qe(t||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Qe(r||{})),e(a,f(f({},n),{},{mask:r}))}}const $r=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=B,symbol:a=!1,mask:r=null,maskId:o=null,title:i=null,titleId:l=null,classes:u=[],attributes:c={},styles:d={}}=t;if(!e)return;const{prefix:g,iconName:v,icon:w}=e;return Ae(f({type:"icon"},e),()=>(te("beforeDOMElementCreation",{iconDefinition:e,params:t}),y.autoA11y&&(i?c["aria-labelledby"]="".concat(y.replacementClass,"-title-").concat(l||ue()):(c["aria-hidden"]="true",c.focusable="false")),Je({icons:{main:tt(w),mask:r?tt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:v,transform:f(f({},B),n),symbol:a,title:i,maskId:o,titleId:l,extra:{attributes:c,styles:d,classes:u}})))};var Yr={mixout(){return{icon:Vr($r)}},hooks(){return{mutationObserverCallbacks(e){return e.treeCallback=dn,e.nodeCallback=jr,e}}},provides(e){e.i2svg=function(t){const{node:n=I,callback:a=()=>{}}=t;return dn(n,a)},e.generateSvgReplacementMutation=function(t,n){const{iconName:a,title:r,titleId:o,prefix:i,transform:l,symbol:u,mask:c,maskId:d,extra:g}=n;return new Promise((v,w)=>{Promise.all([nt(a,i),c.iconName?nt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(C=>{let[E,N]=C;v([t,Je({icons:{main:E,mask:N},prefix:i,iconName:a,transform:l,symbol:u,maskId:d,title:r,titleId:o,extra:g,watchable:!0})])}).catch(w)})},e.generateAbstractIcon=function(t){let{children:n,attributes:a,main:r,transform:o,styles:i}=t;const l=xe(i);l.length>0&&(a.style=l);let u;return We(o)&&(u=X("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),n.push(u||r.icon),{children:n,attributes:a}}}},Wr={mixout(){return{layer(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=t;return Ae({type:"layer"},()=>{te("beforeDOMElementCreation",{assembler:e,params:t});let a=[];return e(r=>{Array.isArray(r)?r.map(o=>{a=a.concat(o.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(y.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Ur={mixout(){return{counter(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:o={}}=t;return Ae({type:"counter",content:e},()=>(te("beforeDOMElementCreation",{content:e,params:t}),Sr({content:e.toString(),title:n,extra:{attributes:r,styles:o,classes:["".concat(y.cssPrefix,"-layers-counter"),...a]}})))}}}},Hr={mixout(){return{text(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=B,title:a=null,classes:r=[],attributes:o={},styles:i={}}=t;return Ae({type:"text",content:e},()=>(te("beforeDOMElementCreation",{content:e,params:t}),en({content:e,transform:f(f({},B),n),title:a,extra:{attributes:o,styles:i,classes:["".concat(y.cssPrefix,"-layers-text"),...r]}})))}}},provides(e){e.generateLayersText=function(t,n){const{title:a,transform:r,extra:o}=n;let i=null,l=null;if(xt){const u=parseInt(getComputedStyle(t).fontSize,10),c=t.getBoundingClientRect();i=c.width/u,l=c.height/u}return y.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([t,en({content:t.innerHTML,width:i,height:l,transform:r,title:a,extra:o,watchable:!0})])}}};const Gr=new RegExp('"',"ug"),mn=[1105920,1112319],pn=f(f(f(f({},{FontAwesome:{normal:"fas",400:"fas"}}),ba),Fa),Oa),it=Object.keys(pn).reduce((e,t)=>(e[t.toLowerCase()]=pn[t],e),{}),Xr=Object.keys(it).reduce((e,t)=>{const n=it[t];return e[t]=n[900]||[...Object.entries(n)][0][1],e},{});function Kr(e){const t=e.replace(Gr,""),n=rr(t,0),a=n>=mn[0]&&n<=mn[1],r=t.length===2?t[0]===t[1]:!1;return{value:Ge(r?t[0]:t),isSecondary:a||r}}function Zr(e,t){const n=e.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(t),r=isNaN(a)?"normal":a;return(it[n]||{})[r]||Xr[n]}function gn(e,t){const n="".concat(Ra).concat(t.replace(":","-"));return new Promise((a,r)=>{if(e.getAttribute(n)!==null)return a();const i=re(e.children).filter(v=>v.getAttribute(De)===t)[0],l=U.getComputedStyle(e,t),u=l.getPropertyValue("font-family"),c=u.match($a),d=l.getPropertyValue("font-weight"),g=l.getPropertyValue("content");if(i&&!c)return e.removeChild(i),a();if(c&&g!=="none"&&g!==""){const v=l.getPropertyValue("content");let w=Zr(u,d);const{value:C,isSecondary:E}=Kr(v),N=c[0].startsWith("FontAwesome");let h=Ze(w,C),b=h;if(N){const k=fr(C);k.iconName&&k.prefix&&(h=k.iconName,w=k.prefix)}if(h&&!E&&(!i||i.getAttribute(Fe)!==w||i.getAttribute(Re)!==b)){e.setAttribute(n,b),i&&e.removeChild(i);const k=Rr(),{extra:x}=k;x.attributes[De]=t,nt(h,w).then(_=>{const D=Je(f(f({},k),{},{icons:{main:_,mask:Zt()},prefix:w,iconName:b,extra:x,watchable:!0})),S=I.createElementNS("http://www.w3.org/2000/svg","svg");t==="::before"?e.insertBefore(S,e.firstChild):e.appendChild(S),S.outerHTML=D.map(O=>de(O)).join(`
`),e.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function qr(e){return Promise.all([gn(e,"::before"),gn(e,"::after")])}function Qr(e){return e.parentNode!==document.head&&!~Ba.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(De)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function hn(e){if(V)return new Promise((t,n)=>{const a=re(e.querySelectorAll("*")).filter(Qr).map(qr),r=rt.begin("searchPseudoElements");ln(),Promise.all(a).then(()=>{r(),st(),t()}).catch(()=>{r(),st(),n()})})}var Jr={hooks(){return{mutationObserverCallbacks(e){return e.pseudoElementsCallback=hn,e}}},provides(e){e.pseudoElements2svg=function(t){const{node:n=I}=t;y.searchPseudoElements&&hn(n)}}};let yn=!1;var eo={mixout(){return{dom:{unwatch(){ln(),yn=!0}}}},hooks(){return{bootstrap(){cn(qe("mutationObserverCallbacks",{}))},noAuto(){Lr()},watch(e){const{observeMutationsRoot:t}=e;yn?st():cn(qe("mutationObserverCallbacks",{observeMutationsRoot:t}))}}}};const vn=e=>{let t={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),o=r[0];let i=r.slice(1).join("-");if(o&&i==="h")return n.flipX=!0,n;if(o&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(o){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},t)};var to={mixout(){return{parse:{transform:e=>vn(e)}}},hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-transform");return n&&(e.transform=vn(n)),e}}},provides(e){e.generateAbstractTransformGrouping=function(t){let{main:n,transform:a,containerWidth:r,iconWidth:o}=t;const i={transform:"translate(".concat(r/2," 256)")},l="translate(".concat(a.x*32,", ").concat(a.y*32,") "),u="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),d={transform:"".concat(l," ").concat(u," ").concat(c)},g={transform:"translate(".concat(o/2*-1," -256)")},v={outer:i,inner:d,path:g};return{tag:"g",attributes:f({},v.outer),children:[{tag:"g",attributes:f({},v.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:f(f({},n.icon.attributes),v.path)}]}]}}}};const lt={x:0,y:0,width:"100%",height:"100%"};function bn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function no(e){return e.tag==="g"?e.children:[e]}var ao={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-mask"),a=n?Se(n.split(" ").map(r=>r.trim())):Zt();return a.prefix||(a.prefix=G()),e.mask=a,e.maskId=t.getAttribute("data-fa-mask-id"),e}}},provides(e){e.generateAbstractMask=function(t){let{children:n,attributes:a,main:r,mask:o,maskId:i,transform:l}=t;const{width:u,icon:c}=r,{width:d,icon:g}=o,v=Qa({transform:l,containerWidth:d,iconWidth:u}),w={tag:"rect",attributes:f(f({},lt),{},{fill:"white"})},C=c.children?{children:c.children.map(bn)}:{},E={tag:"g",attributes:f({},v.inner),children:[bn(f({tag:c.tag,attributes:f(f({},c.attributes),v.path)},C))]},N={tag:"g",attributes:f({},v.outer),children:[E]},h="mask-".concat(i||ue()),b="clip-".concat(i||ue()),k={tag:"mask",attributes:f(f({},lt),{},{id:h,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[w,N]},x={tag:"defs",children:[{tag:"clipPath",attributes:{id:b},children:no(g)},k]};return n.push(x,{tag:"rect",attributes:f({fill:"currentColor","clip-path":"url(#".concat(b,")"),mask:"url(#".concat(h,")")},lt)}),{children:n,attributes:a}}}},ro={provides(e){let t=!1;U.matchMedia&&(t=U.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:f(f({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const o=f(f({},r),{},{attributeName:"opacity"}),i={tag:"circle",attributes:f(f({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return t||i.children.push({tag:"animate",attributes:f(f({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:f(f({},o),{},{values:"1;0;1;1;0;1;"})}),n.push(i),n.push({tag:"path",attributes:f(f({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:t?[]:[{tag:"animate",attributes:f(f({},o),{},{values:"1;0;0;0;0;1;"})}]}),t||n.push({tag:"path",attributes:f(f({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:f(f({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},oo={hooks(){return{parseNodeAttributes(e,t){const n=t.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return e.symbol=a,e}}}},so=[tr,Yr,Wr,Ur,Hr,Jr,eo,to,ao,ro,oo];br(so,{mixoutsTo:R}),R.noAuto;const xn=R.config,io=R.library;R.dom;const _e=R.parse;R.findIconDefinition,R.toHtml;const lo=R.icon;R.layer;const co=R.text;R.counter;function kn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),n.push.apply(n,a)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?kn(Object(n),!0).forEach(function(a){F(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):kn(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function fo(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function uo(e){var t=fo(e,"string");return typeof t=="symbol"?t:t+""}function Oe(e){"@babel/helpers - typeof";return Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Oe(e)}function F(e,t,n){return t=uo(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function mo(e,t){if(e==null)return{};var n={};for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){if(t.indexOf(a)>=0)continue;n[a]=e[a]}return n}function po(e,t){if(e==null)return{};var n=mo(e,t),a,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}function ct(e){return go(e)||ho(e)||yo(e)||vo()}function go(e){if(Array.isArray(e))return ft(e)}function ho(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function yo(e,t){if(e){if(typeof e=="string")return ft(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ft(e,t)}}function ft(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function vo(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var bo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},wn={exports:{}};(function(e){(function(t){var n=function(h,b,k){if(!c(b)||g(b)||v(b)||w(b)||u(b))return b;var x,_=0,D=0;if(d(b))for(x=[],D=b.length;_<D;_++)x.push(n(h,b[_],k));else{x={};for(var S in b)Object.prototype.hasOwnProperty.call(b,S)&&(x[h(S,k)]=n(h,b[S],k))}return x},a=function(h,b){b=b||{};var k=b.separator||"_",x=b.split||/(?=[A-Z])/;return h.split(x).join(k)},r=function(h){return C(h)?h:(h=h.replace(/[\-_\s]+(.)?/g,function(b,k){return k?k.toUpperCase():""}),h.substr(0,1).toLowerCase()+h.substr(1))},o=function(h){var b=r(h);return b.substr(0,1).toUpperCase()+b.substr(1)},i=function(h,b){return a(h,b).toLowerCase()},l=Object.prototype.toString,u=function(h){return typeof h=="function"},c=function(h){return h===Object(h)},d=function(h){return l.call(h)=="[object Array]"},g=function(h){return l.call(h)=="[object Date]"},v=function(h){return l.call(h)=="[object RegExp]"},w=function(h){return l.call(h)=="[object Boolean]"},C=function(h){return h=h-0,h===h},E=function(h,b){var k=b&&"process"in b?b.process:b;return typeof k!="function"?h:function(x,_){return k(x,h,_)}},N={camelize:r,decamelize:i,pascalize:o,depascalize:i,camelizeKeys:function(h,b){return n(E(r,b),h)},decamelizeKeys:function(h,b){return n(E(i,b),h,b)},pascalizeKeys:function(h,b){return n(E(o,b),h)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};e.exports?e.exports=N:t.humps=N})(bo)})(wn);var xo=wn.exports,ko=["class","style"];function wo(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var a=n.indexOf(":"),r=xo.camelize(n.slice(0,a)),o=n.slice(a+1).trim();return t[r]=o,t},{})}function So(e){return e.split(/\s+/).reduce(function(t,n){return t[n]=!0,t},{})}function ut(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(u){return ut(u)}),r=Object.keys(e.attributes||{}).reduce(function(u,c){var d=e.attributes[c];switch(c){case"class":u.class=So(d);break;case"style":u.style=wo(d);break;default:u.attrs[c]=d}return u},{attrs:{},class:{},style:{}});n.class;var o=n.style,i=o===void 0?{}:o,l=po(n,ko);return s.h(e.tag,z(z(z({},t),{},{class:r.class,style:z(z({},r.style),i)},r.attrs),l),a)}var Sn=!1;try{Sn=process.env.NODE_ENV==="production"}catch{}function Ao(){if(!Sn&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function ge(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?F({},e,t):{}}function Io(e){var t,n=(t={"fa-spin":e.spin,"fa-pulse":e.pulse,"fa-fw":e.fixedWidth,"fa-border":e.border,"fa-li":e.listItem,"fa-inverse":e.inverse,"fa-flip":e.flip===!0,"fa-flip-horizontal":e.flip==="horizontal"||e.flip==="both","fa-flip-vertical":e.flip==="vertical"||e.flip==="both"},F(F(F(F(F(F(F(F(F(F(t,"fa-".concat(e.size),e.size!==null),"fa-rotate-".concat(e.rotation),e.rotation!==null),"fa-pull-".concat(e.pull),e.pull!==null),"fa-swap-opacity",e.swapOpacity),"fa-bounce",e.bounce),"fa-shake",e.shake),"fa-beat",e.beat),"fa-fade",e.fade),"fa-beat-fade",e.beatFade),"fa-flash",e.flash),F(F(t,"fa-spin-pulse",e.spinPulse),"fa-spin-reverse",e.spinReverse));return Object.keys(n).map(function(a){return n[a]?a:null}).filter(function(a){return a})}function An(e){if(e&&Oe(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(_e.icon)return _e.icon(e);if(e===null)return null;if(Oe(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}var Co=s.defineComponent({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(t){return[!0,!1,"horizontal","vertical","both"].indexOf(t)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},maskId:{type:String,default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(t){return["right","left"].indexOf(t)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(t){return[90,180,270].indexOf(Number.parseInt(t,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(t){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(t)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},titleId:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(t,n){var a=n.attrs,r=s.computed(function(){return An(t.icon)}),o=s.computed(function(){return ge("classes",Io(t))}),i=s.computed(function(){return ge("transform",typeof t.transform=="string"?_e.transform(t.transform):t.transform)}),l=s.computed(function(){return ge("mask",An(t.mask))}),u=s.computed(function(){return lo(r.value,z(z(z(z({},o.value),i.value),l.value),{},{symbol:t.symbol,title:t.title,titleId:t.titleId,maskId:t.maskId}))});s.watch(u,function(d){if(!d)return Ao("Could not find one or more icon(s)",r.value,l.value)},{immediate:!0});var c=s.computed(function(){return u.value?ut(u.value.abstract[0],{},a):null});return function(){return c.value}}});s.defineComponent({name:"FontAwesomeLayers",props:{fixedWidth:{type:Boolean,default:!1}},setup:function(t,n){var a=n.slots,r=xn.familyPrefix,o=s.computed(function(){return["".concat(r,"-layers")].concat(ct(t.fixedWidth?["".concat(r,"-fw")]:[]))});return function(){return s.h("div",{class:o.value},a.default?a.default():[])}}}),s.defineComponent({name:"FontAwesomeLayersText",props:{value:{type:[String,Number],default:""},transform:{type:[String,Object],default:null},counter:{type:Boolean,default:!1},position:{type:String,default:null,validator:function(t){return["bottom-left","bottom-right","top-left","top-right"].indexOf(t)>-1}}},setup:function(t,n){var a=n.attrs,r=xn.familyPrefix,o=s.computed(function(){return ge("classes",[].concat(ct(t.counter?["".concat(r,"-layers-counter")]:[]),ct(t.position?["".concat(r,"-layers-").concat(t.position)]:[])))}),i=s.computed(function(){return ge("transform",typeof t.transform=="string"?_e.transform(t.transform):t.transform)}),l=s.computed(function(){var c=co(t.value.toString(),z(z({},i.value),o.value)),d=c.abstract;return t.counter&&(d[0].attributes.class=d[0].attributes.class.replace("fa-layers-text","")),d[0]}),u=s.computed(function(){return ut(l.value,{},a)});return function(){return u.value}}});/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const Eo={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"]},_o={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"]},Oo={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},No={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]};io.add(No,Eo,Oo,_o);function Po(e,t,n={}){const a=s.createApp(ca);return a.component("font-awesome-icon",Co),a.provide("searchService",t),a.provide("config",{showHeader:n.showHeader??!0,showSearchResults:n.showSearchResults??!0,freeInputDefaultTokenConfiguration:n.freeInputDefaultTokenConfiguration??{label:"Fulltext",operator:{text:"=",code:"="}},repeatLastSearchOnPageMount:n.repeatLastSearchOnPageMount??!0,...n}),a.mount(e),a}q.initializeSearchApp=Po,Object.defineProperty(q,Symbol.toStringTag,{value:"Module"})});

(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{147:function(e,t,a){e.exports=a(176)},152:function(e,t,a){},153:function(e,t,a){},176:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a.n(c);a(152),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,l,s=a(70),u=(a(153),a(76)),d=a(225),m=a(212),f=a(213),b=r.a.memo((function(e){var t=e.disabled,a=void 0!==t&&t,c=Object(s.a)(e,["disabled"]);console.log("AddItemForm called");var i=Object(n.useState)(""),o=Object(u.a)(i,2),l=o[0],b=o[1],E=Object(n.useState)(null),O=Object(u.a)(E,2),T=O[0],p=O[1],g=function(){""!==l.trim()?(c.addItem(l),b("")):p("Title is required")};return r.a.createElement("div",null,r.a.createElement(d.a,{variant:"outlined",error:!!T,value:l,disabled:a,onChange:function(e){b(e.currentTarget.value)},onKeyPress:function(e){null!==T&&p(null),13===e.charCode&&g()},label:"Title",helperText:T}),r.a.createElement(m.a,{color:"primary",onClick:g,disabled:a},r.a.createElement(f.a,null)))})),E=r.a.memo((function(e){console.log("EditableSpan called");var t=Object(n.useState)(!1),a=Object(u.a)(t,2),c=a[0],i=a[1],o=Object(n.useState)(e.value),l=Object(u.a)(o,2),s=l[0],m=l[1];return c?r.a.createElement(d.a,{value:s,onChange:function(e){m(e.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),e.onChange(s)}}):r.a.createElement("span",{onDoubleClick:function(){i(!0),m(e.value)}},e.value)})),O=a(215),T=a(214),p=a(227),g=a(8),h=a(128),v=a.n(h).a.create(Object(g.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"959808d3-8efe-42bd-88eb-3693675e6c98"}}));!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(o||(o={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(l||(l={}));var I,k=function(){return v.get("todo-lists")},j=function(e){return v.post("todo-lists",{title:e})},S=function(e){return v.delete("todo-lists/".concat(e))},C=function(e,t){return v.put("todo-lists/".concat(e),{title:t})},y=function(e){return v.get("todo-lists/".concat(e,"/tasks"))},L=function(e,t){return v.delete("todo-lists/".concat(e,"/tasks/").concat(t))},D=function(e,t){return v.post("todo-lists/".concat(e,"/tasks"),{title:t})},A=function(e,t,a){return v.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},w=function(e){return v.post("auth/login",e)},_=function(){return v.get("auth/me")},N=function(){return v.delete("auth/login")},R=r.a.memo((function(e){var t=Object(n.useCallback)((function(){return e.removeTask(e.task.id,e.todolistId)}),[e.task.id,e.todolistId]),a=Object(n.useCallback)((function(t){var a=t.currentTarget.checked;e.changeTaskStatus(e.task.id,a?o.Completed:o.New,e.todolistId)}),[e.task.id,e.todolistId]),c=Object(n.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.todolistId)}),[e.task.id,e.todolistId]);return r.a.createElement("div",{key:e.task.id,className:e.task.status===o.Completed?"is-done":""},r.a.createElement(p.a,{checked:e.task.status===o.Completed,color:"primary",onChange:a}),r.a.createElement(E,{value:e.task.title,onChange:c}),r.a.createElement(m.a,{onClick:t},r.a.createElement(T.a,null)))})),P=a(18),x=a(90),F=a(77),G={};!function(e){e.SET_STATUS="APP/SET_STATUS",e.SET_ERROR="APP/SET_ERROR",e.SET_IS_INITIALIZED="APP/IS_INITIALIZED"}(I||(I={}));var M={status:"idle",error:null,isInitialized:!1},U=function(e){return{type:I.SET_STATUS,status:e}},H=function(e){return{type:I.SET_ERROR,error:e}},K=function(e,t){e.messages.length?t(H(e.messages[0])):t(H("some error")),t(U("failed"))},V=function(e,t){e.message?t(H(e.message)):t(H("some error was happened")),t(U("failed"))},q=function(e,t,a){return function(n,r){var c=r().tasks[e].find((function(e){return e.id===t}));if(c){var i=Object(g.a)({deadline:c.deadline,description:c.description,priority:c.priority,startDate:c.startDate,status:c.status,title:c.title},a);A(e,t,i).then((function(a){0===a.data.resultCode?(n(function(e,t,a){return{type:"UPDATE-TASK",task:a,todolistId:t,taskId:e}}(t,e,a.data.data.item)),U("succeeded")):K(a.data,n)})).catch((function(e){V(e,n)}))}}},Z=r.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,c=Object(s.a)(e,["demo"]);console.log("Todolist called");var i=Object(n.useCallback)((function(e){c.addTask(e,c.id)}),[c.addTask,c.id]),l=Object(n.useCallback)((function(e){c.changeTodolistTitle(c.id,e)}),[c.id,c.changeTodolistTitle]),u=Object(n.useCallback)((function(){return c.changeFilter("all",c.id)}),[c.id,c.changeFilter]),d=Object(n.useCallback)((function(){return c.changeFilter("active",c.id)}),[c.id,c.changeFilter]),f=Object(n.useCallback)((function(){return c.changeFilter("completed",c.id)}),[c.id,c.changeFilter]),p=Object(P.b)();Object(n.useEffect)((function(){var e;a||p((e=c.id,function(t){y(e).then((function(a){t(function(e,t){return{type:"SET_TASKS",tasks:e,todolistId:t}}(a.data.items,e)),t(U("succeeded"))})).catch((function(e){e.message?t(H(e.message)):t(H(e)),t(U("failed"))}))}))}),[c.id]);var g=c.tasks;return"active"===c.filter&&(g=c.tasks.filter((function(e){return e.status===o.New}))),"completed"===c.filter&&(g=c.tasks.filter((function(e){return e.status===o.Completed}))),r.a.createElement("div",null,r.a.createElement("h3",null,r.a.createElement(E,{value:c.title,onChange:l}),r.a.createElement(m.a,{onClick:function(){c.removeTodolist(c.id)},disabled:"loading"===c.entityStatus},r.a.createElement(T.a,null))),r.a.createElement(b,{addItem:i,disabled:"loading"===c.entityStatus&&!0}),r.a.createElement("div",null,g.map((function(e){return r.a.createElement(R,{key:e.id,task:e,todolistId:c.id,removeTask:c.removeTask,changeTaskTitle:c.changeTaskTitle,changeTaskStatus:c.changeTaskStatus})}))),r.a.createElement("div",{style:{paddingTop:"10px"}},r.a.createElement(O.a,{variant:"all"===c.filter?"outlined":"text",onClick:u,color:"default"},"All"),r.a.createElement(O.a,{variant:"active"===c.filter?"outlined":"text",onClick:d,color:"primary"},"Active"),r.a.createElement(O.a,{variant:"completed"===c.filter?"outlined":"text",onClick:f,color:"secondary"},"Completed")))})),z=a(222),B=a(223),Y=a(224),J=a(216),W=a(177),$=[],Q=function(e,t){return{type:"CHANGE_TODOLIST_ENTITY_STATUS",entityStatus:e,todolistId:t}},X=a(110),ee=a.n(X),te=a(130),ae=a(229),ne=a(226);function re(e){return r.a.createElement(ne.a,Object.assign({elevation:6,variant:"filled"},e))}function ce(){var e=Object(P.c)((function(e){return e.app.error})),t=Object(P.b)(),a=function(e,a){"clickaway"!==a&&t(H(null))};return r.a.createElement(ae.a,{open:null!==e,autoHideDuration:4e3,onClose:a},r.a.createElement(re,{onClose:a,severity:"error"},e))}var ie,oe=a(15),le=a(230),se=a(211),ue=a(217),de=a(218),me=a(135),fe=a(103);!function(e){e.IS_LOGGED_IN="AUTH/IS_LOGGED_IN"}(ie||(ie={}));var be={isLoggedIn:!1},Ee=function(e){return{type:ie.IS_LOGGED_IN,isLoggedIn:e}},Oe=fe.a().shape({email:fe.b().max(35,"Must be 25 characters or less").required("email is required").email("email is incorrect"),password:fe.b().max(25,"Must be 25 characters or less").min(5,"Must be 5 characters or more").required("password is required")}),Te=function(e){var t=Object(P.c)((function(e){return e.auth.isLoggedIn})),a=Object(P.b)(),n=Object(me.a)({validationSchema:Oe,initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(e){var t;a((t=e,function(e){e(U("loading")),w(t).then((function(t){0===t.data.resultCode?(e(Ee(!0)),e(U("succeeded"))):K(t.data,e)})).catch((function(t){V(t,e)}))}))}}),c={color:"red"};return t?r.a.createElement(oe.a,{to:"/"}):r.a.createElement(J.a,{container:!0,justify:"center"},r.a.createElement(J.a,{item:!0,xs:4},r.a.createElement("form",{onSubmit:n.handleSubmit},r.a.createElement(le.a,null,r.a.createElement(se.a,null,r.a.createElement("p",null,"To log in get registered",r.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),r.a.createElement("p",null,"or use common test account credentials:"),r.a.createElement("p",null,"Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(ue.a,null,r.a.createElement(d.a,Object.assign({label:"Email",margin:"normal",name:"email"},n.getFieldProps("email"))),n.errors.email&&n.touched.email?r.a.createElement("div",{style:c},n.errors.email):null,r.a.createElement(d.a,Object.assign({type:"password",label:"Password",name:"password",margin:"normal"},n.getFieldProps("password"))),n.errors.password&&n.touched.password?r.a.createElement("div",{style:c},n.errors.password):null,r.a.createElement(de.a,Object.assign({label:"Remember me",control:r.a.createElement(p.a,null),name:"rememberMe"},n.getFieldProps("rememberMe"))),r.a.createElement(O.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},pe=function(){return function(e){e(U("loading")),_().then((function(t){var a;0===t.data.resultCode?(e(Ee(!0)),e(U("succeeded"))):K(t.data,e),e((a=!0,{type:I.SET_IS_INITIALIZED,value:a}))})).catch((function(t){V(t,e)}))}},ge=a(219),he=a(220),ve=a(178),Ie=a(221);function ke(){var e=Object(P.c)((function(e){return e.auth.isLoggedIn})),t=Object(P.b)(),a=Object(n.useCallback)((function(){t((function(e){e(U("loading")),N().then((function(t){0===t.data.resultCode?(e(Ee(!1)),e(U("succeeded"))):K(t.data,e)})).catch((function(t){V(t,e)}))}))}),[]);return r.a.createElement(ge.a,{position:"static"},r.a.createElement(he.a,null,r.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(Ie.a,null)),r.a.createElement(ve.a,{variant:"h6"},"News"),e&&r.a.createElement(O.a,{color:"inherit",onClick:a},"Log out")))}function je(e){var t=e.demo,a=void 0!==t&&t,c=(Object(s.a)(e,["demo"]),Object(P.c)((function(e){return e.todolists}))),i=Object(P.c)((function(e){return e.tasks})),o=Object(P.c)((function(e){return e.app.status})),l=Object(P.c)((function(e){return e.auth.isLoggedIn})),u=Object(P.c)((function(e){return e.app.isInitialized})),d=Object(P.b)();Object(n.useEffect)((function(){a||d((function(e){e(U("loading")),k().then((function(t){e({type:"SET_TODOLISTS",todolists:t.data}),e(U("succeeded"))})).catch((function(t){V(t,e)}))}))}),[l]),Object(n.useEffect)((function(){d(pe())}),[]);var m=Object(n.useCallback)((function(e,t){d(function(e,t){return function(a){a(U("loading")),L(e,t).then((function(n){0===n.data.resultCode?(a(function(e,t){return{type:"REMOVE-TASK",taskId:e,todolistId:t}}(t,e)),a(U("succeeded"))):K(n.data,a)})).catch((function(e){V(e,a)}))}}(t,e))}),[]),f=Object(n.useCallback)((function(e,t){d(function(e,t){return function(a){a(U("loading")),D(t,e).then((function(e){0===e.data.resultCode?(a({type:"ADD-TASK",task:e.data.data.item}),a(U("succeeded"))):K(e.data,a)})).catch((function(e){V(e,a)}))}}(e,t))}),[]),E=Object(n.useCallback)((function(e,t,a){d(q(a,e,{status:t}))}),[]),O=Object(n.useCallback)((function(e,t,a){d(q(a,e,{title:t}))}),[]),T=Object(n.useCallback)((function(e,t){var a={type:"CHANGE-TODOLIST-FILTER",id:t,filter:e};d(a)}),[]),p=Object(n.useCallback)((function(e){var t;d((t=e,function(e){e(U("loading")),e(Q("loading",t)),S(t).then((function(a){0===a.data.resultCode?(e(function(e){return{type:"REMOVE-TODOLIST",id:e}}(t)),e(U("succeeded"))):K(a.data,e)})).catch((function(t){V(t,e)}))}))}),[]),g=Object(n.useCallback)((function(e,t){d(function(e,t){return function(a){a(U("loading")),C(e,t).then((function(n){a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t))}))}}(e,t))}),[]),h=Object(n.useCallback)((function(e){d(function(e){return function(){var t=Object(te.a)(ee.a.mark((function t(a){return ee.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a(U("loading")),t.next=4,j(e).then((function(e){a(Q("loading",e.data.data.item.id)),0===e.data.resultCode?(a({type:"ADD-TODOLIST",todolist:e.data.data.item}),a(U("succeeded"))):K(e.data,a)}));case 4:t.sent,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),V(t.t0,a);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}(e))}),[d]);return u?r.a.createElement("div",{className:"App"},r.a.createElement(ke,null),"loading"===o&&r.a.createElement(B.a,null),r.a.createElement(ce,null),r.a.createElement(oe.b,{path:"/login",render:function(){return r.a.createElement(Te,null)}}),!l&&r.a.createElement(oe.a,{to:"/login"}),r.a.createElement(oe.b,{exact:!0,path:"/",render:function(){return r.a.createElement(Y.a,{fixed:!0},r.a.createElement(J.a,{container:!0,style:{padding:"20px"}},r.a.createElement(b,{addItem:h})),r.a.createElement(J.a,{container:!0,spacing:3},c.map((function(e){var t=i[e.id];return r.a.createElement(J.a,{item:!0,key:e.id},r.a.createElement(W.a,{style:{padding:"10px"}},r.a.createElement(Z,{entityStatus:e.entityStatus,id:e.id,title:e.title,tasks:t,removeTask:m,changeFilter:T,addTask:f,changeTaskStatus:E,filter:e.filter,removeTodolist:p,changeTaskTitle:O,changeTodolistTitle:g,demo:a})))}))))}})):r.a.createElement("div",{className:"app__progress_circle"},r.a.createElement(z.a,null))}var Se=a(74),Ce=a(134),ye=Object(Se.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":var a=Object(g.a)({},e),n=a[t.todolistId],r=n.filter((function(e){return e.id!=t.taskId}));return a[t.todolistId]=r,a;case"ADD-TASK":var c=Object(g.a)({},e),i=t.task,o=c[t.task.todoListId],l=[i].concat(Object(F.a)(o));return c[i.todoListId]=l,c;case"UPDATE-TASK":var s=e[t.todolistId],u=s.map((function(e){return e.id===t.taskId?Object(g.a)({},t.task):e}));return e[t.todolistId]=u,Object(g.a)({},e);case"ADD-TODOLIST":return Object(g.a)(Object(g.a)({},e),{},Object(x.a)({},t.todolist.id,[]));case"REMOVE-TODOLIST":var d=Object(g.a)({},e);return delete d[t.id],d;case"SET_TODOLISTS":var m=Object(g.a)({},e);return t.todolists.forEach((function(e){m[e.id]=[]})),m;case"SET_TASKS":var f=Object(g.a)({},e);return f[t.todolistId]=t.tasks,f;default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!=t.id}));case"ADD-TODOLIST":var a=Object(g.a)(Object(g.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"});return[a].concat(Object(F.a)(e));case"CHANGE-TODOLIST-TITLE":var n=e.find((function(e){return e.id===t.id}));return n&&(n.title=t.title),Object(F.a)(e);case"CHANGE-TODOLIST-FILTER":var r=e.find((function(e){return e.id===t.id}));return r&&(r.filter=t.filter),Object(F.a)(e);case"SET_TODOLISTS":return t.todolists.map((function(e){return Object(g.a)(Object(g.a)({},e),{},{filter:"all",entityStatus:"idle"})}));case"CHANGE_TODOLIST_ENTITY_STATUS":return e.map((function(e){return e.id===t.todolistId?Object(g.a)(Object(g.a)({},e),{},{entityStatus:t.entityStatus}):e}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case I.SET_STATUS:return Object(g.a)(Object(g.a)({},e),{},{status:t.status});case I.SET_ERROR:return Object(g.a)(Object(g.a)({},e),{},{error:t.error});case I.SET_IS_INITIALIZED:return Object(g.a)(Object(g.a)({},e),{},{isInitialized:t.value});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:be,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ie.IS_LOGGED_IN:return Object(g.a)(Object(g.a)({},e),{},{isLoggedIn:t.isLoggedIn});default:return e}}}),Le=Object(Se.d)(ye,Object(Se.a)(Ce.a));window.store=Le;var De=a(85);i.a.render(r.a.createElement(P.a,{store:Le},r.a.createElement(De.a,null,r.a.createElement(je,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[147,1,2]]]);
//# sourceMappingURL=main.b1d6bd60.chunk.js.map
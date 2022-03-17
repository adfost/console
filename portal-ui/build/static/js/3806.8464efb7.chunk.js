"use strict";(self.webpackChunkportal_ui=self.webpackChunkportal_ui||[]).push([[3806],{8235:function(e,n,t){t(50390);var r=t(86509),i=t(4285),o=t(25594),a=t(62559);n.Z=(0,i.Z)((function(e){return(0,r.Z)({root:{border:"1px solid #E2E2E2",borderRadius:2,backgroundColor:"#FBFAFA",paddingLeft:25,paddingTop:31,paddingBottom:21,paddingRight:30},leftItems:{fontSize:16,fontWeight:"bold",marginBottom:15,display:"flex",alignItems:"center","& .min-icon":{marginRight:15,height:28,width:38}},helpText:{fontSize:16,paddingLeft:5}})}))((function(e){var n=e.classes,t=e.iconComponent,r=e.title,i=e.help;return(0,a.jsx)("div",{className:n.root,children:(0,a.jsxs)(o.ZP,{container:!0,children:[(0,a.jsxs)(o.ZP,{item:!0,xs:12,className:n.leftItems,children:[t,r]}),(0,a.jsx)(o.ZP,{item:!0,xs:12,className:n.helpText,children:i})]})})}))},53224:function(e,n,t){var r=t(18489),i=t(83738),o=(t(50390),t(70758)),a=t(62449),s=t(62559),l=["onClick","text","disabled","tooltip","icon"],c=(0,a.Z)((function(e){return{root:{padding:"7px",color:function(n){return function(n){var t=n.variant,r=n.color,i=e.palette.primary.main;return"primary"===r&&"contained"===t?i=e.palette.primary.contrastText:"primary"===r&&"outlined"===t?i=e.palette.primary.main:"secondary"===r&&(i=e.palette.secondary.main),i}(n)},borderColor:function(n){return"secondary"===n.color?e.palette.secondary.main:e.palette.primary.main},"& svg.min-icon":{width:12,marginLeft:function(e){return e.text?"5px":"0px"},"@media (max-width: 900px)":{width:16,marginLeft:"0px !important"}}}}}));n.Z=function(e){var n=c(e),t=e.onClick,a=e.text,d=void 0===a?"":a,u=e.disabled,p=void 0!==u&&u,m=e.tooltip,h=e.icon,f=void 0===h?null:h,x=(0,i.Z)(e,l);return(0,s.jsxs)(o.Z,(0,r.Z)((0,r.Z)({classes:n,tooltip:m||d,variant:"outlined",onClick:t,disabled:p,color:"secondary",size:"medium",sx:{border:"1px solid #f44336","& span":{fontSize:14,"@media (max-width: 900px)":{display:"none"}}}},x),{},{children:[(0,s.jsx)("span",{children:d})," ",f]}))}},11835:function(e,n,t){var r=t(18489),i=t(83738),o=(t(50390),t(86509)),a=t(4285),s=t(62559),l=["classes","children"];n.Z=(0,a.Z)((function(e){return(0,o.Z)({root:{padding:0,margin:0,border:0,backgroundColor:"transparent",textDecoration:"underline",cursor:"pointer",fontSize:"inherit",color:e.palette.info.main,fontFamily:"Lato, sans-serif"}})}))((function(e){var n=e.classes,t=e.children,o=(0,i.Z)(e,l);return(0,s.jsx)("button",(0,r.Z)((0,r.Z)({},o),{},{className:n.root,children:t}))}))},70758:function(e,n,t){var r=t(18489),i=t(36222),o=t(83738),a=(t(50390),t(86509)),s=t(4285),l=t(95467),c=t(94187),d=t(44977),u=t(62559),p=["classes","children","variant","tooltip"];n.Z=(0,s.Z)((function(e){return(0,a.Z)({root:{padding:8,marginLeft:8,borderWidth:1,borderColor:"#696969",color:"#696969",borderStyle:"solid",borderRadius:3,"& .min-icon":{width:20},"& .MuiTouchRipple-root span":{backgroundColor:e.palette.primary.main,borderRadius:3,opacity:.3},"&:disabled":{color:"#EBEBEB",borderColor:"#EBEBEB"}},contained:{borderColor:e.palette.primary.main,background:e.palette.primary.main,color:"white","& .MuiTouchRipple-root span":{backgroundColor:e.palette.primary.dark,borderRadius:3,opacity:.3},"&:hover":{backgroundColor:e.palette.primary.light,color:"#FFF"}}})}))((function(e){var n=e.classes,t=e.children,a=e.variant,s=void 0===a?"outlined":a,m=e.tooltip,h=(0,o.Z)(e,p),f=(0,u.jsx)(l.Z,(0,r.Z)((0,r.Z)({},h),{},{className:(0,d.Z)(n.root,(0,i.Z)({},n.contained,"contained"===s)),children:t}));return m&&""!==m?(0,u.jsx)(c.Z,{title:m,children:(0,u.jsx)("span",{children:f})}):f}))},37882:function(e,n,t){var r=t(18489),i=t(50390),o=t(62559);n.Z=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;function t(t){return(0,o.jsx)(i.Suspense,{fallback:n,children:(0,o.jsx)(e,(0,r.Z)({},t))})}return t}},25534:function(e,n,t){var r=t(18489),i=(t(50390),t(25594)),o=t(86509),a=t(4285),s=t(72462),l=t(62559);n.Z=(0,a.Z)((function(e){return(0,o.Z)((0,r.Z)({},s.Bw))}))((function(e){var n=e.classes,t=e.className,r=void 0===t?"":t,o=e.children;return(0,l.jsx)("div",{className:n.contentSpacer,children:(0,l.jsx)(i.ZP,{container:!0,children:(0,l.jsx)(i.ZP,{item:!0,xs:12,className:r,children:o})})})}))},35721:function(e,n,t){var r=t(50390),i=t(34424),o=t(25594),a=t(86509),s=t(4285),l=t(35477),c=t(95467),d=t(26805),u=t(44078),p=t(5265),m=t(86362),h=t(62559),f={toggleList:p.kQ},x=(0,i.$j)((function(e){return{sidebarOpen:e.system.sidebarOpen,operatorMode:e.system.operatorMode,managerObjects:e.objectBrowser.objectManager.objectsToManage,features:e.console.session.features}}),f);n.Z=x((0,s.Z)((function(e){return(0,a.Z)({headerContainer:{width:"100%",minHeight:79,display:"flex",backgroundColor:"#fff",left:0,boxShadow:"rgba(0,0,0,.08) 0 3px 10px"},label:{display:"flex",justifyContent:"flex-start",alignItems:"center"},labelStyle:{color:"#000",fontSize:18,fontWeight:700,marginLeft:34,marginTop:8},rightMenu:{textAlign:"right"},logo:{marginLeft:34,fill:e.palette.primary.main,"& .min-icon":{width:120}},middleComponent:{display:"flex",justifyContent:"center",alignItems:"center"}})}))((function(e){var n=e.classes,t=e.label,i=e.actions,a=e.sidebarOpen,s=e.operatorMode,p=e.managerObjects,f=e.toggleList,x=e.middleComponent;return e.features.includes("hide-menu")?(0,h.jsx)(r.Fragment,{}):(0,h.jsxs)(o.ZP,{container:!0,className:"".concat(n.headerContainer," page-header"),direction:"row",alignItems:"center",children:[(0,h.jsxs)(o.ZP,{item:!0,xs:12,sm:12,md:x?3:6,className:n.label,sx:{paddingTop:["15px","15px","0","0"]},children:[!a&&(0,h.jsx)("div",{className:n.logo,children:s?(0,h.jsx)(d.Z,{}):(0,h.jsx)(u.Z,{})}),(0,h.jsx)(l.Z,{variant:"h4",className:n.labelStyle,children:t})]}),x&&(0,h.jsx)(o.ZP,{item:!0,xs:12,sm:12,md:6,className:n.middleComponent,sx:{marginTop:["10px","10px","0","0"]},children:x}),(0,h.jsxs)(o.ZP,{item:!0,xs:12,sm:12,md:x?3:6,className:n.rightMenu,children:[i&&i,p&&p.length>0&&(0,h.jsx)(c.Z,{color:"primary","aria-label":"Refresh List",component:"span",onClick:function(){f()},id:"object-manager-toggle",size:"large",children:(0,h.jsx)(m.gx,{})})]})]})})))},23165:function(e,n,t){var r=t(36222),i=t(18489),o=(t(50390),t(65771)),a=t(13336),s=t(12066),l=t(4285),c=t(86509),d=t(72462),u=t(62559);n.Z=(0,l.Z)((function(e){return(0,c.Z)({searchField:(0,i.Z)({},d.qg.searchField),adornment:{}})}))((function(e){var n=e.placeholder,t=void 0===n?"":n,i=e.classes,l=e.onChange,c=e.adornmentPosition,d=void 0===c?"end":c,p=e.overrideClass,m=e.value,h=(0,r.Z)({disableUnderline:!0},"".concat(d,"Adornment"),(0,u.jsx)(o.Z,{position:d,className:i.adornment,children:(0,u.jsx)(a.Z,{})}));return(0,u.jsx)(s.Z,{placeholder:t,className:p||i.searchField,id:"search-resource",label:"",InputProps:h,onChange:function(e){l(e.target.value)},variant:"standard",value:m})}))},83806:function(e,n,t){t.r(n);var r=t(23430),i=t(18489),o=t(50390),a=t(34424),s=t(86509),l=t(4285),c=t(25594),d=t(81378),u=t(86362),p=t(44149),m=t(25233),h=t(72462),f=t(30324),x=t(8174),g=t(35721),Z=t(8235),b=t(24442),v=t(11835),j=t(25534),y=t(23165),C=t(49495),S=t(30140),P=t(37882),F=t(53224),E=t(62559),I=(0,P.Z)(o.lazy((function(){return Promise.all([t.e(5444),t.e(875),t.e(4860)]).then(t.bind(t,65284))}))),M=(0,P.Z)(o.lazy((function(){return Promise.all([t.e(5444),t.e(5245)]).then(t.bind(t,39251))}))),N=(0,P.Z)(o.lazy((function(){return Promise.all([t.e(5444),t.e(6549)]).then(t.bind(t,16549))}))),R={setErrorSnackMessage:p.Ih},k=(0,a.$j)(null,R);n.default=(0,l.Z)((function(e){return(0,s.Z)((0,i.Z)((0,i.Z)({tableBlock:(0,i.Z)((0,i.Z)({},h.VX.tableBlock),{},{marginTop:15})},h.OR),{},{searchField:(0,i.Z)((0,i.Z)({},h.qg.searchField),{},{maxWidth:380})},(0,h.Bz)(e.spacing(4))))}))(k((function(e){var n=e.classes,t=e.setErrorSnackMessage,i=(0,o.useState)(!1),a=(0,r.Z)(i,2),s=a[0],l=a[1],p=(0,o.useState)(null),h=(0,r.Z)(p,2),P=h[0],R=h[1],k=(0,o.useState)(!1),w=(0,r.Z)(k,2),A=w[0],O=w[1],T=(0,o.useState)(!1),_=(0,r.Z)(T,2),L=_[0],G=_[1],B=(0,o.useState)([]),z=(0,r.Z)(B,2),D=z[0],U=z[1],K=(0,o.useState)(""),V=(0,r.Z)(K,2),W=V[0],q=V[1],H=(0,o.useState)(!1),Q=(0,r.Z)(H,2),$=Q[0],X=Q[1];(0,o.useEffect)((function(){G(!0)}),[]),(0,o.useEffect)((function(){G(!0)}),[]);var Y=(0,S.F)(C.C3,[C.Ft.ADMIN_LIST_GROUPS]),J=(0,S.F)(C.C3,[C.Ft.ADMIN_REMOVE_USER_FROM_GROUP]),ee=(0,S.F)(C.C3,[C.Ft.ADMIN_GET_GROUP]);(0,o.useEffect)((function(){if(L)if(Y){f.Z.invoke("GET","/api/v1/groups").then((function(e){var n=[];null!==e.groups&&(n=e.groups.sort(m.V2)),U(n),G(!1)})).catch((function(e){t(e),G(!1)}))}else G(!1)}),[L,t,Y]);var ne=D.filter((function(e){return e.includes(W)})),te=[{type:"view",onClick:function(e){b.Z.push("".concat(C.gA.GROUPS,"/").concat(e))},disableButtonFunction:function(){return!ee}},{type:"delete",onClick:function(e){O(!0),R(e)},disableButtonFunction:function(){return!J}}];return(0,E.jsxs)(o.Fragment,{children:[s&&(0,E.jsx)(M,{open:s,selectedGroup:P,closeModalAndRefresh:function(){l(!1),G(!0)}}),A&&(0,E.jsx)(I,{deleteOpen:A,selectedGroup:P,closeDeleteModalAndRefresh:function(e){O(!1),e&&G(!0)}}),X&&(0,E.jsx)(N,{open:$,selectedGroup:P,selectedUser:null,closeModalAndRefresh:function(){X(!1)}}),(0,E.jsx)(g.Z,{label:"Groups"}),(0,E.jsxs)(j.Z,{children:[(0,E.jsxs)(c.ZP,{item:!0,xs:12,className:n.actionsTray,children:[(0,E.jsx)(S.s,{resource:C.C3,scopes:[C.Ft.ADMIN_LIST_GROUPS],errorProps:{disabled:!0},children:(0,E.jsx)(y.Z,{placeholder:"Search Groups",onChange:q,overrideClass:n.searchField,value:W})}),(0,E.jsx)(S.s,{resource:C.C3,scopes:[C.Ft.ADMIN_ADD_USER_TO_GROUP,C.Ft.ADMIN_LIST_USERS],matchAll:!0,errorProps:{disabled:!0},children:(0,E.jsx)(F.Z,{tooltip:"Create Group",text:"Create Group",variant:"contained",color:"primary",icon:(0,E.jsx)(u.dt,{}),onClick:function(){R(null),l(!0)}})})]}),L&&(0,E.jsx)(d.Z,{}),!L&&(0,E.jsxs)(o.Fragment,{children:[D.length>0&&(0,E.jsxs)(o.Fragment,{children:[(0,E.jsx)(c.ZP,{item:!0,xs:12,className:n.tableBlock,children:(0,E.jsx)(S.s,{resource:C.C3,scopes:[C.Ft.ADMIN_LIST_GROUPS],errorProps:{disabled:!0},children:(0,E.jsx)(x.Z,{itemActions:te,columns:[{label:"Name",elementKey:""}],isLoading:L,records:ne,entityName:"Groups",idField:""})})}),(0,E.jsx)(c.ZP,{item:!0,xs:12,children:(0,E.jsx)(Z.Z,{title:"Groups",iconComponent:(0,E.jsx)(u.ww,{}),help:(0,E.jsxs)(o.Fragment,{children:["A group can have one attached IAM policy, where all users with membership in that group inherit that policy. Groups support more simplified management of user permissions on the MinIO Tenant.",(0,E.jsx)("br",{}),(0,E.jsx)("br",{}),"You can learn more at our"," ",(0,E.jsx)("a",{href:"https://docs.min.io/minio/k8s/tutorials/group-management.html?ref=con",target:"_blank",rel:"noreferrer",children:"documentation"}),"."]})})})]}),0===D.length&&(0,E.jsx)(c.ZP,{container:!0,justifyContent:"center",alignContent:"center",alignItems:"center",children:(0,E.jsx)(c.ZP,{item:!0,xs:8,children:(0,E.jsx)(Z.Z,{title:"Groups",iconComponent:(0,E.jsx)(u.oy,{}),help:(0,E.jsxs)(o.Fragment,{children:["A group can have one attached IAM policy, where all users with membership in that group inherit that policy. Groups support more simplified management of user permissions on the MinIO Tenant.",(0,E.jsxs)(S.s,{resource:C.C3,scopes:[C.Ft.ADMIN_ADD_USER_TO_GROUP,C.Ft.ADMIN_LIST_USERS],matchAll:!0,children:[(0,E.jsx)("br",{}),(0,E.jsx)("br",{}),"To get started,"," ",(0,E.jsx)(v.Z,{onClick:function(){R(null),l(!0)},children:"Create a Group"}),"."]})]})})})})]})]})]})})))},25233:function(e,n,t){t.d(n,{LQ:function(){return r},g4:function(){return i},V2:function(){return o}});var r=function(e,n){return e.accessKey>n.accessKey?1:e.accessKey<n.accessKey?-1:0},i=function(e,n){return e.name>n.name?1:e.name<n.name?-1:0},o=function(e,n){return e>n?1:e<n?-1:0}},65771:function(e,n,t){t.d(n,{Z:function(){return y}});var r=t(36222),i=t(1048),o=t(32793),a=t(50390),s=t(44977),l=t(50076),c=t(91442),d=t(35477),u=t(14478),p=t(23060),m=t(8208),h=t(10594);function f(e){return(0,h.Z)("MuiInputAdornment",e)}var x,g=(0,t(43349).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),Z=t(15573),b=t(62559),v=["children","className","component","disablePointerEvents","disableTypography","position","variant"],j=(0,m.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,n){var t=e.ownerState;return[n.root,n["position".concat((0,c.Z)(t.position))],!0===t.disablePointerEvents&&n.disablePointerEvents,n[t.variant]]}})((function(e){var n=e.theme,t=e.ownerState;return(0,o.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:n.palette.action.active},"filled"===t.variant&&(0,r.Z)({},"&.".concat(g.positionStart,"&:not(.").concat(g.hiddenLabel,")"),{marginTop:16}),"start"===t.position&&{marginRight:8},"end"===t.position&&{marginLeft:8},!0===t.disablePointerEvents&&{pointerEvents:"none"})})),y=a.forwardRef((function(e,n){var t=(0,Z.Z)({props:e,name:"MuiInputAdornment"}),r=t.children,m=t.className,h=t.component,g=void 0===h?"div":h,y=t.disablePointerEvents,C=void 0!==y&&y,S=t.disableTypography,P=void 0!==S&&S,F=t.position,E=t.variant,I=(0,i.Z)(t,v),M=(0,p.Z)()||{},N=E;E&&M.variant,M&&!N&&(N=M.variant);var R=(0,o.Z)({},t,{hiddenLabel:M.hiddenLabel,size:M.size,disablePointerEvents:C,position:F,variant:N}),k=function(e){var n=e.classes,t=e.disablePointerEvents,r=e.hiddenLabel,i=e.position,o=e.size,a=e.variant,s={root:["root",t&&"disablePointerEvents",i&&"position".concat((0,c.Z)(i)),a,r&&"hiddenLabel",o&&"size".concat((0,c.Z)(o))]};return(0,l.Z)(s,f,n)}(R);return(0,b.jsx)(u.Z.Provider,{value:null,children:(0,b.jsx)(j,(0,o.Z)({as:g,ownerState:R,className:(0,s.Z)(k.root,m),ref:n},I,{children:"string"!==typeof r||P?(0,b.jsxs)(a.Fragment,{children:["start"===F?x||(x=(0,b.jsx)("span",{className:"notranslate",children:"\u200b"})):null,r]}):(0,b.jsx)(d.Z,{color:"text.secondary",children:r})}))})}))},83738:function(e,n,t){function r(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}t.d(n,{Z:function(){return r}})}}]);
//# sourceMappingURL=3806.8464efb7.chunk.js.map
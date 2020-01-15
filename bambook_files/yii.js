yii=function(a){function c(){a(document).ajaxComplete(function(a,b,c){var d=b&&b.getResponseHeader("X-Redirect");d&&(window.location=d)})}function d(){a.ajaxPrefilter(function(a,c,d){!a.crossDomain&&b.getCsrfParam()&&d.setRequestHeader("X-CSRF-Token",b.getCsrfToken())}),b.refreshCsrfToken()}function e(){var c=function(c){var d=a(this),e=d.data("method"),f=d.data("confirm"),g=d.data("form");return void 0===e&&void 0===f&&void 0===g||(void 0!==f?a.proxy(b.confirm,this)(f,function(){b.handleAction(d,c)}):b.handleAction(d,c),c.stopImmediatePropagation(),!1)};a(document).on("click.yii",b.clickableSelector,c).on("change.yii",b.changeableSelector,c)}function f(){var c=location.protocol+"//"+location.host,d=a("script[src]").map(function(){return"/"===this.src.charAt(0)?c+this.src:this.src}).toArray();a.ajaxPrefilter("script",function(e,f,g){if("jsonp"!=e.dataType){var h="/"===e.url.charAt(0)?c+e.url:e.url;if(-1===a.inArray(h,d))d.push(h);else{-1!==a.inArray(h,a.map(b.reloadableScripts,function(a){return"/"===a.charAt(0)?c+a:a}))||g.abort()}}}),a(document).ajaxComplete(function(c,d,e){var f=[];a("link[rel=stylesheet]").each(function(){-1===a.inArray(this.href,b.reloadableScripts)&&(-1==a.inArray(this.href,f)?f.push(this.href):a(this).remove())})})}var b={reloadableScripts:[],clickableSelector:'a, button, input[type="submit"], input[type="button"], input[type="reset"], input[type="image"]',changeableSelector:"select, input, textarea",getCsrfParam:function(){return a("meta[name=csrf-param]").attr("content")},getCsrfToken:function(){return a("meta[name=csrf-token]").attr("content")},setCsrfToken:function(b,c){a("meta[name=csrf-param]").attr("content",b),a("meta[name=csrf-token]").attr("content",c)},refreshCsrfToken:function(){var c=b.getCsrfToken();c&&a('form input[name="'+b.getCsrfParam()+'"]').val(c)},confirm:function(a,b,c){confirm(a)?!b||b():!c||c()},handleAction:function(c,d){var q,e=c.attr("data-form")?a("#"+c.attr("data-form")):c.closest("form"),f=!c.data("method")&&e?e.attr("method"):c.data("method"),g=c.attr("href"),h=c.data("params"),i=c.data("pjax"),j=!!c.data("pjax-push-state"),k=!!c.data("pjax-replace-state"),l=c.data("pjax-timeout"),m=c.data("pjax-scrollto"),n=c.data("pjax-push-redirect"),o=c.data("pjax-replace-redirect"),p=c.data("pjax-skip-outer-containers"),r={};if(void 0!==i&&a.support.pjax&&(q=c.data("pjax-container")?c.data("pjax-container"):c.closest('[data-pjax-container=""]'),q.length||(q=a("body")),r={container:q,push:j,replace:k,scrollTo:m,pushRedirect:n,replaceRedirect:o,pjaxSkipOuterContainers:p,timeout:l,originalEvent:d,originalTarget:c}),void 0===f)return void(g&&"#"!=g?void 0!==i&&a.support.pjax?a.pjax.click(d,r):window.location=g:c.is(":submit")&&e.length&&(void 0!==i&&a.support.pjax&&e.on("submit",function(b){a.pjax.submit(b,r)}),e.trigger("submit")));var s=!e.length;if(s){g&&g.match(/(^\/|:\/\/)/)||(g=window.location.href),e=a("<form/>",{method:f,action:g});var t=c.attr("target");if(t&&e.attr("target",t),f.match(/(get|post)/i)||(e.append(a("<input/>",{name:"_method",value:f,type:"hidden"})),f="POST"),!f.match(/(get|head|options)/i)){var u=b.getCsrfParam();u&&e.append(a("<input/>",{name:u,value:b.getCsrfToken(),type:"hidden"}))}e.hide().appendTo("body")}var v=e.data("yiiActiveForm");v&&(v.submitObject=c),h&&a.isPlainObject(h)&&a.each(h,function(b,c){e.append(a("<input/>").attr({name:b,value:c,type:"hidden"}))});var w=e.attr("method");e.attr("method",f);var x=null;g&&"#"!=g&&(x=e.attr("action"),e.attr("action",g)),void 0!==i&&a.support.pjax&&e.on("submit",function(b){a.pjax.submit(b,r)}),e.trigger("submit"),a.when(e.data("yiiSubmitFinalizePromise")).then(function(){null!=x&&e.attr("action",x),e.attr("method",w),h&&a.isPlainObject(h)&&a.each(h,function(b,c){a('input[name="'+b+'"]',e).remove()}),s&&e.remove()})},getQueryParams:function(b){var c=b.indexOf("?");if(c<0)return{};var f,g,d=b.substring(c+1).split("#")[0].split("&"),e={};for(g=0;g<d.length;g++){f=d[g].split("=");var h=decodeURIComponent(f[0]),i=decodeURIComponent(f[1]);h.length&&(void 0!==e[h]?(a.isArray(e[h])||(e[h]=[e[h]]),e[h].push(i||"")):e[h]=i||"")}return e},initModule:function(c){(void 0===c.isActive||c.isActive)&&(a.isFunction(c.init)&&c.init(),a.each(c,function(){a.isPlainObject(this)&&b.initModule(this)}))},init:function(){d(),c(),f(),e()}};return b}(jQuery),jQuery(function(){yii.initModule(yii)});
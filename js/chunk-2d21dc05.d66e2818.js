(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21dc05"],{d344:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("Cascader",{attrs:{data:a.options,placeholder:"请选择团队和项目",clearable:""},on:{"on-change":a.handleChange},model:{value:a.cascader,callback:function(e){a.cascader=e},expression:"cascader"}})},c=[],s={data:function(){return{cascader:[],options:[]}},mounted:function(){this.getCascader()},methods:{getCascader:function(){var a=this;this.$axios.post("/api/v1/team/aggregate",{cascader:null}).then((function(e){a.options=e.data.data}))},handleChange:function(a){this.cascader=a;var e={team:a[0],project:a[1]};this.$emit("selectedTeamProject",e)}}},o=s,r=t("2877"),d=Object(r["a"])(o,n,c,!1,null,null,null);e["default"]=d.exports}}]);
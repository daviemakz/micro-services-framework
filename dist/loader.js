'use strict';var loadModule=function(a,b){var c=b.babelConfig;return Object.keys(c||{})&&require("@babel/register")(c),require(a)};module.exports=loadModule;
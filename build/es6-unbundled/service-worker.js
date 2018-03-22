/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","9b4f1a13194d6388cbf6b757d79c81e0"],["bower_components/app-layout/app-drawer/app-drawer.html","3abcc56db13933605587736c7bfdec14"],["bower_components/app-layout/app-header-layout/app-header-layout.html","f183557c34cfd63bd1a17e4aa6153ee4"],["bower_components/app-layout/app-header/app-header.html","69f869162654d13bf2cb01ca77d91424"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","ce87c76a0d244d9c50638a78fd5f666c"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","fcab22347bace5d2787cf3aacc04584e"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","334eac7f54a828baedbe8f09574571b7"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","25003d1a7296402df3384eae0f652fbe"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","3b30b240f2fefc2a3334f9e8dac1e176"],["bower_components/app-layout/app-scroll-effects/effects/material.html","202276102c576c5363f7006196f887a3"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","9c29999e45cc4845556ad198bb4d5a61"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","e910e6eb858ac4b1dc855738fc5cb222"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","c0368f399bdd2788e9a0e2385cedd901"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","944b3732533c54566fa7c8ac28b1927f"],["bower_components/app-layout/app-toolbar/app-toolbar.html","c54b2991c48518a482c64f05527f707e"],["bower_components/app-layout/helpers/helpers.html","5e9d698459b5bba5c6c7cedf24807b6a"],["bower_components/app-route/app-location.html","1ab5b00dc7de661ce732479f31a2a4c1"],["bower_components/app-route/app-route-converter-behavior.html","da0518fb774be267061a2e3b61051cae"],["bower_components/app-route/app-route.html","390d129a0c11b868bdf1cd83d8919ec5"],["bower_components/geo-location/geo-location.html","83a32f52e09865d8a7294242ab93e35c"],["bower_components/google-apis/google-maps-api.html","7db1ba1c85a2a4976c99aadebb885dcf"],["bower_components/google-map/google-map-directions.html","194fb0b2c0489fb6c26ccc11848326a8"],["bower_components/google-map/google-map-marker.html","0f3b3d552c48367155fdb0ba18d35667"],["bower_components/google-map/google-map-point.html","3f606c4d5593396eb375fe842511e953"],["bower_components/google-map/google-map-poly.html","b13559fb4461d3f92838e1dc9bae7dd1"],["bower_components/google-map/google-map.html","3ca0fe364f22032a33e7c3a79b66795c"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","0549ddc949bd238d25b70c79f4378e1d"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","6055ebdc6406147f5fb0266d00f8b64b"],["bower_components/iron-ajax/iron-ajax.html","20e7f1b1351ae2814494b718bdfcc3d3"],["bower_components/iron-ajax/iron-request.html","a71e271e6cf1cf1421281146cfaab98c"],["bower_components/iron-behaviors/iron-button-state.html","f8a5c4e878dc95a4353f0b5f5b85cab6"],["bower_components/iron-behaviors/iron-control-state.html","1b0960ec37dc300c70b00f6c9c9d68b0"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","a2433babfc70259568d518bbcece1915"],["bower_components/iron-flex-layout/iron-flex-layout.html","a1d5815b75ecb0ff4b9124c76c414c07"],["bower_components/iron-icon/iron-icon.html","638e12f99729de08b5d6e95523cacae0"],["bower_components/iron-icons/communication-icons.html","0b7b0a7174dec1b80e3c86c42dc75ea5"],["bower_components/iron-icons/iron-icons.html","263c425f0e794d1e2fd636f8039a8586"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","1984a4370334857ccdafe8dfccf41b87"],["bower_components/iron-image/iron-image.html","c8b389d83bef8d9070504c3834db92e2"],["bower_components/iron-jsonp-library/iron-jsonp-library.html","4b60cbfdb81492b57c18c2ee082f9202"],["bower_components/iron-list/iron-list.html","11f94f285df9db19362cf5fe8320d793"],["bower_components/iron-location/iron-location.html","3f581e0943497385110240537715ce63"],["bower_components/iron-location/iron-query-params.html","a81f7aa94ea7a8fe122273b74558d8bf"],["bower_components/iron-media-query/iron-media-query.html","2b203c8815e31c0f522bd68f9ca893af"],["bower_components/iron-meta/iron-meta.html","7731166818fc101e856dfa9a3c392338"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","944887ea6ef024d392f76cef80fb616b"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","00e9d4425b48bc6234c6f5003e56440a"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","de88425fd4abc6ad8be30889fe2bb9bf"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","c59cac674316dacc434e0fcea6dea465"],["bower_components/iron-pages/iron-pages.html","ba0a8b0491b2ebd90f66abe94925873d"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","2c3d0cab86b291854ea21dca3bb8b7dc"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","184b9823ff36d75646267bc4b3754ca1"],["bower_components/iron-selector/iron-multi-selectable.html","1238459c5cfa1669f54139b7d953d6ea"],["bower_components/iron-selector/iron-selectable.html","4ae8ca9ea0a57f008174a42ab845c098"],["bower_components/iron-selector/iron-selection.html","3b099be4105659183cec28167eecc818"],["bower_components/iron-selector/iron-selector.html","763b8a5f4c386f9b4089a1c3a862f886"],["bower_components/paper-behaviors/paper-button-behavior.html","dbac4d7816b8028a454c9a2fda85e2f2"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","e924a905384043b867d3406180a5dfb6"],["bower_components/paper-behaviors/paper-ripple-behavior.html","3a19a7d7da73e0dee6a3401f883daeb4"],["bower_components/paper-button/paper-button.html","3524d6d89368a059a3de9bd03a7a460b"],["bower_components/paper-card/paper-card.html","f15ef35f9b6f42a2a24bb2bd2cebf1d8"],["bower_components/paper-icon-button/paper-icon-button.html","d41756b2800c9c5723f9e26354f3678d"],["bower_components/paper-ripple/paper-ripple.html","436627fa04321e15f1139567e6333da0"],["bower_components/paper-styles/color.html","866b6ec41ce8d64f1c2d855b5575c2f8"],["bower_components/paper-styles/default-theme.html","e8d31d2b3b8a50ffcc41309a0d30d6fd"],["bower_components/paper-styles/element-styles/paper-material-styles.html","f5099c086e9de8e8f63791a0e453d9cd"],["bower_components/paper-styles/shadow.html","7e78354681d009918cedc4a61cfc5a10"],["bower_components/paper-toast/paper-toast.html","43e4fc8a46a2116b9fc5f325f974dc0e"],["bower_components/polymer/lib/elements/array-selector.html","31f153947940216002eee38d48fdbecc"],["bower_components/polymer/lib/elements/custom-style.html","88fc66292ad8dd2ac9fc4121d2c5184b"],["bower_components/polymer/lib/elements/dom-bind.html","36f7a0cc783b2c17f67c946c18bb54b8"],["bower_components/polymer/lib/elements/dom-if.html","823e52a6781a325255be171d35b874b9"],["bower_components/polymer/lib/elements/dom-module.html","b0080abd6a746a72114a399e219632ff"],["bower_components/polymer/lib/elements/dom-repeat.html","499bab8a9a9844f6ad2cf07925f3ecff"],["bower_components/polymer/lib/legacy/class.html","97012e94d27cb85ff3487d6ad81b9cc2"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","a85bad68597f6e37023e22de6b6c8ca6"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","32862008e9eb0829112f6fd636d621a0"],["bower_components/polymer/lib/legacy/polymer-fn.html","e2d58b76a20124cbeb280e44994f634b"],["bower_components/polymer/lib/legacy/polymer.dom.html","a31910004bba2a16a4d2145bdd103ece"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","951286261793bebcf3671c6b7f2cace4"],["bower_components/polymer/lib/mixins/dir-mixin.html","8cd51cb15e78373a2fe0b501511cd120"],["bower_components/polymer/lib/mixins/element-mixin.html","0206c2969da019ed310727cbd287e5de"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","bcda05e121c9a94b9a5449713e30170c"],["bower_components/polymer/lib/mixins/mutable-data.html","7048219ebcfcafe306dfd1c40c1a3fbe"],["bower_components/polymer/lib/mixins/properties-changed.html","c21a459c098d9e1c02ac4b199d72e548"],["bower_components/polymer/lib/mixins/properties-mixin.html","5b98cb820dec06370da513056e3c9bb8"],["bower_components/polymer/lib/mixins/property-accessors.html","127b4e6231865105d7add984a1bc0dee"],["bower_components/polymer/lib/mixins/property-effects.html","30701e7c267b9d28c867abfb41df82f2"],["bower_components/polymer/lib/mixins/template-stamp.html","993d8d6f21146caaefcfe66db5009fad"],["bower_components/polymer/lib/utils/array-splice.html","5238d5a8caedb19422d610baf51d5924"],["bower_components/polymer/lib/utils/async.html","4d855251570da99798ec5425f44f90a3"],["bower_components/polymer/lib/utils/boot.html","643030ce5a0cc34a7422da13e4f21f3c"],["bower_components/polymer/lib/utils/case-map.html","e4947188d5cd6fdd1fe8432989aaf0dd"],["bower_components/polymer/lib/utils/debounce.html","ec804d9e400fef2e8ec038d46069be71"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","ac0c308cf95d94cc995d57e225b946d8"],["bower_components/polymer/lib/utils/flush.html","d5652ad419cc81e9c0f9a5e01f86b6c6"],["bower_components/polymer/lib/utils/gestures.html","32265c2ebe19f43ccbba5089c52d77b0"],["bower_components/polymer/lib/utils/html-tag.html","e55ca55b1ee46d6e26214c71bf44efdf"],["bower_components/polymer/lib/utils/import-href.html","0bf7a116d3d744cb5319ca91b4fd03c6"],["bower_components/polymer/lib/utils/mixin.html","570b8a2f2851aa5bbc564556194a9c9e"],["bower_components/polymer/lib/utils/path.html","cf8c4ecf9f648700dc8086bdd9b6387a"],["bower_components/polymer/lib/utils/render-status.html","c97d97bbaafab88fd5d5b53c058735a0"],["bower_components/polymer/lib/utils/resolve-url.html","63543911b21bec0f292b4ea3ea92bbdd"],["bower_components/polymer/lib/utils/settings.html","c75c700484d5c8443e6552709a33e1d7"],["bower_components/polymer/lib/utils/style-gather.html","0b1b4212563e964c991193d4f98c6237"],["bower_components/polymer/lib/utils/templatize.html","3f0553c95f33d44fe4de4934b1e5e47d"],["bower_components/polymer/lib/utils/unresolved.html","56cb30154b8cc807876f9b4b7788b0d8"],["bower_components/polymer/polymer-element.html","8c50b77d55afcd9ecb76dc39fb15c980"],["bower_components/polymer/polymer.html","9dbb13a6b3c05c6b4208b6a46cb544ec"],["bower_components/shadycss/apply-shim.html","a7855a6be7cd2ceab940f13c1afba1f3"],["bower_components/shadycss/apply-shim.min.js","fcf542b8c431dc685754fc2176908136"],["bower_components/shadycss/custom-style-interface.html","7784f566f143bec28bf67b864bedf658"],["bower_components/shadycss/custom-style-interface.min.js","8e4653f8934008ee170514701df5c1fd"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["index.html","9c1627fb486bb63b1e44495775d47c80"],["manifest.json","5f58b6988b1dd243fa0a925d8e8723aa"],["src/elements/business-locations.html","addfd3c0a141a561238a3ac37c257af6"],["src/elements/maps-feature.html","632eab5d77163dfa163199549d936469"],["src/my-app.html","b207b544aa95f2bd4c4712fc60747064"],["src/my-icons.html","0d840610c28cc21d502b7902cd0be77c"],["src/my-view1.html","76a61d9439b7b4d19e0e875441cbc819"],["src/my-view2.html","d54aba87013839e93a164d1ea2fd1b7e"],["src/my-view404.html","d0425ea1ad20ca1bbcdd08ba2b6b7706"],["src/shared-styles.html","09c261064614fe9ce895112c5e79c9c1"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/bower_components\/webcomponentsjs\/.*.js/, toolbox.fastest, {"cache":{"name":"webcomponentsjs-polyfills-cache"}});





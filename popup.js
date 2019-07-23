// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
const feedback = $('#feedback');
const search = $('#search').on('change', function() {
  const term = search.attr('value');
  $.get(`https://www.linkedin.com/help/api/hip/v1/search/linkedin/jobs?query=${term}`);
  //Re prese
});

const walkthrough = $('#walkthrough');
const form = $('#form').submit(function() {
  return false;
});
let ff = [];
chrome.storage.sync.get('feedback', function(data) {
  ff = data;
});


https://www.linkedin.com/help/api/hip/v1/show/linkedin/jobs

feedback.click(function(element) {
   ff.push({ title: 'Test', text: prompt("Describe your issues and ideas", search.attr('value')) });
   chrome.storage.sync.set('feedback',feedback);
});

walkthrough.click(function(element) {
  let color = walkthrough.attr('value');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "black";'});
  });
})

// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";
const list = $("#list");
const search = $("#search").keyup(function() {
  const term = search.val();
  if (term) {
    $.get(
      `https://www.linkedin.com/help/api/hip/v1/search/linkedin/jobs?query=${term}`,
      function(data) {
        if (data.contentList.length) {
          list.html(""); //clear the list
          $.each(data.contentList, function(i, d) {
            list.append(
              `<a target="_blank" href="${domain}${
                d.url
              }" class="list-group-item list-group-item-action">${d.title}</a>`
            );
          });
        }
      }
    );
  }
});

const form = $("form").submit(function() {
  return false;
});

let ff = [];
chrome.storage.sync.get("feedback", function({ feedback }) {
  debugger;
  ff = feedback;
});

const domain = "https://www.linkedin.com";
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const url = tabs[0].url;
  const path = url.substring(url.indexOf(domain) + domain.length);
  $.getJSON(`${domain}/help/api/hip/v1/show/linkedin${path}`, function(data) {
    list.html(""); //clear the list
    $.each(data.contentList, function(i, d) {
      list.append(
        `<a target="_blank" href="${domain}${
          d.url
        }" class="list-group-item list-group-item-action">${d.title}</a>`
      );
    });
  });
});

const feedback = $("#feedback").click(function(element) {
  ff.push({
    title: "Test",
    text: prompt("Describe your issues and ideas", search.val())
  });
  chrome.storage.sync.set({ feedback: ff }, function() {
    //notification
    chrome.notifications.create({
      title: "Send Feedback?",
      message: "Your feedback was saved. Would you like to send it now?"
    });
    console.log("saved");
  });
});

const walkthrough = $("[data-walkthrough]").click(function() {
  let walk = $(this).attr("data-walkthrough");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `walkthrough("${walk}");`,
    });
  });
});

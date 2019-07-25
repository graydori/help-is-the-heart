// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";
const page = $("#feedback");

function constructOptions({feedback}) {
  debugger;
  for (let item of feedback) {
    let card = $(`<div class="card" style="width: 18rem;">
    <img src="${item.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.text}</p>
      <a href="#" class="btn btn-secondary">Discard</a>
      <a href="#" class="btn btn-primary">Send Feedback</a>
    </div>
  </div>
  `);
    card
      .on("click", "btn-primary", function() {
        alert("Re submit");
      })
      .on("click", "btn-secondary", function() {
        card.remove();
      });
    page.append(button);
  }
}

chrome.storage.sync.get("feedback", constructOptions);

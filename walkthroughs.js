"use script";
const walkthroughs = {
  "search-jobs": [
    {
      title: "Click the keyword search box",
      selector: ".jobs-search-box__input--keyword input:not([disabled])",
      trigger: "focus"
    },
    {
      title: "Type a keyword when focused",
      selector: ".jobs-search-box__input--keyword input:not([disabled])",
      trigger: "keydown"
    },
    {
      title: "Or select a result as you type",
      selector: ".jobs-search-box__typeahead-results li:first-child button",
      trigger: "click"
    },
    {
      title:
        "Click the location search box to specify where you might want to look for jobs",
      selector: ".jobs-search-box__input--location input:not([disabled])",
      trigger: "focus"
    },
    {
      title: "Type a location when focused",
      selector: ".jobs-search-box__input--location input:not([disabled])",
      trigger: "change"
    },
    {
      title: "Click search to start looking at jobs",
      selector: ".jobs-search-box__submit-button",
      trigger: "change"
    }
  ],
  "filter-jobs": [],
  "job-alers": []
};

function walkthrough(key) {
  show = function(k, p, i, last) {
    if (last) {
      last.destroy();
    }
    const current = p[i];
    if (current) {
      const ele = $(current.selector);
      const tip = new Drop({
        target: ele[0],
        content: current.title + '<button class="dismiss" type="btn">Dismiss</button>',
        classes: "drop-theme-arrows",
        openOn: "always"
      });
      ele.one(current.trigger, show.bind(this, k, p, i + 1, tip));

      tip.open();
      $(tip.drop).on('click', '.dismiss', function() { tip.destroy();  })
    } else {
      console.log(`Nothing left ${k} at ${i}`);
    }
  };
  const proccess = walkthroughs[key];
  show(key, proccess, 0);
}

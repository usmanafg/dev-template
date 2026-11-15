(function () {
  "use strict";

  var cfg = window.PORTFOLIO_CONFIG || {};
  var workItems = (cfg.work && cfg.work.items) || [];
  var currentFilter = "all";
  var selectedId = workItems.length ? workItems[0].id : null;
  var selectedPacketIndex = 0;

  function byId(id) {
    return document.getElementById(id);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function hydrateProfileAndTelemetry() {
    var p = cfg.profile;
    if (!p) return;

    document.title = p.handle + " · " + p.role;
    if (byId("nav-handle")) byId("nav-handle").textContent = p.handle;
    if (byId("hero-title")) byId("hero-title").textContent = p.headline;
    if (byId("hero-summary")) byId("hero-summary").textContent = p.summary;

    if (byId("hero-primary-cta") && p.primaryAction) {
      byId("hero-primary-cta").textContent = p.primaryAction.label;
      byId("hero-primary-cta").setAttribute("href", p.primaryAction.href);
    }

    if (byId("hero-secondary-cta") && p.secondaryAction) {
      byId("hero-secondary-cta").textContent = p.secondaryAction.label;
      byId("hero-secondary-cta").setAttribute("href", p.secondaryAction.href);
    }

    if (byId("hero-tracks") && Array.isArray(p.tracks)) {
      byId("hero-tracks").innerHTML = p.tracks
        .map(function (t) {
          return (
            '<a href="' + escapeHtml(t.href) + '" class="track-pill">' +
            '<span class="track-name">' + escapeHtml(t.label) + "</span>" +
            '<span class="track-meta tabular">' + escapeHtml(t.meta) + "</span>" +
            "</a>"
          );
        })
        .join("");
    }

    if (p.telemetry) {
      var tel = p.telemetry;
      if (byId("telemetry-title")) byId("telemetry-title").textContent = tel.title;
      if (byId("telemetry-status")) {
        byId("telemetry-status").innerHTML =
          '<span class="status-dot" aria-hidden="true"></span>' + escapeHtml(tel.statusLabel);
      }

      if (byId("budget-summary")) {
        var idle = (tel.frameBudgetMs - tel.activeTickMs).toFixed(2);
        byId("budget-summary").textContent =
          tel.activeTickMs.toFixed(2) + " ms used · " + idle + " ms headroom";
      }

      if (byId("budget-phases") && Array.isArray(tel.phases)) {
        byId("budget-phases").innerHTML = tel.phases
          .map(function (ph) {
            return "<span>" + escapeHtml(ph.label) + " " + ph.ms.toFixed(1) + " ms</span>";
          })
          .join("");
      }

      if (byId("budget-track") && Array.isArray(tel.phases)) {
        var idleShare = Math.max(10, Math.round((tel.frameBudgetMs - tel.activeTickMs) * 10));
        var segClasses = ["budget-seg-sim", "budget-seg-grid", "budget-seg-pack"];
        var bars = tel.phases
          .map(function (ph, idx) {
            var cls = segClasses[idx] || "budget-seg-pack";
            return '<span class="budget-seg ' + cls + '" style="flex-grow: ' + Math.round(ph.ms * 10) + '"></span>';
          })
          .join("");
        bars += '<span class="budget-seg budget-seg-idle" style="flex-grow: ' + idleShare + '"></span>';
        byId("budget-track").innerHTML = bars;
      }

      if (byId("packet-total")) {
        var reduction = Math.round((1 - tel.snapshotBytes / tel.legacyBytes) * 100);
        byId("packet-total").textContent =
          tel.snapshotBytes + " B / entity (" + reduction + "% smaller vs Lua table)";
      }

      renderPacketInspector();
    }

    if (byId("contact-email")) {
      byId("contact-email").textContent = p.email;
      byId("contact-email").setAttribute("href", "mailto:" + p.email);
    }

    if (byId("contact-location")) {
      byId("contact-location").textContent = p.location + " · " + p.replyTime;
    }

    if (p.links && p.links.length && byId("footer-links")) {
      byId("footer-links").innerHTML = p.links
        .map(function (link) {
          return (
            '<a href="' +
            escapeHtml(link.href) +
            '" target="_blank" rel="noreferrer">' +
            escapeHtml(link.label) +
            "</a>"
          );
        })
        .join("");

      if (byId("contact-github")) {
        var primaryLink = p.links[0];
        byId("contact-github").textContent = primaryLink.label + " " + (primaryLink.meta || "");
        byId("contact-github").setAttribute("href", primaryLink.href);
      }
    }
  }

  function renderPacketInspector() {
    var tel = cfg.profile && cfg.profile.telemetry;
    if (!tel || !Array.isArray(tel.fields) || !tel.fields.length) return;

    var shortNames = {
      entityId: "id",
      posQ: "posQ",
      yaw: "yaw",
      stateFlags: "flg",
      health: "hp",
      tickCrc: "crc"
    };

    if (byId("packet-slots")) {
      byId("packet-slots").innerHTML = tel.fields
        .map(function (field, idx) {
          var active = idx === selectedPacketIndex;
          var label = shortNames[field.name] || field.name;
          return (
            '<button type="button" class="packet-slot' +
            (active ? " is-active" : "") +
            '" data-field-index="' +
            idx +
            '" aria-pressed="' +
            (active ? "true" : "false") +
            '" style="flex-grow: ' +
            field.bytes +
            '">' +
            '<span class="slot-name">' + escapeHtml(label) + "</span>" +
            '<span class="slot-bytes tabular">' + field.bytes + " B</span>" +
            "</button>"
          );
        })
        .join("");
    }

    var current = tel.fields[selectedPacketIndex] || tel.fields[0];
    if (byId("packet-field-title")) byId("packet-field-title").textContent = current.name;
    if (byId("packet-field-code")) {
      byId("packet-field-code").textContent =
        current.type + " · " + current.bytes + (current.bytes === 1 ? " byte" : " bytes");
    }
    if (byId("packet-field-note")) byId("packet-field-note").textContent = current.note;
  }

  function hydrateAboutAndStats() {
    var a = cfg.about;
    if (a) {
      if (byId("about-heading")) byId("about-heading").textContent = a.heading;
      if (byId("about-facts") && Array.isArray(a.facts)) {
        byId("about-facts").innerHTML = a.facts
          .map(function (fact) {
            return (
              '<div class="fact-row">' +
              "<dt>" + escapeHtml(fact.label) + "</dt>" +
              "<dd>" + escapeHtml(fact.value) + "</dd>" +
              "</div>"
            );
          })
          .join("");
      }

      if (byId("standards-title") && a.standardsTitle) {
        byId("standards-title").textContent = a.standardsTitle;
      }

      if (byId("standards-list") && Array.isArray(a.standards)) {
        byId("standards-list").innerHTML = a.standards
          .map(function (row) {
            var valHtml = row.value.indexOf("--!strict") === 0
              ? "<code>--!strict</code>" + escapeHtml(row.value.slice("--!strict".length))
              : escapeHtml(row.value);
            return (
              '<div class="standard-row">' +
              "<dt>" + escapeHtml(row.label) + "</dt>" +
              "<dd>" + valHtml + "</dd>" +
              "</div>"
            );
          })
          .join("");
      }

      if (byId("about-paragraphs") && Array.isArray(a.paragraphs)) {
        var parasHtml = a.paragraphs
          .map(function (text, idx) {
            if (idx === 1 && text.indexOf("45,000 concurrent players") !== -1) {
              var safe = escapeHtml(text).replace(
                "45,000 concurrent players",
                '<span class="marker-highlight">45,000 concurrent players</span>'
              );
              return "<p>" + safe + "</p>";
            }
            return "<p>" + escapeHtml(text) + "</p>";
          })
          .join("");

        parasHtml +=
          '<div class="letter-signoff">' +
          '<span class="signoff-name">' + escapeHtml(a.signoffName) + "</span>" +
          '<span class="signoff-role">' + escapeHtml(a.signoffRole) + "</span>" +
          "</div>";

        byId("about-paragraphs").innerHTML = parasHtml;
      }
    }

    var s = cfg.stats;
    if (s) {
      if (byId("stats-heading")) byId("stats-heading").textContent = s.heading;
      if (byId("benchmarks-title") && s.benchmarksTitle) {
        byId("benchmarks-title").textContent = s.benchmarksTitle;
      }
      if (byId("benchmarks-sub") && s.benchmarksSub) {
        byId("benchmarks-sub").textContent = s.benchmarksSub;
      }

      if (byId("benchmark-bars") && Array.isArray(s.benchmarks)) {
        var maxKb = Math.max.apply(
          null,
          s.benchmarks.map(function (b) { return b.kb || 1; })
        );
        byId("benchmark-bars").innerHTML = s.benchmarks
          .map(function (b) {
            var pct = Math.max(8, Math.round((b.kb / maxKb) * 100));
            return (
              '<div class="benchmark-row' + (b.active ? " is-accent" : "") + '">' +
              '<div class="benchmark-row-head">' +
              '<span class="benchmark-name">' + escapeHtml(b.label) + "</span>" +
              '<span class="benchmark-value tabular">' + escapeHtml(b.value) + "</span>" +
              "</div>" +
              '<div class="benchmark-track">' +
              '<div class="benchmark-fill" style="width: ' + pct + '%"></div>' +
              "</div>" +
              '<span class="benchmark-meta tabular">' + escapeHtml(b.meta) + "</span>" +
              "</div>"
            );
          })
          .join("");
      }

      if (byId("stats-list") && Array.isArray(s.items)) {
        byId("stats-list").innerHTML = s.items
          .map(function (item) {
            var countAttr = item.countTarget
              ? '<span data-sc-count="0 ' + escapeHtml(item.countTarget) + '" data-sc-count-at="0 0.65">' +
                escapeHtml(item.countTarget) +
                "</span>" +
                escapeHtml(item.suffix || "")
              : escapeHtml(item.figure);
            return (
              '<div class="stat-row">' +
              '<dt class="stat-figure tabular">' + countAttr + "</dt>" +
              '<dd class="stat-desc">' + escapeHtml(item.description) + "</dd>" +
              "</div>"
            );
          })
          .join("");
      }
    }
  }

  function hydrateShowcaseStackContact() {
    var sc = cfg.showcase;
    if (sc) {
      if (byId("showcase-heading")) byId("showcase-heading").textContent = sc.heading;
      if (byId("showcase-intro") && sc.intro) byId("showcase-intro").textContent = sc.intro;
      if (byId("showcase-link")) {
        byId("showcase-link").textContent = sc.linkLabel;
        byId("showcase-link").setAttribute("href", sc.linkHref);
      }

      if (byId("showcase-frames") && Array.isArray(sc.frames)) {
        byId("showcase-frames").innerHTML = sc.frames
          .map(function (frame) {
            var metricsHtml = (frame.metrics || [])
              .map(function (m) {
                return (
                  '<div class="system-metric">' +
                  "<span>" + escapeHtml(m.label) + "</span>" +
                  "<strong>" + escapeHtml(m.value) + "</strong>" +
                  "</div>"
                );
              })
              .join("");
            return (
              '<article class="system-card" data-sc-tilt="5" data-ui>' +
              '<div class="system-head">' +
              '<h3 class="system-title">' + escapeHtml(frame.title) + "</h3>" +
              '<span class="system-fact tabular">' + escapeHtml(frame.fact) + "</span>" +
              "</div>" +
              '<p class="system-summary">' + escapeHtml(frame.summary) + "</p>" +
              '<div class="system-metrics tabular">' + metricsHtml + "</div>" +
              '<pre class="system-code"><code>' + escapeHtml(frame.codeSample) + "</code></pre>" +
              "</article>"
            );
          })
          .join("");
      }
    }

    var sn = cfg.stackAndNotes;
    if (sn && byId("stack-column")) {
      var groupsHtml = '<h2 class="section-heading" id="stack-heading">' + escapeHtml(sn.heading) + "</h2>";
      groupsHtml += (sn.stackGroups || [])
        .map(function (group) {
          var rows = (group.items || [])
            .map(function (item) {
              return (
                '<li class="two-ended-row">' +
                '<span class="two-ended-left"><span class="dot-swatch" style="background-color:' +
                escapeHtml(item.dot || "#2b2622") +
                '"></span>' +
                escapeHtml(item.name) +
                "</span>" +
                '<span class="two-ended-right">' +
                escapeHtml(item.meta) +
                "</span>" +
                "</li>"
              );
            })
            .join("");
          return (
            '<div class="stack-group">' +
            '<h3 class="group-label">' + escapeHtml(group.group) + "</h3>" +
            '<ul class="two-ended-list">' + rows + "</ul>" +
            "</div>"
          );
        })
        .join("");
      byId("stack-column").innerHTML = groupsHtml;
    }

    if (sn && byId("notes-heading")) {
      byId("notes-heading").textContent = sn.notesHeading || "Engineering Notes";
    }

    if (sn && byId("notes-list") && Array.isArray(sn.notes)) {
      byId("notes-list").innerHTML = sn.notes
        .map(function (note, idx) {
          var open = idx === 0;
          return (
            '<article class="note-item' + (open ? " is-open" : "") + '">' +
            '<button type="button" class="note-trigger" aria-expanded="' + (open ? "true" : "false") + '">' +
            '<span class="note-title">' + escapeHtml(note.title) + "</span>" +
            '<span class="note-meta tabular">' + escapeHtml(note.date) + " · " + escapeHtml(note.readTime) + "</span>" +
            "</button>" +
            '<p class="note-body"' + (open ? "" : " hidden") + ">" + escapeHtml(note.summary) + "</p>" +
            "</article>"
          );
        })
        .join("");
    }

    var ct = cfg.contact;
    if (ct) {
      if (byId("contact-heading") && ct.heading) byId("contact-heading").textContent = ct.heading;
      if (byId("contact-statement")) byId("contact-statement").textContent = ct.statement;
      if (byId("contact-prompt")) byId("contact-prompt").textContent = ct.prompt;
      if (byId("footer-left") && ct.footerLeft) byId("footer-left").textContent = ct.footerLeft;
      if (byId("footer-right") && ct.footerRight) byId("footer-right").textContent = ct.footerRight;

      if (ct.availability) {
        if (byId("availability-heading")) byId("availability-heading").textContent = ct.availability.heading;
        if (byId("availability-status")) byId("availability-status").textContent = ct.availability.status;
        if (byId("availability-rows") && Array.isArray(ct.availability.rows)) {
          byId("availability-rows").innerHTML = ct.availability.rows
            .map(function (row) {
              return (
                '<div class="availability-row">' +
                "<dt>" + escapeHtml(row.label) + "</dt>" +
                "<dd>" + escapeHtml(row.value) + "</dd>" +
                "</div>"
              );
            })
            .join("");
        }
      }
    }
  }

  function renderLedger() {
    var listEl = byId("ledger-list");
    if (!listEl || !workItems.length) return;

    var visible = workItems.filter(function (item) {
      return currentFilter === "all" || item.category === currentFilter;
    });

    if (!visible.some(function (item) { return item.id === selectedId; }) && visible.length) {
      selectedId = visible[0].id;
    }

    listEl.innerHTML = visible
      .map(function (item) {
        var isSelected = item.id === selectedId;
        return (
          '<button type="button" class="ledger-row' +
          (isSelected ? " is-selected" : "") +
          '" data-project-id="' +
          escapeHtml(item.id) +
          '" data-category="' +
          escapeHtml(item.category) +
          '">' +
          '<span class="ledger-name">' + escapeHtml(item.title) + "</span>" +
          '<span class="ledger-kind">' + escapeHtml(item.role + " · " + item.stack) + "</span>" +
          '<span class="ledger-year tabular">' + escapeHtml(item.year) + "</span>" +
          "</button>"
        );
      })
      .join("");

    updatePreview();
  }

  function updatePreview() {
    var item =
      workItems.find(function (w) {
        return w.id === selectedId;
      }) || workItems[0];
    if (!item) return;

    if (byId("preview-title")) byId("preview-title").textContent = item.title;
    if (byId("preview-metric")) byId("preview-metric").textContent = item.metric;
    if (byId("preview-budget")) byId("preview-budget").textContent = item.frameBudgetMs || "4.0 ms tick";
    if (byId("preview-payload")) {
      byId("preview-payload").textContent = (item.packetBytesPerEntity || 14) + " B / entity";
    }
    if (byId("preview-pipeline") && Array.isArray(item.pipeline)) {
      byId("preview-pipeline").innerHTML = item.pipeline
        .map(function (stage, idx) {
          var sep = idx < item.pipeline.length - 1 ? '<span class="pipeline-arrow" aria-hidden="true">-&gt;</span>' : "";
          return '<span class="pipeline-node">' + escapeHtml(stage) + "</span>" + sep;
        })
        .join("");
    }
    if (byId("preview-summary")) byId("preview-summary").textContent = item.summary;
    if (byId("preview-stack")) byId("preview-stack").textContent = item.stack;
    if (byId("preview-link")) byId("preview-link").setAttribute("href", item.url);

    updateBandwidthCalculator(item);
  }

  function updateBandwidthCalculator(item) {
    var slider = byId("ccu-slider");
    if (!slider) return;
    var ccu = Number(slider.value) || 150000;
    var bytesPerEntity = (item && item.packetBytesPerEntity) || 14;
    var shards = Math.max(1, Math.ceil(ccu / 50));
    var activeEntitiesPerServer = 50;
    var kbPerSecond = (bytesPerEntity * activeEntitiesPerServer * 60) / 1024;

    if (byId("ccu-readout")) byId("ccu-readout").textContent = ccu.toLocaleString("en-US") + " CCU";
    if (byId("packet-rate-label")) byId("packet-rate-label").textContent = bytesPerEntity + " B / entity @ 60 Hz";
    if (byId("metric-shards")) byId("metric-shards").textContent = shards.toLocaleString("en-US");
    if (byId("metric-throughput")) byId("metric-throughput").textContent = kbPerSecond.toFixed(1) + " KB/s";
  }

  function wireInteractions() {
    var slots = byId("packet-slots");
    if (slots) {
      slots.addEventListener("click", function (ev) {
        var btn = ev.target.closest(".packet-slot");
        if (!btn) return;
        selectedPacketIndex = Number(btn.getAttribute("data-field-index")) || 0;
        renderPacketInspector();
      });
    }

    var filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        currentFilter = btn.getAttribute("data-filter") || "all";
        renderLedger();
      });
    });

    var ledger = byId("ledger-list");
    if (ledger) {
      ledger.addEventListener("click", function (ev) {
        var row = ev.target.closest(".ledger-row");
        if (!row) return;
        selectedId = row.getAttribute("data-project-id");
        renderLedger();
      });

      ledger.addEventListener("mouseover", function (ev) {
        var row = ev.target.closest(".ledger-row");
        if (!row) return;
        var hoveredId = row.getAttribute("data-project-id");
        if (hoveredId && hoveredId !== selectedId) {
          selectedId = hoveredId;
          ledger.querySelectorAll(".ledger-row").forEach(function (r) {
            r.classList.toggle("is-selected", r.getAttribute("data-project-id") === selectedId);
          });
          updatePreview();
        }
      });
    }

    var slider = byId("ccu-slider");
    if (slider) {
      slider.addEventListener("input", function () {
        var item =
          workItems.find(function (w) {
            return w.id === selectedId;
          }) || workItems[0];
        updateBandwidthCalculator(item);
      });
    }

    var notesList = byId("notes-list");
    if (notesList) {
      notesList.addEventListener("click", function (ev) {
        var trigger = ev.target.closest(".note-trigger");
        if (!trigger) return;
        var card = trigger.closest(".note-item");
        var body = card ? card.querySelector(".note-body") : null;
        if (!card || !body) return;

        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        card.classList.toggle("is-open", !expanded);
        if (expanded) {
          body.setAttribute("hidden", "");
        } else {
          body.removeAttribute("hidden");
        }
      });
    }
  }

  function applyReducedMotionHoldFlags() {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) return;
    var statsStage = document.querySelector("#stats [data-sc-stage]");
    var showcaseStage = document.querySelector("#showcase [data-sc-stage]");
    if (statsStage) statsStage.setAttribute("data-sc-verify-hold", "true");
    if (showcaseStage) showcaseStage.setAttribute("data-sc-verify-hold", "true");
  }

  hydrateProfileAndTelemetry();
  hydrateAboutAndStats();
  hydrateShowcaseStackContact();
  renderLedger();
  wireInteractions();
  applyReducedMotionHoldFlags();

  if (window.ScrollCraft && typeof window.ScrollCraft.mount === "function") {
    window.ScrollCraft.mount(document.body);
  }
})();

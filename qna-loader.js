(function () {
  const campaigns = [
    {
        "id":  "afc",
        "title":  "AMERICAN FIREFIGHTERS COALITION PAC",
        "file":  "afcqna.html"
    },
    {
        "id":  "cpft",
        "title":  "COMMITTEE FOR PARAMEDICS AND FIREFIGHTERS PAC",
        "file":  "cpftqna.html"
    },
    {
        "id":  "fcf",
        "title":  "FIREFIGHTERS CHARITABLE FOUNDATION",
        "file":  "fcfqna.html"
    },
    {
        "id":  "ffsa",
        "title":  "FIREFIGHTERS SUPPORT ALLIANCE",
        "file":  "ffsaqna.html"
    },
    {
        "id":  "ncvf",
        "title":  "NATIONAL COMMITTEE FOR VOLUNTEER FIREFIGHTERS PAC",
        "file":  "ncvfqna.html"
    },
    {
        "id":  "vfa",
        "title":  "VOLUNTEER FIREFIGHTERS ALLIANCE",
        "file":  "vfaqna.html"
    },
    {
        "id":  "voffsc",
        "title":  "VOLUNTEER FIREFIGHTERS SUPPORT COMMITTEE PAC",
        "file":  "voffscqna.html"
    },
    {
        "id":  "acps",
        "title":  "COALITION FOR POLICE AND SHERIFFS PAC",
        "file":  "acpsqna.html"
    },
    {
        "id":  "cpod",
        "title":  "COMMITTEE FOR POLICE OFFICERS DEFENSE",
        "file":  "cpodqna.html"
    },
    {
        "id":  "dare",
        "title":  "DARE DRUG ABUSE RESISTANCE EDUCATION",
        "file":  "dareqna.html"
    },
    {
        "id":  "flpta",
        "title":  "FLORIDA POLICE AND TROOPERS ASSOCIATION",
        "file":  "flptaqna.html"
    },
    {
        "id":  "lead",
        "title":  "LAW ENFORCEMENT AGAINST DRUGS",
        "file":  "leadqna.html"
    },
    {
        "id":  "mifpac",
        "title":  "MICHIGAN FRATERNAL ORDER OF POLICE FUND",
        "file":  "mifpacqna.html"
    },
    {
        "id":  "nerc",
        "title":  "NATIONAL EMERGENCY RESPONDERS COALITION",
        "file":  "nercqna.html"
    },
    {
        "id":  "nfof",
        "title":  "NATIONAL FALLEN OFFICER FOUNDATION",
        "file":  "nfofqna.html"
    },
    {
        "id":  "npsf",
        "title":  "NATIONAL POLICE SUPPORT FUND",
        "file":  "npsfqna.html"
    },
    {
        "id":  "njpof",
        "title":  "NEW JERSEY POLICE OFFICERS FOUNDATION",
        "file":  "njpofqna.html"
    },
    {
        "id":  "pnoa",
        "title":  "PENNSYLVANIA NARCOTICS OFFICERS ASSOCIATION",
        "file":  "pnoaqna.html"
    },
    {
        "id":  "pssa",
        "title":  "POLICE AND SHERIFFS SUPPORT ALLIANCE PAC",
        "file":  "pssaqna.html"
    },
    {
        "id":  "ptrf",
        "title":  "POLICE AND TROOPERS RELIEF FOUNDATION",
        "file":  "ptrfqna.html"
    },
    {
        "id":  "poac",
        "title":  "POLICE OFFICERS ALLIANCE PAC",
        "file":  "poacqna.html"
    },
    {
        "id":  "posa",
        "title":  "POLICE OFFICERS SUPPORT ASSOCIATION PAC",
        "file":  "posaqna.html"
    },
    {
        "id":  "txcops",
        "title":  "TEXAS COALITION OF POLICE AND SHERIFFS",
        "file":  "txcopsqna.html"
    },
    {
        "id":  "txfof",
        "title":  "TEXAS FALLEN OFFICER FOUNDATION",
        "file":  "txfofqna.html"
    },
    {
        "id":  "pava",
        "title":  "THE POLICE ASSOCIATION OF VIRGINIA",
        "file":  "pavaqna.html"
    },
    {
        "id":  "pcny",
        "title":  "THE POLICE CONFERENCE OF NEW YORK",
        "file":  "pcnyqna.html"
    },
    {
        "id":  "nyamvets",
        "title":  "AMERICAN VETERANS DEPARTMENT OF NEW YORK",
        "file":  "nyamvetsqna.html"
    },
    {
        "id":  "avsc",
        "title":  "AMERICAN VETERANS SUPPORT COMMITTEE PAC",
        "file":  "avscqna.html"
    },
    {
        "id":  "hscdipac",
        "title":  "HANDICAPPED VETERANS SERVICE INITIATIVE PAC",
        "file":  "hscdipacqna.html"
    },
    {
        "id":  "ncdv",
        "title":  "NATIONAL COALITION FOR DISABLED VETERANS PAC",
        "file":  "ncdvqna.html"
    },
    {
        "id":  "unvet",
        "title":  "THE UNITED VETERANS OF AMERICA PAC",
        "file":  "unvetqna.html"
    },
    {
        "id":  "vaf",
        "title":  "VETERANS ASSISTANCE ACTION FUND PAC",
        "file":  "vafqna.html"
    },
    {
        "id":  "vaa",
        "title":  "VETERANS ASSOCIATION OF AMERICA",
        "file":  "vaaqna.html"
    }
];

  const fallbackParameterNames = [
    "list_description",
    "list_desc",
    "listdescription",
    "campaign",
    "campaign_name"
  ];

  const campaignAliases = {
    acps: [
      "AMERICAN COALITION OF POLICE AND SHERIFFS PAC",
      "COALITION OF POLICE AND SHERIFFS PAC"
    ],
    afc: [
      "AMERICAN FIREFIGHTERS COALTION PAC"
    ],
    dare: [
      "DARE"
    ],
    mifpac: [
      "MICHIGAN FRATERNAL ORDER OF POLICE POLITICAL FUND"
    ],
    nfof: [
      "NATIONAL FALLEN OFFICERS FOUNDATION"
    ],
    nyamvets: [
      "NEW YORK AMVETS"
    ],
    posa: [
      "POLICE OFFICERS SUPPORT ALLIANCE PAC"
    ],
    txfof: [
      "TEXAS FALLEN OFFICERS FOUNDATION"
    ]
  };

  function normalize(value) {
    return String(value || "")
      .toUpperCase()
      .replace(/&AMP;/g, "AND")
      .replace(/&/g, "AND")
      .replace(/[^A-Z0-9]/g, "");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const campaignIndex = campaigns.map((campaign) => ({
    ...campaign,
    normalizedTitle: normalize(campaign.title),
    relaxedTitle: normalize(campaign.title.replace(/^THE\s+/i, "").replace(/\s+PAC$/i, "")),
    normalizedAliases: (campaignAliases[campaign.id] || []).map(normalize)
  }));

  function getListDescription() {
    const params = new URLSearchParams(window.location.search);
    for (const name of fallbackParameterNames) {
      const value = params.get(name);
      if (value) return value;
    }
    return "";
  }

  function findCampaign(listDescription) {
    const key = normalize(listDescription);
    if (!key) return null;

    const exact = campaignIndex.find((campaign) =>
      campaign.normalizedTitle === key ||
      campaign.relaxedTitle === key ||
      campaign.normalizedAliases.includes(key)
    );
    if (exact) return exact;

    return campaignIndex
      .filter((campaign) =>
        key.includes(campaign.normalizedTitle) ||
        campaign.normalizedTitle.includes(key) ||
        key.includes(campaign.relaxedTitle) ||
        campaign.relaxedTitle.includes(key)
      )
      .sort((a, b) => b.normalizedTitle.length - a.normalizedTitle.length)[0] || null;
  }

  function injectStyles() {
    if (document.getElementById("campaign-qna-loader-styles")) return;

    const style = document.createElement("style");
    style.id = "campaign-qna-loader-styles";
    style.textContent = [
      ".campaign-qna-box {",
      "  border: 2px solid #ccc;",
      "  border-radius: 6px;",
      "  padding: 15px;",
      "  margin: 20px 0;",
      "  background: #fff;",
      "  font-family: Arial, Helvetica, sans-serif;",
      "  line-height: 1.45;",
      "}",
      ".campaign-qna-box .campaign-qna-title {",
      "  font-weight: bold;",
      "  background-color: #e46868;",
      "  color: #fff;",
      "  padding: 6px 10px;",
      "  border-radius: 4px;",
      "  margin-bottom: 10px;",
      "}",
      ".campaign-qna-heading {",
      "  margin: 0 0 12px;",
      "  padding: 10px 12px;",
      "  background: #f2f5f7;",
      "  border: 1px solid #d6d6d6;",
      "  border-radius: 4px;",
      "}",
      ".campaign-qna-heading h3 {",
      "  margin: 0;",
      "  font-size: 18px;",
      "}",
      ".campaign-qna-heading p {",
      "  margin: 4px 0 0;",
      "  color: #555;",
      "  font-size: 12px;",
      "}",
      ".campaign-qna-content p {",
      "  margin: 10px 0;",
      "}",
      ".campaign-qna-status {",
      "  color: #555;",
      "  font-style: italic;",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function setStatus(target, message) {
    target.innerHTML = '<p class="campaign-qna-status">' + escapeHtml(message) + '</p>';
  }

  function setMasterQnaStatus(target, message) {
    target.innerHTML =
      '<p class="campaign-qna-status">' +
      escapeHtml(message) +
      ' <a href="all-camp-qna.html" target="_blank" rel="noopener">Open the master Q&amp;A</a>.' +
      '</p>';
  }

  async function loadCampaignQna() {
    const target = document.getElementById("campaign-qna-content");
    if (!target) return;

    injectStyles();

    const listDescription = getListDescription();
    const campaign = findCampaign(listDescription);

    if (!listDescription) {
      setMasterQnaStatus(target, "No list description was found in the URL, so no campaign Q&A was loaded.");
      return;
    }

    if (!campaign) {
      setMasterQnaStatus(target, "No matching campaign Q&A was found for: " + listDescription + ".");
      return;
    }

    try {
      const response = await fetch("qna/" + campaign.file, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      target.innerHTML = await response.text();
    } catch (error) {
      setMasterQnaStatus(target, "Unable to load Q&A for " + campaign.title + ".");
      console.error("Campaign Q&A load failed:", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCampaignQna);
  } else {
    loadCampaignQna();
  }
})();



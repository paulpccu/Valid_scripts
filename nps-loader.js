(function () {
  function firstValue(params, names) {
    for (const name of names) {
      const value = params.get(name);
      if (value && value.trim()) return value.trim();
    }
    return "";
  }

  function parseAmount(value) {
    const matches = String(value || "").match(/\d+(?:\.\d{1,2})?/g);
    if (!matches || matches.length === 0) return 0;
    return parseFloat(matches[0]) || 0;
  }

  function formatMoney(amount) {
    return "$" + amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }

  function standardUpsale(amount, donorName) {
    if (amount <= 0) return "";

    if (amount <= 25) {
      return "AND " + donorName + ", I see you are generously contributing our patron booster of " +
        formatMoney(amount) +
        ". This year we are asking residents who have the ability if they can comfortably add $5 to their pledge to help defray the cost of phone calls and mailings, bringing your total to " +
        formatMoney(amount + 5) +
        ". Can the association count on you for that pledge, just one time for the drive?";
    }

    if (amount <= 50) {
      return "AND " + donorName + ", I see you are generously contributing our patron-level booster of " +
        formatMoney(amount) +
        ". This year we are asking residents who have the ability if they can comfortably add $5 or $10 to their pledge to help defray the cost of calls and mailings, bringing your total to " +
        formatMoney(amount + 5) + " or " + formatMoney(amount + 10) +
        ". Can the association count on you for one of those pledges, just one time for the drive?";
    }

    if (amount <= 90) {
      return "AND " + donorName + ", I see you are generously contributing our booster of " +
        formatMoney(amount) +
        ". This year we are asking residents who have the ability if they can comfortably add $15 or $20 to their pledge to help defray the cost of calls and mailings, bringing your total to " +
        formatMoney(amount + 15) + " or " + formatMoney(amount + 20) +
        ". Can the association count on you for one of those pledges, just one time for the drive?";
    }

    if (amount < 150) {
      return "AND " + donorName + ", I see you are generously contributing our booster of " +
        formatMoney(amount) +
        ". Because the drive is falling short of its goal, we are asking the best supporters who have the ability to consider a special sponsorship: the $365 dollar-a-day booster, the $195 diamond, or the $145 platinum. Can you increase your pledge to one of those levels, just one time for the drive?";
    }

    return "AND " + donorName + ", thank you for generously contributing one of our top-level boosters of " +
      formatMoney(amount) +
      ". We are asking generous residents who have the ability to consider a special sponsorship: the $365 dollar-a-day booster or the $250 diamond. Can you increase your pledge to one of those levels, just one time for the drive?";
  }

  function heroLevels(originalPledge) {
    if (originalPledge <= 25) return [75, 50, 35];
    if (originalPledge <= 50) return [105, 95, 75];
    if (originalPledge <= 75) return [150, 125, 95];
    if (originalPledge <= 100) return [200, 150, 125];
    if (originalPledge <= 150) return [365, 250, 200];
    return [500, 365, 300];
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function show(id) {
    const element = document.getElementById(id);
    if (element) element.classList.remove("hidden");
  }

  function loadNpsScript() {
    const params = new URLSearchParams(window.location.search);
    const firstName = firstValue(params, ["first_name"]);
    const lastName = firstValue(params, ["last_name"]);
    const donorName = firstValue(params, ["name"]) ||
      [firstName, lastName].filter(Boolean).join(" ") ||
      "(donor name)";
    const listDescription = firstValue(params, [
      "list_description",
      "list_desc",
      "listdescription"
    ]) || "(organization name)";
    const currentAmount = parseAmount(firstValue(params, ["amount", "province"]));
    const comments = firstValue(params, ["comments"]);
    const originalPledge = parseAmount(comments);
    const address = [
      firstValue(params, ["address", "address1"]),
      firstValue(params, ["city"]),
      firstValue(params, ["state"]),
      firstValue(params, ["postal_code"])
    ].filter(Boolean).join(", ") || "(address on file)";
    const upsaleElement = document.getElementById("nps-upsale-text");

    setText("full-address", address);

    if (currentAmount > 0) {
      show("current-amount-flow");
      setText("current-donor-name", donorName);
      setText("current-list-description", listDescription);
      setText("current-amount", formatMoney(currentAmount));
      upsaleElement.textContent = standardUpsale(currentAmount, donorName);
      return;
    }

    show("original-pledge-flow");
    show("hero-authorization");
    setText("original-donor-name", donorName);
    setText("hero-list-description", listDescription);
    setText("original-list-description", listDescription);

    if (originalPledge > 0) {
      const levels = heroLevels(originalPledge);
      const formattedPledge = formatMoney(originalPledge);
      setText("original-pledge-amount", formattedPledge);
      setText("original-authorization-amount", formattedPledge);
      upsaleElement.textContent =
        "The suggested hero levels are " +
        formatMoney(levels[0]) + ", " +
        formatMoney(levels[1]) + ", or " +
        formatMoney(levels[2]) +
        ". What is best for you, one time for the drive?";
    } else {
      setText("original-pledge-amount", comments || "Not provided");
      setText("original-authorization-amount", comments || "(original pledge amount)");
      upsaleElement.textContent =
        "No numeric pledge amount was found in province or comments. Confirm the original pledge before presenting an upsale.";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNpsScript);
  } else {
    loadNpsScript();
  }
})();

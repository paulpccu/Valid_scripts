(function () {
  function getPledgeAmount(params) {
    const rawAmount = params.get("amount") || params.get("province") || "";
    const cleanedAmount = rawAmount.replace(/[^0-9.]/g, "");
    return parseFloat(cleanedAmount) || 0;
  }

  function formatDollarAmount(amount) {
    return "$" + amount.toLocaleString("en-US", {
      maximumFractionDigits: 0
    });
  }

  function getUpsaleText(amount, donorName) {
    if (amount <= 0) {
      return "";
    }

    if (amount <= 25) {
      return "AND " + donorName + " I see you are generously contributing our patron booster of " +
        formatDollarAmount(amount) +
        ". This year we are asking residents that have the ability if they can comfortably add $5 dollars to their pledge to defray the cost of phone calls and mailings. Bringing your total up to an even amount of " +
        formatDollarAmount(amount + 5) +
        ". Can the association count on you for one of those pledges. Just one time for the drive?";
    }

    if (amount <= 50) {
      return "AND " + donorName + " I see you are generously contributing our patron level booster of " +
        formatDollarAmount(amount) +
        ". This year we are asking residents that have the ability if they can comfortably add $5 or $10 dollars to their pledge to defray the cost of the calls and mailings. Bringing your total up to an even " +
        formatDollarAmount(amount + 5) +
        " or " +
        formatDollarAmount(amount + 10) +
        ". Can the association count on you for one of those pledges. Just one time for the drive?";
    }

    if (amount <= 90) {
      return "AND " + donorName + " I see you are generously contributing our booster of " +
        formatDollarAmount(amount) +
        ". This year we are asking residents that have the ability if they can comfortably add $15 or $20 dollars to their pledge to defray the cost of the calls and mailings. Bringing your total up to an even " +
        formatDollarAmount(amount + 15) +
        " or " +
        formatDollarAmount(amount + 20) +
        ". Can the association count on you for one of those pledges. Just one time for the drive?";
    }

    if (amount < 150) {
      return "AND " + donorName + " I see you are generously contributing our booster of " +
        formatDollarAmount(amount) +
        ". Unfortunately because we are falling short of the goal this year I'm asking all the best supporters, if they have the ability, to reach up and do one of the special sponsorships this year. There is a very popular dollar a day booster for $365 as well as the diamond at $195 or the platinum at $145. Can you be a hero for these/the (officers/veterans/firefighters/association) and increase your pledge to one of these. Just one time for the drive?";
    }

    return "And " + donorName + " I want to thank you for generously contributing one of our top level boosters of " +
      formatDollarAmount(amount) +
      ". We are asking generous residents such as yourself, if they have the ability to of course, to reach up and do one of the special sponsorships this year. There is a very popular dollar a day booster for $365 as well as the diamond at $250. Can you be a hero for these/the (officers/veterans/firefighters/association) and increase your pledge to one of these. Just one time for the drive?";
  }

  function loadUpsale() {
    const upsaleElement = document.getElementById("upsale-text");
    if (!upsaleElement) return;

    const params = new URLSearchParams(window.location.search);
    const amount = getPledgeAmount(params);
    const donorName = params.get("name") || "(#name)";
    const upsaleText = getUpsaleText(amount, donorName);

    upsaleElement.textContent = upsaleText || "No pledge amount was found for the upsale script.";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadUpsale);
  } else {
    loadUpsale();
  }
})();

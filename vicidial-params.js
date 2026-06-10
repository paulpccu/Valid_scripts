(function () {
  function firstValue(params, names) {
    for (const name of names) {
      const value = params.get(name);
      if (value && value.trim()) return value.trim();
    }
    return "";
  }

  function replaceTextPlaceholders(replacements) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
    const textNodes = [];

    while (walker.nextNode()) {
      const parentTag = walker.currentNode.parentElement
        ? walker.currentNode.parentElement.tagName
        : "";

      if (parentTag !== "SCRIPT" && parentTag !== "STYLE") {
        textNodes.push(walker.currentNode);
      }
    }

    for (const node of textNodes) {
      let text = node.nodeValue;

      for (const replacement of replacements) {
        if (replacement.value) {
          text = text.replace(replacement.pattern, replacement.value);
        }
      }

      node.nodeValue = text;
    }
  }

  function loadVicidialParameters() {
    const params = new URLSearchParams(window.location.search);
    const firstName = firstValue(params, ["first_name"]);
    const lastName = firstValue(params, ["last_name"]);
    const fullName = firstValue(params, ["name"]) ||
      [firstName, lastName].filter(Boolean).join(" ");
    const listDescription = firstValue(params, [
      "list_description",
      "list_desc",
      "listdescription"
    ]);
    const pledgeAmount = firstValue(params, ["amount", "province"]);
    const address = firstValue(params, ["address", "address1"]);

    replaceTextPlaceholders([
      {
        pattern: /\(\s*#?(?:list_description|list_desc|listdescription)\s*\)|\(\s*LISTDESCRIPTION\s*\)|#(?:list_description|list_desc|listdescription)\b|\bLISTDESCRIPTION\b/gi,
        value: listDescription
      },
      {
        pattern: /\(\s*#name\s*\)/gi,
        value: fullName
      },
      {
        pattern: /\(\s*#(?:amount|province)\s*\)/gi,
        value: pledgeAmount
      },
      {
        pattern: /\(\s*#address\s*\)/gi,
        value: address
      }
    ]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadVicidialParameters);
  } else {
    loadVicidialParameters();
  }
})();

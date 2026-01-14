"use strict";
const results = document.getElementById("results");
const clusterButton = document.getElementById("clusterButton");
function renderClusters(clusters) {
    results.innerHTML = "";
    if (!clusters.length) {
        results.innerHTML = "<p>No clusters yet.</p>";
        return;
    }
    clusters.forEach((cluster, idx) => {
        const card = document.createElement("div");
        card.className = "cluster";
        card.innerHTML = `<strong>Cluster ${idx + 1}</strong><ul>${cluster
            .map((doc) => `<li>${doc}</li>`)
            .join("")}</ul>`;
        results.appendChild(card);
    });
}
clusterButton.addEventListener("click", () => {
    const docs = document.getElementById("docsInput").value;
    const k = parseInt(document.getElementById("kInput").value, 10);
    fetch("/api/cluster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docs, k }),
    })
        .then((res) => res.json())
        .then((data) => renderClusters(data.clusters || []));
});

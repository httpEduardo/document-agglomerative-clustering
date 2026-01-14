const results = document.getElementById("results") as HTMLDivElement;
const clusterButton = document.getElementById("clusterButton") as HTMLButtonElement;

function renderClusters(clusters: string[][]): void {
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
  const docs = (document.getElementById("docsInput") as HTMLTextAreaElement).value;
  const k = parseInt((document.getElementById("kInput") as HTMLInputElement).value, 10);
  fetch("/api/cluster", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ docs, k }),
  })
    .then((res) => res.json())
    .then((data) => renderClusters(data.clusters || []));
});

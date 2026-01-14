# ClusterBraid

ClusterBraid groups documents with agglomerative clustering and TF-IDF cosine similarity.

## Quick start

```bash
python -m app.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/cluster` `{ "docs": ["..."], "k": 3 }`


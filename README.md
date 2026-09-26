# Document Agglomerative Clustering

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)

Document Agglomerative Clustering groups documents with agglomerative clustering and TF-IDF cosine similarity.

## Quick start

```bash
python -m document_agglomerative_clustering.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/cluster` `{ "docs": ["..."], "k": 3 }`


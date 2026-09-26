import math
import re
from collections import Counter

TOKEN_RE = re.compile(r"[a-z0-9]+")


def tokenize(text):
    return TOKEN_RE.findall(text.lower())


def build_vectors(docs):
    doc_tokens = [tokenize(doc) for doc in docs]
    doc_freq = Counter()
    for tokens in doc_tokens:
        doc_freq.update(set(tokens))
    total_docs = len(docs) or 1
    idf = {term: math.log((1 + total_docs) / (1 + freq)) + 1 for term, freq in doc_freq.items()}

    vectors = []
    for tokens in doc_tokens:
        tf = Counter(tokens)
        vec = {term: (tf[term] / len(tokens)) * idf.get(term, 0.0) for term in tf}
        vectors.append(vec)
    return vectors


def cosine(vec_a, vec_b):
    dot = 0.0
    norm_a = 0.0
    norm_b = 0.0
    for term, value in vec_a.items():
        dot += value * vec_b.get(term, 0.0)
        norm_a += value * value
    for value in vec_b.values():
        norm_b += value * value
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (math.sqrt(norm_a) * math.sqrt(norm_b))


def agglomerative(docs, k=3):
    vectors = build_vectors(docs)
    clusters = [[i] for i in range(len(docs))]

    def cluster_similarity(a, b):
        return max(cosine(vectors[i], vectors[j]) for i in a for j in b)

    while len(clusters) > k:
        best_i = 0
        best_j = 1
        best_score = -1
        for i in range(len(clusters)):
            for j in range(i + 1, len(clusters)):
                score = cluster_similarity(clusters[i], clusters[j])
                if score > best_score:
                    best_score = score
                    best_i, best_j = i, j
        merged = clusters[best_i] + clusters[best_j]
        clusters = [c for idx, c in enumerate(clusters) if idx not in (best_i, best_j)]
        clusters.append(merged)
    return clusters

from prometheus_client import Counter, make_asgi_app

# Counters for preference extraction and saving
PREFERENCES_EXTRACTED = Counter(
    "preferences_extracted_total", "Number of preferences extracted from voice"
)
PREFERENCE_SAVED = Counter("preference_saved_total", "Number of preferences successfully saved")
PREFERENCE_SAVE_FAILURES = Counter(
    "preference_save_failures_total", "Number of preference save failures"
)

# Counters for recommendation service
RECOMMENDATION_REQUESTS = Counter("recommendation_requests_total", "Recommendation requests received")
RECOMMENDATION_ERRORS = Counter("recommendation_errors_total", "Recommendation errors")


def metrics_app():
    """Return an ASGI app that serves Prometheus metrics at /metrics when mounted."""
    return make_asgi_app()

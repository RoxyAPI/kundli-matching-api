"""
Kundli matching API example (Python SDK)
Calculates Guna Milan (Ashtakoota) compatibility score for two birth charts.
Endpoint: POST /vedic-astrology/compatibility (calculateGunMilan)
Docs: https://roxyapi.com/api-reference
"""

import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])

# Calculate kundli matching score between two people (nakshatra-based Ashtakoota guna milan)
result = roxy.vedic_astrology.calculate_gun_milan(
    person1={
        "date": "1990-07-04",
        "time": "10:12:00",
        "latitude": 28.6139,
        "longitude": 77.209,
        "timezone": 5.5,
    },
    person2={
        "date": "1992-03-15",
        "time": "08:30:00",
        "latitude": 19.076,
        "longitude": 72.8777,
        "timezone": 5.5,
    },
)

print(f"Guna Milan Score: {result['total']}/{result['maxScore']} ({result['percentage']:.1f}%)")
print(f"Compatible: {result['isCompatible']}")
print(f"Recommendation: {result['recommendation']}")

if result["doshas"]:
    print(f"Active Doshas: {', '.join(result['doshas'])}")

if result["doshaCancellations"]:
    print("Cancelled Doshas:")
    for c in result["doshaCancellations"]:
        print(f"  {c['dosha']}: {c['reason']}")

print("\nBreakdown:")
for koota in result["breakdown"]:
    print(f"  {koota['category']}: {koota['score']}/{koota['maxScore']} - {koota['description']}")

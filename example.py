"""
Kundli matching API example (Python SDK)
Calculates Guna Milan (Ashtakoota) compatibility score for two birth charts.
Endpoint: POST /vedic-astrology/compatibility (calculateGunMilan)
Docs: https://roxyapi.com/api-reference
"""

import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])

# Step 1: geocode each birth city - never hardcode coordinates
loc1 = roxy.location.search_cities(q="New Delhi")
p1 = loc1["cities"][0]  # { latitude, longitude, timezone, ... }

loc2 = roxy.location.search_cities(q="Mumbai")
p2 = loc2["cities"][0]

# Step 2: 36-point Guna Milan compatibility
result = roxy.vedic_astrology.calculate_gun_milan(
    person1={
        "date": "1990-07-04",
        "time": "10:12:00",
        "latitude": p1["latitude"],
        "longitude": p1["longitude"],
        "timezone": p1["timezone"],
    },
    person2={
        "date": "1992-03-15",
        "time": "08:30:00",
        "latitude": p2["latitude"],
        "longitude": p2["longitude"],
        "timezone": p2["timezone"],
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

[![Kundli Matching API](banner.png)](https://roxyapi.com/products/vedic-astrology-api)

# Kundli Matching API

> 36-point Ashtakoota Guna Milan with 8 sub-scores plus dosha cancellation. The matrimonial app spec, ready to ship.

[![Get API Key](https://img.shields.io/badge/Get_API_Key-RoxyAPI-14b8a6?style=for-the-badge&logo=key&logoColor=white)](https://roxyapi.com/pricing)
[![Try Live](https://img.shields.io/badge/Try_API_Live-Free_in_browser-22c55e?style=for-the-badge&logo=swagger&logoColor=white)](https://roxyapi.com/api-reference)
[![Methodology](https://img.shields.io/badge/Methodology-NASA_JPL_verified-f59e0b?style=for-the-badge&logo=nasa&logoColor=white)](https://roxyapi.com/methodology)
[![MCP Server](https://img.shields.io/badge/MCP_Server-Streamable_HTTP-8b5cf6?style=for-the-badge&logo=anthropic&logoColor=white)](https://roxyapi.com/docs/mcp)
[![SDK](https://img.shields.io/badge/SDK-TypeScript_+_Python_+_PHP_+_C%23_+_Go_+_WordPress-3b82f6?style=for-the-badge&logo=npm&logoColor=white)](https://roxyapi.com/docs/sdk)

## What is Kundli Matching API

Kundli matching API powered by Roxy Ephemeris, verified against NASA JPL Horizons. Returns the full 36-point Guna Milan (Ashtakoota) score with per-koota breakdowns across all 8 categories: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi. Includes Nadi and Bhakoot dosha detection with classical cancellation analysis per Muhurta Martanda and BPHS rules. Built for kundli matching for marriage, matrimonial platforms, horoscope compatibility, and Vedic matchmaking services. One RoxyAPI subscription unlocks 258+ endpoints across 18+ spiritual domains.

## Why this API

| Property | Value |
|----------|-------|
| Coverage | 18+ spiritual domains in one subscription |
| Calculation | Roxy Ephemeris, verified against NASA JPL Horizons |
| MCP server | `https://roxyapi.com/mcp/vedic-astrology` (Streamable HTTP, no local setup) |
| SDKs | TypeScript on npm `@roxyapi/sdk`, Python on PyPI `roxy-sdk`, PHP on Packagist `roxyapi/sdk`, C# on NuGet `RoxyApi.Sdk`, Go `github.com/RoxyAPI/sdk-go`, WordPress plugin `roxyapi` |
| Pricing | One key, flat per call, from $39/mo |
| Licensing | Personal and commercial use, including closed source apps. No AGPL or GPL entanglement. [Full terms](https://roxyapi.com/policy/license) |
| Last verified | 2026-Q3 |

## Quick start

1. Get a key at [roxyapi.com/pricing](https://roxyapi.com/pricing)
2. Pick a language below
3. Copy the snippet, run, ship

### cURL

```bash
# Step 1: geocode person 1 birth city
curl "https://roxyapi.com/api/v2/location/search?q=New+Delhi" \
  -H "X-API-Key: $ROXY_API_KEY"

# Step 1b: geocode person 2 birth city
curl "https://roxyapi.com/api/v2/location/search?q=Mumbai" \
  -H "X-API-Key: $ROXY_API_KEY"

# Step 2: 36-point Guna Milan compatibility (use coordinates from step 1 responses)
curl -X POST https://roxyapi.com/api/v2/vedic-astrology/compatibility \
  -H "X-API-Key: $ROXY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "person1": {"date":"1990-07-04","time":"10:12:00","latitude":28.6448,"longitude":77.2167,"timezone":"Asia/Kolkata"},
    "person2": {"date":"1992-03-15","time":"08:30:00","latitude":19.0728,"longitude":72.8826,"timezone":"Asia/Kolkata"}
  }'
```

### Python

```python
import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])

# Step 1: geocode each birth city - never hardcode coordinates
loc1 = roxy.location.search_cities(q="New Delhi")
p1 = loc1["cities"][0]

loc2 = roxy.location.search_cities(q="Mumbai")
p2 = loc2["cities"][0]

# Step 2: 36-point Guna Milan compatibility
result = roxy.vedic_astrology.calculate_gun_milan(
    person1={"date": "1990-07-04", "time": "10:12:00", "latitude": p1["latitude"], "longitude": p1["longitude"], "timezone": p1["timezone"]},
    person2={"date": "1992-03-15", "time": "08:30:00", "latitude": p2["latitude"], "longitude": p2["longitude"], "timezone": p2["timezone"]},
)
print(f"Total: {result['total']}/36 ({result['percentage']:.1f}%) - {result['recommendation']}")
for koota in result["breakdown"]:
    print(f"  {koota['category']}: {koota['score']}/{koota['maxScore']}")
```

### JavaScript (Node)

```js
import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY);

// Step 1: geocode each birth city - never hardcode coordinates
const { data: loc1 } = await roxy.location.searchCities({ query: { q: 'New Delhi' } });
const p1 = loc1.cities[0];

const { data: loc2 } = await roxy.location.searchCities({ query: { q: 'Mumbai' } });
const p2 = loc2.cities[0];

// Step 2: 36-point Guna Milan compatibility
const { data, error } = await roxy.vedicAstrology.calculateGunMilan({
  body: {
    person1: { date: '1990-07-04', time: '10:12:00', latitude: p1.latitude, longitude: p1.longitude, timezone: p1.timezone },
    person2: { date: '1992-03-15', time: '08:30:00', latitude: p2.latitude, longitude: p2.longitude, timezone: p2.timezone },
  },
});
if (error) throw new Error(error.error);
console.log(`Total: ${data.total}/36 (${data.percentage.toFixed(1)}%) - ${data.recommendation}`);
data.breakdown.forEach(k => console.log(`  ${k.category}: ${k.score}/${k.maxScore}`));
```

### TypeScript

```ts
import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

// Step 1: geocode each birth city - never hardcode coordinates
const { data: loc1 } = await roxy.location.searchCities({ query: { q: 'New Delhi' } });
const p1 = loc1.cities[0];

const { data: loc2 } = await roxy.location.searchCities({ query: { q: 'Mumbai' } });
const p2 = loc2.cities[0];

// Step 2: 36-point Guna Milan compatibility
const { data, error } = await roxy.vedicAstrology.calculateGunMilan({
  body: {
    person1: { date: '1990-07-04', time: '10:12:00', latitude: p1.latitude, longitude: p1.longitude, timezone: p1.timezone },
    person2: { date: '1992-03-15', time: '08:30:00', latitude: p2.latitude, longitude: p2.longitude, timezone: p2.timezone },
  },
});
if (error) throw new Error(error.error);
console.log(`Total: ${data.total}/36 (${data.percentage.toFixed(1)}%) - ${data.recommendation}`);
data.breakdown.forEach(k => console.log(`  ${k.category}: ${k.score}/${k.maxScore}`));
```

## Request schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `person1` | object | Yes | Birth data of the first person (typically the boy/groom in traditional Ashtakoota matching). Date, time, and location determine Moon nakshatra for koota scoring. |
| `person1.date` | string (YYYY-MM-DD) | Yes | Birth date. Determines planetary positions and nakshatra for Vedic kundli. |
| `person1.time` | string (HH:MM:SS) | Yes | Birth time in 24-hour format. Critical for nakshatra pada accuracy. |
| `person1.latitude` | number | Yes | Birth location latitude in decimal degrees (-90 to 90). Example: Delhi 28.6139. |
| `person1.longitude` | number | Yes | Birth location longitude in decimal degrees (-180 to 180). Example: Delhi 77.2090. |
| `person1.timezone` | number or string | No | Decimal UTC offset (e.g. 5.5 for IST) or IANA name (e.g. "Asia/Kolkata"). Defaults to 5.5. |
| `person2` | object | Yes | Birth data of the second person (typically the girl/bride in traditional Ashtakoota matching). Moon nakshatra compared against person 1 across all 8 kootas. |
| `person2.date` | string (YYYY-MM-DD) | Yes | Birth date. Same rules as person1. |
| `person2.time` | string (HH:MM:SS) | Yes | Birth time. Same rules as person1. |
| `person2.latitude` | number | Yes | Latitude. Same rules as person1. |
| `person2.longitude` | number | Yes | Longitude. Same rules as person1. |
| `person2.timezone` | number or string | No | Timezone. Same rules as person1. Defaults to 5.5. |
| `lang` | string (query) | No | Response language ISO 639-1. Supported: en, tr, de, es, hi, pt, fr, ru. Defaults to en. |

## Response shape

```json
{
  "total": 17,
  "maxScore": 36,
  "percentage": 47.22,
  "isCompatible": false,
  "recommendation": "Union is NOT recommended due to Nadi Dosha and Bhakoot Dosha",
  "doshas": ["Nadi Dosha", "Bhakoot Dosha"],
  "doshaCancellations": [],
  "breakdown": [
    { "category": "Varna", "score": 1, "maxScore": 1, "person1": "Brahmin", "person2": "Brahmin", "description": "Spiritual compatibility and mutual respect" },
    { "category": "Vashya", "score": 1, "maxScore": 2, "person1": "Keeta", "person2": "Jalchar", "description": "Mutual control and dominance" },
    { "category": "Tara", "score": 3, "maxScore": 3, "person1": "Mitra", "person2": "Mitra", "description": "Birth star compatibility and luck" },
    { "category": "Yoni", "score": 2, "maxScore": 4, "person1": "Hare", "person2": "Sheep", "description": "Sexual and physical compatibility" },
    { "category": "Graha Maitri", "score": 4, "maxScore": 5, "person1": "Mars", "person2": "Moon", "description": "Mental compatibility and affection" },
    { "category": "Gana", "score": 6, "maxScore": 6, "person1": "Deva", "person2": "Deva", "description": "Temperament and nature compatibility" },
    { "category": "Bhakoot", "score": 0, "maxScore": 7, "person1": "Aries", "person2": "Pisces", "description": "Financial and emotional compatibility" },
    { "category": "Nadi", "score": 0, "maxScore": 8, "person1": "Aadi", "person2": "Aadi", "description": "Health and genetic compatibility" }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `total` | number | Total Ashtakoot Gun Milan score out of 36. Scores above 18 are considered compatible for marriage. |
| `maxScore` | number | Maximum possible Guna Milan score (always 36). |
| `percentage` | number | Compatibility percentage derived from total/maxScore. Above 50% (18/36) is the traditional minimum threshold. |
| `isCompatible` | boolean | True when percentage >= 50% (18/36 minimum). Based on the traditional Ashtakoot Gun Milan threshold. |
| `recommendation` | string | Human-readable marriage recommendation based on overall score and dosha analysis. |
| `doshas` | string[] | Active (uncancelled) doshas. Common: Nadi Dosha (same Nadi type, 0/8 points), Bhakoot Dosha (inauspicious Moon sign distance, 0/7 points). |
| `doshaCancellations` | object[] | Doshas detected but cancelled by classical exception rules per Muhurta Martanda and BPHS. |
| `doshaCancellations[].dosha` | string | Name of the cancelled dosha (Nadi Dosha or Bhakoot Dosha). |
| `doshaCancellations[].reason` | string | Classical cancellation condition that neutralizes this dosha. |
| `breakdown` | object[] | Detailed breakdown across all 8 Ashtakoot kootas. |
| `breakdown[].category` | string | One of 8 categories: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi. |
| `breakdown[].score` | number | Points scored. Maximums: Varna (1), Vashya (2), Tara (3), Yoni (4), Graha Maitri (5), Gana (6), Bhakoot (7), Nadi (8). |
| `breakdown[].maxScore` | number | Maximum possible points for this koota category. |
| `breakdown[].person1` | string | Classification of person 1 for this koota (e.g. Vaishya for Varna, Hare for Yoni). |
| `breakdown[].person2` | string | Classification of person 2 for this koota. |
| `breakdown[].description` | string | Human-readable explanation of what this koota evaluates. |

## Common use cases

| Use case | Endpoint flow |
|----------|---------------|
| Matrimonial platform match score | POST `/vedic-astrology/compatibility` with both birth details. Show total/36 plus per-koota breakdown and dosha status. |
| Horoscope compatibility widget | Call the endpoint, display `isCompatible` flag and `recommendation` string. Surface dosha cancellations for premium UX. |
| Kundli matching for marriage counseling | Run compatibility check, then pull individual birth charts via POST `/vedic-astrology/birth-chart` for deeper dasha analysis. |
| AI agent matrimonial assistant | Connect via the Vedic Astrology Remote MCP server. Pass both birth datasets, receive structured Guna Milan JSON in one tool call. |
| Vedic matchmaking service API backend | Use `lang` query param to return localized results (hi, en, de, es). One call returns all 8 kootas plus dosha analysis. |

## Related endpoints in this domain

- `POST /vedic-astrology/birth-chart` (generateBirthChart): Full D1 Kundli with nakshatra, lagna, planetary positions
- `POST /vedic-astrology/dasha/current` (getCurrentDasha): Vimshottari Dasha timeline for marital timing analysis
- `POST /vedic-astrology/panchang/detailed` (getDetailedPanchang): Muhurta selection for auspicious wedding dates

## Use this in your AI agent

Connect Claude, GPT, Gemini, or Cursor to RoxyAPI through the remote MCP server. No Docker. No self hosting. The full MCP tool catalog for this domain is at `https://roxyapi.com/mcp/vedic-astrology`.

```json
{
  "mcpServers": {
    "vedic-astrology": {
      "url": "https://roxyapi.com/mcp/vedic-astrology",
      "headers": { "X-API-Key": "$ROXY_API_KEY" }
    }
  }
}
```

See [docs/mcp](https://roxyapi.com/docs/mcp) for Claude Desktop, Cursor, Windsurf, VS Code, and Claude Code setup.

## For AI coding agents

This repo ships an [AGENTS.md](AGENTS.md) execution playbook. Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, and Gemini CLI will pick it up automatically. Top level overview lives at [roxyapi.com/AGENTS.md](https://roxyapi.com/AGENTS.md).

## Resources

- [Methodology and gold standard tests](https://roxyapi.com/methodology) verified against NASA JPL Horizons
- [Full API reference](https://roxyapi.com/api-reference) interactive Scalar UI
- [TypeScript SDK on npm](https://www.npmjs.com/package/@roxyapi/sdk)
- [Python SDK on PyPI](https://pypi.org/project/roxy-sdk/)
- [PHP SDK on Packagist](https://packagist.org/packages/roxyapi/sdk)
- [C# SDK on NuGet](https://www.nuget.org/packages/RoxyApi.Sdk)
- [Go SDK on pkg.go.dev](https://pkg.go.dev/github.com/RoxyAPI/sdk-go)
- [WordPress plugin](https://wordpress.org/plugins/roxyapi/)
- [llms.txt](https://roxyapi.com/llms.txt) full LLM citation index
- [Top level AGENTS.md](https://roxyapi.com/AGENTS.md)

## Other RoxyAPI samples

[![kp-astrology-api](https://img.shields.io/badge/KP_Astrology_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/kp-astrology-api)
[![kundli-api](https://img.shields.io/badge/Kundli_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/kundli-api)
[![synastry-api](https://img.shields.io/badge/Synastry_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/synastry-api)
[![panchang-api](https://img.shields.io/badge/Panchang_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/panchang-api)
[![biorhythm-api](https://img.shields.io/badge/Biorhythm_API-RoxyAPI-14b8a6?style=flat-square)](https://github.com/RoxyAPI/biorhythm-api)

## License

MIT for this sample repo. See [LICENSE](LICENSE).

**Catalog licensing:** Personal and commercial use, including closed source proprietary apps. No AGPL or GPL entanglement. RoxyAPI APIs and SDKs are safe to embed in commercial products. Full terms at [roxyapi.com/policy/license](https://roxyapi.com/policy/license).

## Contact

- Site: [roxyapi.com](https://roxyapi.com)
- Status: [roxyapi.com/api-reference](https://roxyapi.com/api-reference)

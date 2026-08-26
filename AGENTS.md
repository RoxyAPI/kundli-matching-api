# AGENTS.md for Kundli Matching API

This repo teaches AI coding agents (Cursor, Claude Code, Aider, Codex, Windsurf, RooCode, Gemini CLI) how to use the RoxyAPI Guna Milan (Ashtakoota kundli matching) endpoint.

## Endpoint

- Method: `POST`
- URL: `https://roxyapi.com/api/v2/vedic-astrology/compatibility`
- Auth: `X-API-Key` header
- Domain: `vedic-astrology` (one of 14+ in the RoxyAPI catalog)
- Operation ID: `calculateGunMilan` matches the SDK method name in camelCase
- MCP tool: `post_vedic_astrology_compatibility` on `https://roxyapi.com/mcp/vedic-astrology`

## TypeScript SDK

```ts
import { createRoxy } from '@roxyapi/sdk';
const roxy = createRoxy(process.env.ROXY_API_KEY!);
const { data, error } = await roxy.vedicAstrology.calculateGunMilan({
  body: {
    person1: { date: '1990-07-04', time: '10:12:00', latitude: 28.6139, longitude: 77.209, timezone: 5.5 },
    person2: { date: '1992-03-15', time: '08:30:00', latitude: 19.076, longitude: 72.8777, timezone: 5.5 },
  },
});
```

## Python SDK

```python
import os
from roxy_sdk import create_roxy
roxy = create_roxy(os.environ["ROXY_API_KEY"])
result = roxy.vedic_astrology.calculate_gun_milan(
    person1={"date": "1990-07-04", "time": "10:12:00", "latitude": 28.6139, "longitude": 77.209, "timezone": 5.5},
    person2={"date": "1992-03-15", "time": "08:30:00", "latitude": 19.076, "longitude": 72.8777, "timezone": 5.5},
)
```

## Setup step (location lookup)

When you have a city name but not coordinates, call `GET /location/search?q={city}` first. Take `latitude`, `longitude`, `timezone` from `cities[0]` and pipe them into `person1` or `person2`. Never ask the user to type coordinates.

## Request fields

- `person1` (object, required): Birth data of the first person. Date, time, and location determine Moon nakshatra for koota scoring.
  - `date` (string YYYY-MM-DD, required): Birth date.
  - `time` (string HH:MM:SS, required): Birth time in 24-hour format.
  - `latitude` (number, required): Decimal degrees, -90 to 90.
  - `longitude` (number, required): Decimal degrees, -180 to 180.
  - `timezone` (number or string, optional): Decimal UTC offset or IANA name. Defaults to 5.5 (IST).
- `person2` (object, required): Birth data of the second person. Same field rules as person1.
- `lang` (string, query, optional): ISO 639-1 language code. Supported: en, tr, de, es, hi, pt, fr, ru.

## Response top level keys

- `total` (number): Guna Milan score out of 36. Above 18 = compatible threshold.
- `maxScore` (number): Always 36.
- `percentage` (number): total/maxScore as percentage.
- `isCompatible` (boolean): True when percentage >= 50%.
- `recommendation` (string): Human-readable marriage recommendation.
- `doshas` (string[]): Active uncancelled doshas. Common: Nadi Dosha, Bhakoot Dosha.
- `doshaCancellations` (object[]): Doshas detected but cancelled by classical rules (Muhurta Martanda, BPHS).
- `breakdown` (object[]): Per-koota scores for all 8 categories.

## Breakdown categories

| Category | Max points | What it measures |
|----------|-----------|-----------------|
| Varna | 1 | Spiritual compatibility and mutual respect |
| Vashya | 2 | Mutual control and dominance |
| Tara | 3 | Birth star compatibility and luck |
| Yoni | 4 | Sexual and physical compatibility |
| Graha Maitri | 5 | Mental compatibility and affection |
| Gana | 6 | Temperament and nature compatibility |
| Bhakoot | 7 | Financial and emotional compatibility |
| Nadi | 8 | Health and genetic compatibility |

## Domain rules

- The endpoint calculates Moon nakshatra from exact birth time and place using Roxy Ephemeris, verified against NASA JPL Horizons. Accurate time input is essential.
- Nadi Dosha cancels when partners share the same Moon sign with different nakshatras, same nakshatra with different padas, or same nakshatra spanning different signs.
- Bhakoot Dosha cancels when Moon sign lords are the same planet or mutual natural friends.
- A dosha in `doshaCancellations` does NOT count against the recommendation even though its koota score is 0.
- The 18/36 threshold (50%) is the classical minimum. Many practitioners require 24+ for a strong match.
- Use the `lang` query param to serve localized results. Pass `lang=hi` for Hindi output.

## Related endpoints

- `POST /vedic-astrology/birth-chart` (generateBirthChart): Full D1 Kundli for individual chart analysis.
- `POST /vedic-astrology/dasha/current` (getCurrentDasha): Vimshottari Dasha for marriage timing.
- `POST /vedic-astrology/panchang/detailed` (getDetailedPanchang): Muhurta for auspicious wedding date selection.

## Verified

2026-Q2 against `https://roxyapi.com/api/v2/openapi.json`. Re-fetch the spec for ground truth before changing this file.

## Discovery

- Full catalog: https://roxyapi.com/AGENTS.md
- LLM index: https://roxyapi.com/llms.txt
- Methodology: https://roxyapi.com/methodology

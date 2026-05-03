/**
 * Kundli matching API example (TypeScript SDK)
 * Calculates Guna Milan (Ashtakoota) compatibility score for two birth charts.
 * Endpoint: POST /vedic-astrology/compatibility (calculateGunMilan)
 * Docs: https://roxyapi.com/api-reference
 */

import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

async function main() {
  // Step 1: geocode each birth city - never hardcode coordinates
  const { data: loc1, error: locErr1 } = await roxy.location.searchCities({ query: { q: 'New Delhi' } });
  if (locErr1) throw new Error(locErr1.error);
  const p1 = loc1.cities[0]; // { latitude, longitude, timezone }

  const { data: loc2, error: locErr2 } = await roxy.location.searchCities({ query: { q: 'Mumbai' } });
  if (locErr2) throw new Error(locErr2.error);
  const p2 = loc2.cities[0];

  // Step 2: 36-point Guna Milan compatibility
  const { data, error } = await roxy.vedicAstrology.calculateGunMilan({
    body: {
      person1: {
        date: '1990-07-04',
        time: '10:12:00',
        latitude: p1.latitude,
        longitude: p1.longitude,
        timezone: p1.timezone,
      },
      person2: {
        date: '1992-03-15',
        time: '08:30:00',
        latitude: p2.latitude,
        longitude: p2.longitude,
        timezone: p2.timezone,
      },
    },
  });

  if (error) {
    console.error('API error:', error.error);
    process.exit(1);
  }

  console.log(`Guna Milan Score: ${data.total}/${data.maxScore} (${data.percentage.toFixed(1)}%)`);
  console.log(`Compatible: ${data.isCompatible}`);
  console.log(`Recommendation: ${data.recommendation}`);

  if (data.doshas.length > 0) {
    console.log(`Active Doshas: ${data.doshas.join(', ')}`);
  }

  if (data.doshaCancellations.length > 0) {
    console.log('Cancelled Doshas:');
    for (const c of data.doshaCancellations) {
      console.log(`  ${c.dosha}: ${c.reason}`);
    }
  }

  console.log('\nBreakdown:');
  for (const koota of data.breakdown) {
    console.log(`  ${koota.category}: ${koota.score}/${koota.maxScore} - ${koota.description}`);
  }
}

main().catch(console.error);

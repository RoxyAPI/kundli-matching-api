/**
 * Kundli matching API example (TypeScript SDK)
 * Calculates Guna Milan (Ashtakoota) compatibility score for two birth charts.
 * Endpoint: POST /vedic-astrology/compatibility (calculateGunMilan)
 * Docs: https://roxyapi.com/api-reference
 */

import { createRoxy } from '@roxyapi/sdk';

const roxy = createRoxy(process.env.ROXY_API_KEY!);

const { data, error } = await roxy.vedicAstrology.calculateGunMilan({
  body: {
    person1: {
      date: '1990-07-04',
      time: '10:12:00',
      latitude: 28.6139,
      longitude: 77.209,
      timezone: 5.5,
    },
    person2: {
      date: '1992-03-15',
      time: '08:30:00',
      latitude: 19.076,
      longitude: 72.8777,
      timezone: 5.5,
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

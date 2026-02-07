// Script to calculate total PSEO pages
// Run with: npx ts-node scripts/calculate-pages.ts

import { allLocations } from '../src/data/singapore-locations';
import { renovationServices, propertyTypes, designStyles, materials } from '../src/data/renovation-services';

const locationCount = allLocations.length;
const serviceCount = renovationServices.length;
const propertyTypeCount = propertyTypes.length;
const styleCount = designStyles.length;
const materialCount = materials.length;

const keyServiceCount = 8; // Key services for property type combo
const styleServiceCount = 11; // Services compatible with styles

console.log('\n=== PSEO PAGE COUNT CALCULATION ===\n');

console.log('Data Summary:');
console.log(`  - Locations: ${locationCount}`);
console.log(`  - Services: ${serviceCount}`);
console.log(`  - Property Types: ${propertyTypeCount}`);
console.log(`  - Design Styles: ${styleCount}`);
console.log(`  - Materials: ${materialCount}`);

console.log('\n--- Page Calculations ---\n');

const pattern1 = serviceCount * locationCount;
console.log(`Pattern 1: Service + Location`);
console.log(`  ${serviceCount} services × ${locationCount} locations = ${pattern1.toLocaleString()} pages`);

const pattern2 = propertyTypeCount * keyServiceCount * locationCount;
console.log(`\nPattern 2: Property Type + Service + Location`);
console.log(`  ${propertyTypeCount} property types × ${keyServiceCount} key services × ${locationCount} locations = ${pattern2.toLocaleString()} pages`);

const pattern3 = styleCount * styleServiceCount * locationCount;
console.log(`\nPattern 3: Style + Service + Location`);
console.log(`  ${styleCount} styles × ${styleServiceCount} services × ${locationCount} locations = ${pattern3.toLocaleString()} pages`);

const pattern4 = materialCount * locationCount;
console.log(`\nPattern 4: Material + Location`);
console.log(`  ${materialCount} materials × ${locationCount} locations = ${pattern4.toLocaleString()} pages`);

const total = pattern1 + pattern2 + pattern3 + pattern4;
console.log('\n=================================');
console.log(`TOTAL PSEO PAGES: ${total.toLocaleString()}`);
console.log('=================================\n');

// Region breakdown
console.log('Pages by Region:');
const regions = ['Central', 'East', 'North', 'North-East', 'West'];
for (const region of regions) {
    const regionLocCount = allLocations.filter(l => l.region === region).length;
    const regionTotal =
        (serviceCount * regionLocCount) +
        (propertyTypeCount * keyServiceCount * regionLocCount) +
        (styleCount * styleServiceCount * regionLocCount) +
        (materialCount * regionLocCount);
    console.log(`  ${region}: ${regionLocCount} locations = ${regionTotal.toLocaleString()} pages`);
}

console.log('\n✅ All pages will be statically generated at build time.');
console.log('📊 Sitemap will be split by region for better indexing.\n');

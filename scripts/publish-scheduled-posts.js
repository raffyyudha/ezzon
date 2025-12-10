/**
 * Server-side script to publish scheduled posts
 * 
 * This script can be run as a cron job on your server for more reliable
 * scheduled publishing, independent of client-side activity.
 * 
 * Usage:
 * 1. Set NEXT_PUBLIC_SITE_URL environment variable
 * 2. Run: node scripts/publish-scheduled-posts.js
 * 3. Or setup as cron job: */5 * * * * node /path/to/scripts/publish-scheduled-posts.js
 */

const https = require('https');
const http = require('http');

// Get site URL from environment or use default
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const API_ENDPOINT = `${SITE_URL}/api/news/publish-scheduled`;

console.log(`[${new Date().toISOString()}] Starting scheduled posts publisher...`);
console.log(`Target URL: ${API_ENDPOINT}`);

// Determine if we need http or https
const protocol = SITE_URL.startsWith('https') ? https : http;

// Make POST request to publish scheduled posts
const url = new URL(API_ENDPOINT);
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'ScheduledPostsPublisher/1.0'
  }
};

const req = protocol.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (res.statusCode === 200) {
        console.log(`✅ Success: ${response.message}`);
        console.log(`📊 Published: ${response.published} posts`);
        
        if (response.posts && response.posts.length > 0) {
          console.log('📰 Published posts:');
          response.posts.forEach(post => {
            console.log(`   - ${post.title} (ID: ${post.id})`);
          });
        }
      } else {
        console.error(`❌ Error: ${response.error || 'Unknown error'}`);
        console.error(`Details: ${response.details || 'No details'}`);
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Failed to parse response:', error.message);
      console.error('Raw response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  process.exit(1);
});

// Set timeout
req.setTimeout(30000, () => {
  console.error('❌ Request timeout after 30 seconds');
  req.destroy();
  process.exit(1);
});

req.end();

console.log('⏳ Waiting for response...');

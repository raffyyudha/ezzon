# ⏰ Panduan Setup Cron Job untuk Scheduled Posts

## 🎯 Overview

Untuk memastikan artikel terjadwal dipublikasikan secara reliable, Anda dapat menggunakan cron job di server. Ini lebih reliable daripada hanya mengandalkan client-side component.

## 🔧 Setup Options

### Option 1: Client-Side Only (Default)

**Sudah aktif** - Component `ScheduledPostsPublisher` berjalan di browser setiap 5 menit.

**Kelebihan:**
- ✅ Tidak perlu setup server
- ✅ Otomatis berjalan saat ada user aktif
- ✅ Mudah di-deploy (Netlify, Vercel, dll)

**Kekurangan:**
- ❌ Perlu ada user yang mengakses website
- ❌ Tidak berjalan jika tidak ada traffic
- ❌ Delay maksimal 5 menit

**Cocok untuk:**
- Website dengan traffic tinggi
- Development/testing
- Deployment di Netlify/Vercel

---

### Option 2: Server-Side Cron Job (Recommended for Production)

Setup cron job di server untuk auto-publish tanpa bergantung pada client.

## 📋 Setup Cron Job

### A. Linux/Unix Server

#### 1. Setup Environment Variable

```bash
# Edit .env atau .env.local
echo "NEXT_PUBLIC_SITE_URL=https://yourdomain.com" >> .env.local
```

#### 2. Test Script Manual

```bash
# Test script
node scripts/publish-scheduled-posts.js

# Expected output:
# ✅ Success: Successfully published X scheduled posts
# 📊 Published: X posts
```

#### 3. Setup Cron Job

```bash
# Edit crontab
crontab -e

# Add this line (runs every 5 minutes):
*/5 * * * * cd /path/to/your/project && node scripts/publish-scheduled-posts.js >> /var/log/scheduled-posts.log 2>&1

# Or every 10 minutes:
*/10 * * * * cd /path/to/your/project && node scripts/publish-scheduled-posts.js >> /var/log/scheduled-posts.log 2>&1

# Or every hour:
0 * * * * cd /path/to/your/project && node scripts/publish-scheduled-posts.js >> /var/log/scheduled-posts.log 2>&1
```

#### 4. Verify Cron Job

```bash
# List cron jobs
crontab -l

# Check logs
tail -f /var/log/scheduled-posts.log
```

---

### B. Windows Server

#### 1. Setup Environment Variable

```powershell
# PowerShell
$env:NEXT_PUBLIC_SITE_URL = "https://yourdomain.com"

# Or add to system environment variables
```

#### 2. Create Batch File

Create `publish-scheduled.bat`:

```batch
@echo off
cd C:\path\to\your\project
node scripts\publish-scheduled-posts.js >> C:\logs\scheduled-posts.log 2>&1
```

#### 3. Setup Task Scheduler

1. Open **Task Scheduler**
2. Click **Create Basic Task**
3. Name: "Publish Scheduled Posts"
4. Trigger: **Daily**
5. Recur every: **1 day**
6. Start time: **00:00**
7. Action: **Start a program**
8. Program: `C:\path\to\publish-scheduled.bat`
9. Advanced settings:
   - ✅ Repeat task every: **5 minutes**
   - ✅ For a duration of: **1 day**
   - ✅ Run whether user is logged on or not

---

### C. Netlify (Scheduled Functions)

Create `netlify/functions/scheduled-publish.js`:

```javascript
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const response = await fetch(`${process.env.URL}/api/news/publish-scheduled`, {
      method: 'POST',
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Scheduled posts published',
        data: data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

Then in `netlify.toml`:

```toml
[build]
  functions = "netlify/functions"

[[plugins]]
  package = "@netlify/plugin-functions-schedule"

  [plugins.inputs]
  schedule = "*/5 * * * *"  # Every 5 minutes
```

---

### D. Vercel (Cron Jobs)

Create `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/news/publish-scheduled",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

**Note:** Vercel cron jobs require Pro plan.

---

### E. GitHub Actions (Free Alternative)

Create `.github/workflows/publish-scheduled.yml`:

```yaml
name: Publish Scheduled Posts

on:
  schedule:
    # Runs every 5 minutes
    - cron: '*/5 * * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger publish API
        run: |
          curl -X POST https://yourdomain.com/api/news/publish-scheduled
```

---

## 🔍 Monitoring & Logging

### Check Logs

```bash
# Linux
tail -f /var/log/scheduled-posts.log

# Windows
type C:\logs\scheduled-posts.log

# Or check in Supabase
# Query published_at timestamps to verify auto-publish
```

### Monitor via API

```bash
# Check scheduled posts status
curl https://yourdomain.com/api/news/publish-scheduled

# Expected response:
{
  "readyToPublish": 0,
  "futureScheduled": 5,
  "readyPosts": [],
  "futurePosts": [...]
}
```

---

## 📊 Cron Schedule Examples

```bash
# Every 5 minutes
*/5 * * * *

# Every 10 minutes
*/10 * * * *

# Every 30 minutes
*/30 * * * *

# Every hour
0 * * * *

# Every day at midnight
0 0 * * *

# Every Monday at 9 AM
0 9 * * 1

# First day of every month at 8 AM
0 8 1 * *
```

---

## 🚨 Troubleshooting

### Cron Job Not Running

**Check:**
1. Cron service is running: `sudo service cron status`
2. Script has execute permissions: `chmod +x scripts/publish-scheduled-posts.js`
3. Correct path in crontab
4. Environment variables are set

**Debug:**
```bash
# Run manually to see errors
node scripts/publish-scheduled-posts.js

# Check cron logs
grep CRON /var/log/syslog
```

### Script Fails

**Common issues:**
1. **Wrong URL**: Check `NEXT_PUBLIC_SITE_URL`
2. **Network error**: Verify server can reach the URL
3. **Timeout**: Increase timeout in script
4. **Database connection**: Check Supabase credentials

---

## 💡 Best Practices

1. **Frequency**: 5-10 minutes is optimal (balance between timeliness and server load)
2. **Logging**: Always log to file for debugging
3. **Monitoring**: Setup alerts for failed runs
4. **Backup**: Keep client-side component as fallback
5. **Testing**: Test manually before deploying cron
6. **Timezone**: Ensure server timezone matches your needs

---

## 🎯 Recommended Setup

**For Production:**
- ✅ Server-side cron job (every 5 minutes)
- ✅ Client-side component (as backup)
- ✅ Logging enabled
- ✅ Monitoring/alerts setup

**For Development:**
- ✅ Client-side component only
- ✅ Manual API calls for testing

---

## 📞 Support

If you need help:
1. Check logs for errors
2. Test API endpoint manually
3. Verify database connection
4. Check cron job syntax
5. Contact developer

---

**Version**: 1.0  
**Last Updated**: Desember 2025  
**Status**: ✅ Production Ready

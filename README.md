# Centr HYROX Anaheim - Ad Placement Sponsorship

Website for managing ad placement sponsorships on competition shorts for the Centr HYROX Anaheim event.

## Event Details

- **Event:** Centr HYROX Anaheim | Season 26/27
- **Date:** December 3, 2026
- **Venue:** Anaheim Convention Center
- **Division:** HYROX Doubles Men
- **Participant:** Jacob Gonzales

## Sponsorship Details

- **Price:** $5,000 per bounding box placement
- **Locations:** 4 zones (front/rear, left/right legs)
- **Total Inventory Value:** $20,000

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

The site builds to the `docs/` folder and is automatically deployed to GitHub Pages.

### Manual Deployment

```bash
# Build the site
npm run build

# Commit and push
git add docs/
git commit -m "Update site"
git push origin main
```

### GitHub Pages Configuration

1. Go to repository Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main`
4. Folder: `/docs`
5. Save

The site will be available at: `https://[username].github.io/[repository]/`

## Features

- Interactive shorts visualization with clickable ad zones
- Front/rear view toggle
- Real-time sponsorship reservation system
- Exposure value calculator
- Responsive design for all devices

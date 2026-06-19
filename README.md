# Novel Translation Hub

A modern English novel translation website showcasing Chinese web novels. Built for readers who want to discover and enjoy translated stories from China.

## Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode** - Easy on the eyes with light, dark, and sepia themes
- **Reading Experience** - Customizable font size, line height, and page width
- **Chapter Navigation** - Quick access to table of contents and chapter navigation
- **Search & Filter** - Find novels by title, author, or genre
- **SEO Optimized** - Structured for search engines and Google indexing
- **Ad Ready** - Pre-configured Google AdSense integration

## Project Structure

```
英文小说搬运网站/
├── index.html          # Homepage
├── novels.html         # Novel listing page
├── novel.html          # Novel detail page
├── read.html           # Reading page
├── about.html          # About page
└── assets/
    ├── css/
    │   └── style.css   # Main stylesheet
    ├── js/
    │   └── app.js      # Core JavaScript logic
    └── data/
        ├── novels.json  # Novel metadata
        └── chapters/   # Chapter content files
```

## Getting Started

### Local Development

1. Clone the repository
2. Open `index.html` in your browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8080

# Using Node.js
npx serve

# Using PHP
php -S localhost:8080
```

3. Visit `http://localhost:8080`

### Adding New Novels

1. Open `assets/data/novels.json`
2. Add a new novel object:

```json
{
    "id": "your-novel-id",
    "title": "Novel Title",
    "author": "Author Name",
    "genre": "Fantasy",
    "status": "ongoing",
    "rating": "4.5",
    "views": 100000,
    "cover": "cover-image-url.jpg",
    "description": "Novel description...",
    "updatedAt": "2024-01-15T10:00:00Z",
    "chapters": [
        {
            "id": "ch1",
            "number": 1,
            "title": "Chapter 1 Title",
            "wordCount": 3000,
            "updatedAt": "2024-01-15T10:00:00Z"
        }
    ]
}
```

3. Create chapter content in `assets/data/chapters/`:
   - Create a file named `{chapter-id}.json`
   - Example: `ch1.json`

```json
{
    "id": "ch1",
    "title": "Chapter 1 Title",
    "novelId": "your-novel-id",
    "number": 1,
    "wordCount": 3000,
    "content": "Your chapter content here...",
    "updatedAt": "2024-01-15T10:00:00Z"
}
```

## Deploying to GitHub Pages

1. Create a new repository on GitHub
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. Go to repository **Settings** > **Pages**
4. Select **Source**: Deploy from a branch
5. Select **Branch**: `main` / `(root)`
6. Click **Save**
7. Your site will be live at: `https://yourusername.github.io/your-repo-name/`

## Google AdSense Setup

The website is pre-configured for Google AdSense. To enable ads:

1. Get your AdSense publisher ID from [Google AdSense](https://www.google.com/adsense)
2. Replace `ca-pub-5387839826697987` with your publisher ID in all HTML files
3. Create ad units in AdSense dashboard
4. Replace `REPLACE_WITH_AD_SLOT_XXX` placeholders with your actual ad slot IDs

## Customization

### Theme Colors

Edit variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #2563eb;
    --bg-color: #ffffff;
    --text-color: #1e293b;
}
```

### Reading Settings

Users can customize their reading experience:
- Font size (14px - 28px)
- Line height (1.5 - 2.5)
- Page width (60% - 100%)
- Three themes: Light, Dark, Sepia

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is for personal use and customization. Please respect copyright laws regarding novel translations.

## Contact

For questions or suggestions, please open an issue on GitHub.

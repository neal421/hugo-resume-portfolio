# Neal Raulston — Hugo Resume & Infrastructure Portfolio

A fast, flat-file personal resume and technical portfolio built with [Hugo](https://gohugo.io/), designed for continuous deployment via **GitHub** and **[Netlify](https://www.netlify.com/)**.

---

## Project Architecture (How It Works)

```text
hugo-resume-portfolio/
├── hugo.toml                  # Global Hugo site configuration & metadata
├── netlify.toml               # Automatic build & security headers config for Netlify
├── data/
│   └── resume.yaml            # <--- FLAT-FILE CMS: Edit all resume content here!
├── content/
│   └── _index.md              # Home page frontmatter
├── layouts/
│   ├── _default/baseof.html   # HTML shell, SEO tags & Google Fonts
│   └── index.html             # Portfolio, timeline, skills matrix & print layout
└── static/
    ├── css/style.css          # Vanilla CSS design system (Dark/Light + @media print)
    └── js/main.js             # Theme toggle, domain filtering & PDF print trigger
```

---

## 1. Updating Your Resume Content

You never need to edit HTML or CSS to update your resume. Open [`data/resume.yaml`](./data/resume.yaml) and modify:

- **`profile`**: Name, headline, summary, and contact links (email, LinkedIn, GitHub).
- **`highlights`**: Top 3 operational focus cards in the hero section.
- **`experience`**: Chronological job history, bullet points, and domain filter tags (`hardware`, `networking`, `linux`, `operations`).
- **`skill_domains`**: Technical skills grouped by domain.
- **`projects`**: Featured initiatives, playbooks, or engineering projects.
- **`certifications` & `education`**: Credentials, training, and degrees.

> **Important (Public Hosting Reminder):** Since GitHub and Netlify are public platforms, ensure all descriptions in `data/resume.yaml` remain public-safe (no internal Google project code names, internal URLs, or confidential metrics).

---

## 2. Running Locally

To preview changes on your machine with live reload:

```bash
hugo server -D --bind 0.0.0.0 --port 1313
```

---

## 3. Publishing with GitHub + Netlify

### Step A: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (for example, `hugo-resume-portfolio`).
2. Push this local repository to GitHub:
   ```bash
   cd ~/hugo-resume-portfolio
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/hugo-resume-portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Step B: Connect to Netlify
1. Log in to [Netlify](https://app.netlify.com/) and click **Add new site → Import an existing project**.
2. Choose **GitHub** and select your `hugo-resume-portfolio` repository.
3. Netlify will automatically detect [`netlify.toml`](./netlify.toml):
   - **Build command:** `hugo --gc --minify`
   - **Publish directory:** `public`
4. Click **Deploy site**. Whenever you edit `data/resume.yaml` and run `git commit` + `git push`, Netlify will automatically rebuild and publish your live site within seconds.

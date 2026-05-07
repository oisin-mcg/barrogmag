# Barróg CMS Setup

The site includes a simple Git-backed CMS at `/admin`. It edits JSON content files in `src/content` and uploads images/PDFs into `public/uploads`.

## What The Team Can Edit

- Issues: title, description, release date/countdown, cover image, PDF file, archive/current issue status.
- Authors: name, role, profile photo, and bio.
- Blog posts: title, excerpt, date, author, and body paragraphs.

## Before Deploying

Create a GitHub repository for this project, then update:

```yaml
backend:
  name: github
  repo: OWNER/REPO
  branch: main
```

in `public/admin/config.yml`.

Example:

```yaml
backend:
  name: github
  repo: barrog-magazine/barrog-web
  branch: main
```

## GitHub And Cloudflare Pages

1. Push the site to GitHub.
2. In Cloudflare, create a Pages project from the GitHub repository.
3. Use this build configuration:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. After deploy, open `/admin` on the live site.

## CMS Login Options

For the quickest setup, team members with GitHub access can use Sveltia CMS token login.

For a smoother multi-person login, deploy the Sveltia CMS Authenticator as a Cloudflare Worker and add its URL to `public/admin/config.yml`. This avoids asking editors to paste GitHub tokens manually.

## Publishing Workflow

When someone saves content in the CMS, the CMS commits changes to GitHub. Cloudflare Pages sees the commit, rebuilds the site, and publishes the update.

Only people with GitHub write access to the repository should be able to publish.

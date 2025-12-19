# GSC Search Console URL Impression ETL

Lightweight ETL and SQL utilities to extract and transform Search Console URL impressions for the GSC project.

## Project overview
- Purpose: Extract, transform and load Search Console URL impression data for reporting and Fabric ingestion.
- Contents: SQL utilities, Python helpers and a Jupyter notebook ETL driver.

## Repository structure
- `SearchConsole_URLImpression_ETL.ipynb` — primary ETL notebook
- `create_url_cluster_lookup.py` — helper script
- `*.sql` — SQL scripts used for checks, views and ETL
- `GETTING_STARTED.md` — project setup and quick start
- `DEPLOYMENT_CHECKLIST.md` — deployment steps and checks
- `DHL_GSC_Aggregation_Documentation.md` — aggregation documentation

## Prerequisites
- Git installed and available in PATH
- Python 3.8+ for running helper scripts (if used)
- Any credentials or secrets stored securely (not in repo)

## How to publish this project to a remote Git repository
1. Install Git (Windows):
   - Download: https://git-scm.com/download/win
   - Or use winget: `winget install --id Git.Git -e --source winget`
2. Configure your identity (one-time):
   - `git config --global user.name "Your Full Name"`
   - `git config --global user.email "you@yourdomain.com"`
3. In this project folder (PowerShell):
   - `Set-Location -LiteralPath 'C:\Users\daakara\OneDrive - DPDHL\Manager Data Analytics & Reporting\Fabric\GSC'`
   - If the repo is not initialized: `git init`
   - `git add .`
   - `git commit -m "Initial commit: add ETL and scripts with documentation"`
   - `git branch -M main`
   - `git remote add origin <REMOTE_URL>`  # replace with your remote URL
   - `git push -u origin main`

If the repository already exists and has a remote, skip `git init` and `git remote add origin`.

## Documentation
- Primary docs: `GETTING_STARTED.md`, `DEPLOYMENT_CHECKLIST.md`, `DHL_GSC_Aggregation_Documentation.md`
- Add a short summary to `GETTING_STARTED.md` if you want a one-page quickstart (optional)

## Notes & next steps
- Do not commit credentials or secrets. Use environment variables or secret stores.
- If you want, I can run the git commands here after you confirm Git is installed and provide a remote URL.

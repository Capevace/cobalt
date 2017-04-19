# Plan for Cobalt

- Blog, projects, Pages, Documents (Uploads)
- Blog and projects should have categories/tags
- Content Markdown-based
- Theming
- Database-less? (could cause problems with hosters & permanent storage)
- User Rights Management
- Customizeable sub-routes
  - can choose e.g. documents route ('.com/documents/file' or '.com/my-documents/file' etc)
  - for documents, projects and blog
- Documents can be made private, password-protected etc

## Data storage
- File based
- Normal Data in .JSON
- Posts (blog, projects, pages) in .COMD (maybe rename carbon)


## COMD
- combined markdown and JSON
- separated by '---'

app/  
public/
data/
  documents/
    files/
      my-file.pdf
    my-file.pdf.json
  settings/
    core.json
    users.json
  blog/
    {{slug}}.comd
  projects/
    {{slug}}.comd
  pages/
    {{slug}}.comd
  trash/
    {{removaldate}}-{{slug}}.comd

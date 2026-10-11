# Mini-Web-Projects

Small web projects by Mohammad Diab, each in its own folder, built with plain HTML, CSS and vanilla JavaScript. No libraries, no build step, and every project runs on GitHub Pages.

**View them:** https://mohammad-diab.github.io/Mini-Web-Projects/

## Projects

| Project | Year | Description | Live |
|---|---|---|---|
| [Fluent Design](Fluent-Design) | 2019 | Six UI controls styled after Microsoft's Fluent Design: Button, Checkbox, Link Button, ProgressBar, Radio Button and Toggle Button. | [Open](https://mohammad-diab.github.io/Mini-Web-Projects/Fluent-Design/) |

## Fluent Design

Six UI controls styled after Microsoft's Fluent Design (the Windows 10 look): Button, Checkbox, Link Button, ProgressBar (normal, linear indeterminate and circular indeterminate), Radio Button and Toggle Button. Each control has its own demo page, and the project's index page links to all six.

![The six controls: buttons, checkboxes, links, progress bars, radio buttons and toggle switches](docs/Fluent-Design.png)

This repository started as `Fluent-Design`; its history now lives in the `Fluent-Design` folder:

- The first commit is the original 2019 version: one folder per control, each with its own `.htm` page, plus `Temp Files` (reference screenshots, colour values and a checkmark SVG used while designing).
- The second commit is the version published in 2022: the folders lost their spaces, each page became `index.htm`, and an index page and an IIS `web.config` were added.
- The third commit changed the index page links from root paths to relative paths, so the site works from a subfolder.

## Run it locally

```
git clone https://github.com/Mohammad-Diab/Mini-Web-Projects.git
```

Then open `index.html`, or any project's `index.htm`, in a browser. Nothing to install or build.

On GitHub Pages the whole repository is published, and the Pages workflow copies every `index.htm` to `index.html` so each folder opens by its own URL.

## Author

Mohammad Diab

## License

[MIT](LICENSE)

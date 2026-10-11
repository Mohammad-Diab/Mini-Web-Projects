# Fluent-Design

Six UI controls styled after Microsoft's Fluent Design (the Windows 10 look), built in 2019 with plain HTML, CSS and vanilla JavaScript: Button, Checkbox, Link Button, ProgressBar (normal, linear indeterminate and circular indeterminate), Radio Button and Toggle Button. Each control has its own demo page, and the index page links to all six. No libraries, no build step.

**View it:** https://mohammad-diab.github.io/Fluent-Design/

![The six controls: buttons, checkboxes, links, progress bars, radio buttons and toggle switches](docs/screenshot.png)

## History

- The first commit is the original 2019 version: one folder per control, each with its own `.htm` page, plus `Temp Files` (reference screenshots, colour values and a checkmark SVG used while designing).
- The second commit is the version published in 2022: the folders lost their spaces, each page became `index.htm`, and an index page and an IIS `web.config` were added.
- The third commit changed the index page links from root paths to relative paths, so the site works from a subfolder.

## Run it locally

```
git clone https://github.com/Mohammad-Diab/Fluent-Design.git
```

Then open `index.htm`, or any control's `index.htm`, in a browser. Nothing to install or build.

## Author

Mohammad Diab

## License

[MIT](LICENSE)

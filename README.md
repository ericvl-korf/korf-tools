# Korf tools

<img src="logos/korf-log.svg" alt="Korf Log logo" width="96"> <img src="logos/korf-lab.svg" alt="Korf Lab logo" width="96">

Two free, single-file web apps for korfball, created by Eric Van Looy.

## Latest features

- **2026-10-20 20:53 (Europe/London)**: Korf Lab highlight videos and ffmpeg scripts are now named after the match as in the event log plus _highlights (for example Team A v Team B_highlights.mp4). The ffmpeg script keeps only the merged highlights file, not the individual clips.
- **2026-10-20 20:17 (Europe/London)**: Match video can now be set up in Korf Log's match setup (YouTube link or local video file, one video or one per half, with the video time each half starts). Start moves the video to the right moment. Korf Lab's new Highlights page filters shots by shooter, shot type, outcome and attack number, and builds a highlight reel: Play all on YouTube, a video file made from a local video, or an ffmpeg script.

| App | What it does | Open |
|---|---|---|
| **Korf Log** | Record a match live, one click at a time: passes, shots, turnovers, substitutions. Exports an event log (CSV or JSON). | [Open Korf Log](https://ericvl-korf.github.io/korf-tools/Korf%20Log.html) |
| **Korf Lab** | Reads the event logs and builds team and player dashboards, shot maps, attack replays and printable PDF reports. | [Open Korf Lab](https://ericvl-korf.github.io/korf-tools/Korf%20Lab.html) |

## User guides

- [Korf Log user guide](docs/Korf-Log-user-guide.md)
- [Korf Lab user guide](docs/Korf-Lab-user-guide.md)

## Download

To keep a copy and open it offline in any browser:

- **Direct download:** right-click a link and choose **Save link as…** (on a phone, long-press and choose Download link):
  [Korf Log.html](https://raw.githubusercontent.com/ericvl-korf/korf-tools/main/Korf%20Log.html) · [Korf Lab.html](https://raw.githubusercontent.com/ericvl-korf/korf-tools/main/Korf%20Lab.html)
- **From GitHub:** open the file in this repository and use the download icon at the top right of the file view.
- **Everything:** choose **Code → Download ZIP** on the repository home page.

Then double-click the saved file to open it. Matches are stored per browser and per file location, so a downloaded copy starts empty. Export a backup before moving between the web version and a downloaded copy.

## Notes

- Everything runs in your browser; nothing is uploaded. Matches are stored in the browser on the page's address, so export a backup before switching address or device.
- Korf Lab has a **Load a sample match** button to try it without data.
- Both apps are plain HTML files: save the file and open it locally if you prefer.

**Privacy.** This site counts anonymous page visits and file downloads (no cookies, no personal data). Your match data never leaves your browser.

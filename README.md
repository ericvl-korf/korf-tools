# Korf tools

<img src="logos/korf-log.svg" alt="Korf Log logo" width="96"> <img src="logos/korf-lab.svg" alt="Korf Lab logo" width="96">

Two free, single-file web apps for korfball, created by Eric Van Looy.

## Latest features

- **2026-11-05 23:45 (Europe/London)**: New today: **Start screen from the logo (Korf Log):** click the Korf Log icon or name to go back to the start screen (new match or continue a previous one). If a setup is half-done, Korf Log asks first. The match stays saved; **Back to the tracker** returns to it.
- **2026-11-05 23:30 (Europe/London)**: New today: **Automatic checks with a YouTube link (Korf Log):** Check times now always shows the video file choosers and the automatic **Find the video offset** and **Look for shot times** steps below tap sync. Before, a match that had a YouTube link hid them, so a video file could not be chosen there.
- **2026-11-05 23:15 (Europe/London)**: New today: **Tap sync with two videos (Korf Log):** in Check times, **1st half video / 2nd half video** buttons switch which half's video you tap, so you no longer need to move the clock (which was impossible after End match).
- **2026-11-03 08:45 (Europe/London)**: New today: **Korf Log timer and export:** with a match video, the −1 s / +1 s buttons beside Start/Pause move the match and video together and the clock-only pair sits underneath; the Transfer panel and the shot and substitution pop-ups have a Pause / Resume match + video button; after Check times changes event times, Korf Log offers to export the corrected event log, and exporting afterwards no longer offers to check the times again.
- **2026-11-03 08:20 (Europe/London)**: New today: **Only shared stats (Korf Lab):** with several matches selected, Korf Lab shows a stat only if every selected match logged it (passes, turnovers, shot types, shooter gender and division, player rebounds, minutes). A line under the filters says which stats are hidden and why.
- **2026-11-02 16:00 (Europe/London)**: New today: **Music on the video tutorials:** both tutorials now have a background music track ("Tutorial" by Paul Yudin, Pixabay) and run 2:45 to match it. Korf Lab's walkthrough is re-recorded with longer pauses; Korf Log's is slightly sped up.
- **2026-11-02 14:05 (Europe/London)**: New today: **Subs for injuries (Korf Log):** a player can go off injured with no replacement, and a new player (not in the match setup) or a bench player can come on later into the division that is a player short. Saved in CSV and JSON; Korf Lab reads them.
- **2026-11-01 21:00 (Europe/London)**: New today: **Korf Log** setup step 2 (Match video) now shows a small preview player once a YouTube link or video file is added. Play or step through the video to the whistle, then press **Set as 1st half start** (or 2nd half) to fill in the start time straight away.
- **2026-10-31 23:40 (Europe/London)**: New today:
  - **Korf Lab starts with a question (Korf Lab):** "Which files do you want to load?" with Korf Log files, Yellow Bucket files or Sample file. Korf Log files and Yellow Bucket files each have one **Load file(s)** button that takes one or more files; the folder picker is gone. Several Yellow Bucket files are converted one after another.
  - **Dropdown filters and print menu (Korf Lab):** Team is a dropdown (the common team only, Opponents only or All teams; with one match, its two teams and All teams). Match is a multi-select with Select all. The three print buttons are one Print dropdown.
  - **Shot map dropdowns (Korf Lab):** the shot map's buttons are now single-select dropdowns.
- **2026-10-31 20:00 (Europe/London)**: New features today:
  - **Flag shots that look mistimed (Korf Log):** in Check times, one button compares each shot's logged time with the top of the ball's flight in the positions saved while tracking, lists the shots that are 2 or more seconds off (1 for penalties and free passes) and lets you move them. It is instant and needs no video file. If most shots are off by the same amount it suggests re-timing the whole log.
  - **Best clips (Korf Lab):** a new filter keeps the best 5, 10, 15, 20 or 30 clips: goals first, then harder shots, longer goals, rallies and clips where the ball was found in flight. With Crop follows the ball, only those clips are searched.

- **2026-10-31 19:00 (Europe/London)**: New features today:
  - **Korf Log finds the ball while you track (video file only):** with a video file on this computer, Korf Log now works in the background to find the ball around each shot you log and saves the positions on the shot (JSON backup and CSV column `ball_track`). A tick box and a progress line sit under the video, and End match says how many shots are still waiting.
  - **Korf Lab uses them:** Crop follows the ball uses the saved positions and searches only the clips without any. If every clip has saved positions, nothing is searched and the video file is not needed.

- **2026-10-31 18:00 (Europe/London)**: New feature today:
  - **Crop follows the ball starts the search itself (Korf Lab):** ticking **Crop follows the ball** now starts finding the ball in your video straight away (a note beside the box says so), and ticks Portrait 10:16 for you. Unticking stops it. The separate ball track file option is removed. The box is greyed out, with the reason on hover, until the video file and start times are set.

- **2026-10-31 17:40 (Europe/London)**: New feature today:
  - **Tighter ball-following in highlight clips (Korf Lab):** with Portrait 10:16 and Crop follows the ball, the crop now re-aims every third of a second (the rate the ball is found at) with light smoothing, instead of every half second with heavy smoothing. In a test with a moving ball, the ball sits much nearer the centre of the crop (average miss about 2% of the window instead of about 21%). Run the highlight script or video again to get the new crops.

- **2026-10-31 16:10 (Europe/London)**: New feature today:
  - **Updated Korf Log video tutorial:** the walkthrough (2:55) is re-recorded for the new start screen, six-step setup, tracking, Time outs, Check times with tap sync, finding the ball for highlights, End match and export.
  - **Tap sync for YouTube videos (Korf Log):** the automatic Check times needs a video file, because a YouTube video cannot be read by a web page. With a YouTube link, **Check times against the video** now offers tap sync instead: Korf Log lists a few goals and other clear events in each half, you find each one in the video (Show me jumps there) and press Now, and Korf Log works out how far the logged times are from the video, including a drift part-way through the half. You apply the result and can restore the original times. After **End match**, YouTube users are offered tap sync before the export.

- **2026-10-31 15:30 (Europe/London)**: New feature today:
  - **A step-by-step start and setup (Korf Log):** Korf Log now opens with a choice: *Continue a previous match* (pick one saved in this browser or open a backup file, then say whether you want to look at the setup) or *Start a new match*. A new match is six steps (fixture, video, teams and players, format and court, events, opening attack). Missing information is flagged at each step, and doubtful choices ask you to confirm. The video step explains that a video file on this computer allows Check times against the video later. The Export and import panel is gone: save a backup any time from the top, and when you press End match you are offered Check times against the video (if you used a local video file) and then an export pop-up. Importing is done from Continue a previous match.

- **2026-10-25 23:45 (Europe/London)**: New feature today:
  - **Check times against the video (Korf Log):** a new panel under the event log. *Re-time the log* matches the camera movement in your video with the logged ball positions to find how far the logged times are from the video, including steps where the clock was stopped; you see the result and apply it. *Suggest shot times* finds the ball around each shot (penalties and free passes by default, all shots if ticked) and proposes the time of the shot; you tick which to apply. Original times are kept, can be restored, and are saved in backups and in a new `time_original_s` CSV column.

- **2026-10-25 20:55 (Europe/London)**: New feature today:
  - **Steps to make a highlight reel (Korf Lab):** a short checklist at the top of the Highlights page ticks off each step (pick the shots, add the video, find the ball, choose the look, make it) and highlights the next one. Also: long captions in the ffmpeg script now shrink to fit the picture.

- **2026-10-25 11:30 (Europe/London)**: Fix today:
  - **Find the ball in my video (Korf Lab):** the ball finder now loads when Korf Lab is opened from GitHub Pages (it failed with a "Failed to resolve module specifier" message). If Crop follows the ball is ticked but no ball positions are loaded, saving the script or recording now says so instead of quietly centring the crop.

- **2026-10-25 11:08 (Europe/London)**: New feature today:
  - **Penalty and free pass clips (Korf Lab):** these shots are logged at the referee's call, but taken seconds later. Their clips are now longer (marked ~), and **Find the ball in my video** finds the exact moment of the shot from the ball's first big arc and moves the clip there (marked ✓).

- **2026-10-25 10:09 (Europe/London)**: New feature today:
  - **Portrait and ball-following in Make highlight video (Korf Lab):** with **Portrait 10:16** ticked, the in-browser Make highlight video now makes a 720 × 1152 portrait video, and with **Crop follows the ball** the window follows the ball (after **Find the ball in my video** or a ball track file). Long captions shrink to fit.

- **2026-10-25 10:03 (Europe/London)**: New feature today:
  - **Find the ball in my video (Korf Lab):** a ball finder that runs in your browser, on your computer, works through the filtered clips in your own video file and finds the ball. With Portrait 10:16 and **Crop follows the ball** ticked, the ffmpeg script then keeps the ball in the portrait frame. Nothing is uploaded; a 20 MB ball finder (YOLOX tiny, Apache-2.0) is downloaded once. Ball track CSV files still work too.

- **2026-10-24 23:58 (Europe/London)**: New feature today:
  - **Why a button is greyed out (Korf Lab):** hover over **Make highlight video** or **Play all on YouTube** when it is disabled to see what is missing, such as choosing the video file again after reopening Korf Lab, or the video start times.

- **2026-10-22 23:14 (Europe/London)**: New feature today:
  - **Move video and clock together (Korf Log):** new **Both −1 s / +1 s** buttons under the match video rewind or fast forward the clock and the video by the same amount, so they stay lined up. The same buttons are under the clock too, so they also work in Maximise.
  - **Video follows the clock speed (Korf Log):** the Speed buttons (0.5×, 0.75×, 1×, 1.25×) now set the video's playback speed too, so clock and video stay lined up at any speed. Works for YouTube links and local video files, and changing the speed in the video player moves the clock to match.

- **2026-10-21 00:07 (Europe/London)**: New features today:
  - **Video tutorials:** a short captioned walkthrough of each app (Korf Log 1:28, Korf Lab 1:46, in the [tutorials](tutorials/) folder) behind a new **Video tutorial** button at the top of Korf Log and Korf Lab. The Korf Log one includes the match video and the Time out buttons.
  - **Match video at setup (Korf Log):** add a YouTube link or a local video file in match setup, as one video or one per half, with the video time each half starts. Start moves the video to the right moment, and the video and clock ±1 s buttons keep the alignment saved. Links, file names and start times carry into Korf Lab.
  - **Time out start / end (Korf Log):** two Time out buttons replace the single one. The match clock stops and restarts while the video keeps running, and the video time of each time out is saved so clock and video stay lined up, including in Korf Lab highlight reels.
  - **Highlights page (Korf Lab):** list and filter every shot by half, team, division, gender, shooter, shot type, outcome and attack number, with clip start and end times and YouTube links.
  - **Highlight reel (Korf Lab, with its own section in the user guide):** Play all on YouTube, make one highlight video from a local video file, or save an ffmpeg script. Files are named after the match plus _highlights; the script keeps only the merged file by default, with tick boxes for a portrait 10:16 centre-crop frame (Instagram), captions burned into the clips, and individual clips instead of one video.

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
- Korf Lab has a **Sample file** option to try it without data.
- Both apps are plain HTML files: save the file and open it locally if you prefer.

**Privacy.** This site counts anonymous page visits and file downloads (no cookies, no personal data). Your match data never leaves your browser.

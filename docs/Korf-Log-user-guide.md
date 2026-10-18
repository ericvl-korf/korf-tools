<img src="images/banner-log.png" alt="Korf Log" width="500">

# Korf Log: user guide

Korf Log records a korfball match as it is played, one click at a time, and exports an event log that Korf Lab turns into team and player reports.

## 1. Set up a match

- **Fixture and teams:** enter the league (pick from the England Korfball list, or choose Other and type a name) and the fixture date (both required), the fixture week (optional) and the two team names. Once a league from the list is chosen, the Home and Away team names are dropdowns of that league's teams (as listed on the England Korfball League Republic site); choose Other to type a team that is not listed. A team cannot be picked for both sides. Pick a colour for each team. The match list shows each match as Team A v Team B, fixture date and score. Korf Lab uses the fixture week to order matches, or the fixture date when the week is empty.
- **Players (optional):** add name, number, division and gender, plus substitutes. Without names you still log every shot and pass.
- **Match format:** 60 min is the default; other lengths and halves or quarters are available. Set the court size and choose the court and *Free pass & penalty circles* colours.
- **Events to track:** tick passes, shots, referee calls and turnovers. For shots, choose **Log separate shot types** (Distance shots or runners) or **Do not log separate shot types**; with the second choice the shot popup skips the shot-type step. For passes, choose **Full tracking** (one click per pass on the court; logs pass location and pass count) or **Count tracking** (click anywhere on the court to add a pass to the attack; logs pass count only, not location).
- **Opening attack:** choose the team in possession first and its attacking direction. When names are logged, also choose the division attacking first. A team without player names is shown by its team name alone in the picture. In the 2nd half the teams swap ends and the team that did not have the opening attack attacks first. The divisions that were attacking stay in attack; divisions only switch after every second goal of the two teams combined.

![Figure 1. Match setup, top section: the league, fixture date and fixture week, then team names, colours and players.](images/log-1.png)

## 2. Track the match

| To log | Do this |
| --- | --- |
| Clock | Start or pause with the clock button or the space bar. The −5 s and +5 s buttons correct the time. Under them, the Speed buttons run the clock at 0.5× or 0.75× (slower), 1× (normal) or 1.25× (faster). The speed is saved with the match. When regular time ends (30:00 in the 1st half of a 60-minute match) the clock runs straight on into extra time, with no action from you, and reads 30:00 +00:00, 30:00 +00:01 and so on. Events are logged as 30:00 +mm:ss (60:00 +mm:ss in the 2nd half). Press End 1st half when the half is over: the 2nd half is then set up with the clock stopped at 30:00 (the space bar never starts it); press Start when play begins. At the end of the 2nd half press End match. While extra time runs, the clock button pauses or resumes the extra time stopwatch. The −5 s button never goes back past the start of the current half or, in extra time, past +00:00, and +5 s is disabled in extra time. |
| Passes | **Full tracking:** click the court for the start of the first pass. Each next click ends one pass and starts the next. **Count tracking:** click anywhere on the court (or press the P key) for each pass in the attack; the hint under the court shows how many passes the attack has so far. No location is logged. A double-click still logs a shot, and its first click is not counted as a pass. |
| Shot | Double-click where it was taken. (If shot types are switched off in the setup, there is no shot-type step: with player names you pick the shooter or Skip, otherwise you go straight to the outcome.) **Step 1:** pick the shot type (Distance shot is pre-selected; press 1 for Distance shot or 2 for Runner) and, if names are logged, the shooter. Click the selected type again, or press Enter, to continue with the shooter unknown. **Step 2:** Goal, a rebound, Ball out, or Defended shot. Attack options sit in the left column (Goal, the attacking rebounders or team, Ball out · attack, Penalty, Free pass), defence in the right (Defended shot, the defensive rebounders or team, Ball out · defence, Turnover · attacking foul). Penalty, Free pass and Turnover · attacking foul are for referee calls made while the ball is still loose after the shot: the shot is logged with the outcome Rebound · Foul for the side that gets the ball (it appears in the event log; it is not a button you click), followed by the call. Korf Lab treats it as a rebound by that side and does not count Foul as a rebounding player. Both steps cover the court, and the tiles fill the frame. |
| Other events | Penalty, Free pass, turnover tiles, Time out and Subs sit above the court. |
| Mistakes | Press Ctrl+Z (Cmd+Z on a Mac) to undo the last event. Esc closes a popup. |
| Match video | Under the court, paste a YouTube link into Match video and press Show video. The player appears under the court, and in Maximise the court gets a little smaller to make room for it. Open on YouTube, Change link and Remove video sit under the player. The link is saved with the match, in the JSON backup and in the CSV export (video_url column). The player only works when Korf Log is opened from a web address, such as the GitHub Pages link. In a file opened from your computer, or inside the Claude page, YouTube refuses to play it, so use the Open on YouTube link there. |

![Figure 2. Tracking screen: fixture line and match list at the top, clock with its speed buttons, and passes drawn as numbered arrows.](images/log-2.png)

![Figure 3. Shot popup, step 1: shot type, then the four players of the attacking team.](images/log-3.png)

![Figure 4. Shot popup, step 2: attack outcomes and four rebounders on the left, defence on the right, in team colours.](images/log-4.png)

![Figure 5. Half time with extra time running: the clock reads 30:00 +00:03, events are logged as 30:00 +mm:ss, and End 1st half sets up the next half.](images/log-5.png)

Team colours fill each team's buttons. Where names are logged, player buttons get a coloured border instead.

## 3. Save, resume and export

- Matches are kept in your browser, so you can stop and finish a match later. **Save backup** downloads a file you can import again. To carry on a saved match, open **New match** and use **Continue a saved match** at the top of the setup page: choose the backup file (.json or .csv) and tracking opens with the clock where it stopped. The Import box under the event log does the same.
- **Export** gives the event log as CSV or JSON. Choose the format, then read it in the box, copy it, or save it as a file with the button beside the choice (Save CSV file or Save backup file). Korf Log and Korf Lab both read JSON and CSV. A JSON backup is exact; a CSV rebuilds the match from its events, so players who never shot, collected a rebound or were named in a substitution are missing from the player buttons. Both formats record the team, court and circle colours, so Korf Lab can use them. Events logged in extra time show as 30:00 +mm:ss in the time column; the extra time seconds are in an extra extra_time_s column.
- **Maximise** hides everything except the clock and speed buttons, score, tracking buttons, a one-line log of the last event (with a delete button) and the court. **Match setup** edits the current match. **New match** starts another, keeping the teams and colours.

**Privacy.** This site counts anonymous page visits and file downloads (no cookies, no personal data). Your match data never leaves your browser.

*Korf Log is created by Eric Van Looy.*

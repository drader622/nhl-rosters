# NHL Rosters
This app allows a user to enter a team name or mascot and the corresponding team roster will display. It will show the jersey number, player name, and player position.

Check it out! <a href="https://nhl-rosters.netlify.app/">nhl-rosters.netlify.app</a>

## How It Works
Accepts a users input of partial or full team name/mascot
![image](https://user-images.githubusercontent.com/102004658/165452921-0e92e128-9acb-4093-8a17-8cbd1a6460a1.png)


Then returns a list of the team's roster with the jersey number, player name, and position.

The displayed list is styled with the team colors.
![image](https://user-images.githubusercontent.com/102004658/165452988-11da268d-14e4-459f-a342-92234ffa2dfe.png)

## How It's Made
Tech Used: HTML, CSS, JavaScript, nhl API

The app fetches the team info from the API and stores the data in an arry. Then iterates through the array to match the user input to a team. Then the app fetches that specific team roster and colors, and then creates a new list with elements for each player on the team.

## Lessons Learned
Developing this app taught me how to create and display a list item (li) for every player on the team after fetching the roster.

//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('a').addEventListener('click', getTeam);
const teamData = [];
let playerArr = [],
   positionArr = [],
   jerseyArr = [],
   teamColors = [];
listOfLis = [];
let containerLists;
userTeam;

document.body.onload = loadData();
function loadData() {
   fetch(`https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`)
      .then(res => res.json())
      .then(data => {
         //creates teamData object for all teams
         data.teams.forEach(team => {
            teamData.push({
               name: team.name,
               conference: team.conference.name,
               division: team.division.name,
               id: team.id,
            })
         })
         setColorsArr();
         console.log(teamData);
      })
      .catch(err => {
         console.log(`error ${err}`);
      })
}

function setColorsArr() {
   teamColors = [[1, 'rgb(206, 17, 38)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
   [2, 'rgb(0,83,155)', 'rgb(244, 125, 48)', 'rgb(255, 255, 255)'],
   [3, 'rgb(0,56,168)', 'rgb(206,17,38)', 'rgb(255, 255, 255)'],
   [4, 'rgb(247, 73, 2)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
   [5, 'rgb(0, 0, 0)', 'rgb(252,181,20)', 'rgb(255, 255, 255)'],
   [6, 'rgb(252, 181, 20)', 'rgb(17, 17, 17)', 'rgb(255, 255, 255)'],
   [7, 'rgb(0,38,84)', 'rgb(252,181,20)', 'rgb(255, 255, 255)'],
   [8, 'rgb(175, 30, 45)', 'rgb(25, 33, 104)', 'rgb(255, 255, 255)'],
   [9, 'rgb(197 32 50)', 'rgb(0,0,0)', 'rgb(255, 255, 255)'],
   [10, 'rgb(255, 255, 255)', 'rgb(0, 32, 91)', 'rgb(0, 32, 91)'],
   [12, 'rgb(226,24,54)', 'rgb(35,31,32)', 'rgb(255, 255, 255)'],
   [13, 'rgb(4,30,66)', 'rgb(200,16,46)', 'rgb(255, 255, 255)'],
   [14, 'rgb(255, 255, 255)', 'rgb(0, 40, 104)', 'rgb(0, 40, 104)'],
   [15, 'rgb(4, 30, 66)', 'rgb(200, 16, 46)', 'rgb(255, 255, 255)'],
   [16, 'rgb(207,10,44)', 'rgb(0,0,0)', 'rgb(255, 255, 255)'],
   [17, 'rgb(255,255,255)', 'rgb(206,17,38)', 'rgb(206,17,38)'],
   [18, 'rgb(4,30,66)', 'rgb(255,184,28)', 'rgb(255, 255, 255)'],
   [19, 'rgb(0, 47, 135)', 'rgb(252, 181, 20)', 'rgb(255, 255, 255)'],
   [20, 'rgb(200,16,46)', 'rgb(241, 190, 72)', 'rgb(255, 255, 255)'],
   [21, 'rgb(111, 38, 61)', 'rgb(35, 97, 146)', 'rgb(255, 255, 255)'],
   [22, 'rgb(4, 30, 66)', 'rgb(252, 76, 0)', 'rgb(255, 255, 255)'],
   [23, 'rgb(0, 32, 91)', 'rgb(4, 28, 44)', 'rgb(255, 255, 255)'],
   [24, 'rgb(0, 32, 91)', 'rgb(4, 28, 44)', 'rgb(255, 255, 255)'],
   [23, 'rgb(252, 76, 2)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
   [24, 'rgb(252, 76, 2)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
   [25, 'rgb(0, 104, 71)', 'rgb(143, 143, 140)', 'rgb(255, 255, 255)'],
   [26, 'rgb(17,17,17)', 'rgb(162,170,173)', 'rgb(255, 255, 255)'],
   [28, 'rgb(0, 109, 117)', 'rgb(234, 114, 0)', 'rgb(255, 255, 255)'],
   [29, 'rgb(0,38,84)', 'rgb(206,17,38)', 'rgb(255, 255, 255)'],
   [30, 'rgb(2, 73, 48)', 'rgb(175, 35, 36)', 'rgb(255, 255, 255)'],
   [52, 'rgb(4,30,66)', 'rgb(172,22,44)', 'rgb(255, 255, 255)'],
   [53, 'rgb(140,38,51)', 'rgb(226,214,181)', 'rgb(255, 255, 255)'],
   [54, 'rgb(185,151,91)', 'rgb(51,63,72)', 'rgb(255, 255, 255)'],
   [55, 'rgb(0, 22, 40)', 'rgb(233, 7, 43)', 'rgb(153, 217, 217)'],]
}
//function to get API and store team info
function getTeam() {

   //finds individual team data for entered team
   userTeam = (document.querySelector('#userTeam').value).toLowerCase();
   if (userTeam === "") {
      alert('Please enter NHL team');
   } else if (getSelectedTeamData(userTeam) == undefined) {
      alert("No team found. Enter another team");
   } else {
      getRoster(getSelectedTeamData(userTeam))
   }
}

function getSelectedTeamData(teamName) {
   return teamData.find(t => t.name.toLowerCase().includes(teamName));
}

function getRoster(teamObj) {
   fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamObj.id}/roster`)
      .then(res => res.json())
      .then(data => {
         teamObj.roster = data.roster;
         displayInfo(teamObj);
      })
      .catch(err => {
         console.log(`error ${err}`);
      })
}

function displayInfo(teamObj) {
   clearPage();

   containerLists = document.querySelectorAll('.holderList');
   let listElements;

   document.querySelector('#team').innerHTML = teamObj.name;
   document.querySelector('#conference').innerHTML = `${teamObj.conference} conference`;
   document.querySelector('#division').innerHTML = `${teamObj.division} division`;

   let nameList = document.getElementById('playerNames');
   let positionList = document.getElementById('playerPositions');
   let jerseyList = document.getElementById('jerseyNumbers');

   //removes old team li's from DOM and adds hidden class to lists
   listElements = document.querySelectorAll('#playerNames li');
   listElements.forEach(player => nameList.removeChild(player));
   listElements = document.querySelectorAll('#playerPositions li');
   listElements.forEach(position => positionList.removeChild(position));
   listElements = document.querySelectorAll('#jerseyNumbers li');
   listElements.forEach(number => jerseyList.removeChild(number));
   containerLists.forEach((element) => element.classList.remove('hidden'));

   //storing every player and position from team into appropriate arrays
   teamRoster = teamObj.roster;
   teamRoster.forEach(player => {
      playerArr.push(player.person.fullName);
      positionArr.push(player.position.name);
      jerseyArr.push(player.jerseyNumber)
   });

   //puts each element of the arrays into an li for the appropriate list
   fillLists(jerseyArr, jerseyList);
   fillLists(playerArr, nameList);
   fillLists(positionArr, positionList);

   styleBackground(teamObj.id);
}

function fillLists(arr, list) {
   arr.forEach((a) => {
      let li = document.createElement('li');
      li.textContent = a;
      list.appendChild(li);
      listOfLis.push(li);
   });
}

function styleBackground(id) {
   let color;
   for (let i = 0; i < teamColors.length; i++) {
      if (teamColors[i][0] === id) {
         document.querySelector('.playerInfo').style.background = teamColors[i][1];
         document.querySelector('.playerInfo').style.border = `.75rem solid ${teamColors[i][2]}`;
         document.querySelector('.playerInfo').style.color = teamColors[i][3];
         color = teamColors[i][3];
         break;
      }
   }

   listOfLis.forEach(a => a.style.borderBottom = `1px solid ${color}`);
}

function clearPage() {
   playerArr = [];
   positionArr = [];
   jerseyArr = [];
   userTeam = '';
}
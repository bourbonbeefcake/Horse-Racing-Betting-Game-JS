////////////  Date: 2017    ///////////////
////////////  Author: Triantafyllidis Antonios    ///////////////




document.addEventListener('DOMContentLoaded', myLoadFunction);

////////////////////////////////////////////////////////////
////////////                               ////////////////
////////////  OBJECT CREATION AREA START   ///////////////
///////////                               ///////////////
/////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
// HORSE OBJECT (WITH CONSTRUCTOR), WILL BE USED FOR THE MANIPULATION OF HORSE RELATED INFORMATION //
////////////////////////////////////////////////////////////////////////////////////////////////////
function Horse(horseID, direction)
{
  this.horseID = document.getElementById(horseID);
  this.direction = direction;
  this.speed = Math.round(produceRandomNum(10,18));
  this.shouldRun = true;
  this.shouldWalk = false;
  this.finished = false;
  this.roundsDid = 0;
  this.permToCompleteRound = false; //permission to complete the round. True only when the horse passes a checkpoint
  this.hasARank = false; //flag that will be set to true when the horse gets a position on the "Results" table
  this.odds = null;
  ///////// VAR CONCERNING BOOST ///////////////////////
  this.boostChance = Math.round(produceRandomNum(10,50));
  ///////// GETTERS ///////////////////////////////////
  this.getHorseID = getHorseID;
  this.getDirection = getDirection;
  this.getSpeed = getSpeed;
  this.getPosLeft = getPosLeft;
  this.getPosTop = getPosTop;
  this.getRoundsDid = getRoundsDid;
  this.getBoostChance = getBoostChance;
  this.getOdds = getOdds;
  //////// SETTERS /////////////////////////////////
  this.setID = setID;
  this.setDirection = setDirection;
  this.setSpeed = setSpeed;
  this.setBoostChance = setBoostChance;
  this.setOdds = setOdds;
  ///////////// FUNCTIONALITIES //////////////
  this.changeClass = changeClass;
  this.run = run;
  this.assistantController = assistantController;
  this.increaseRoundsDid = increaseRoundsDid;
  this.setShouldRun = setShouldRun;
  this.setShouldWalk = setShouldWalk;
  this.produceRandomNum = produceRandomNum;
  this.shouldBoost = shouldBoost;
  this.giveBoost = giveBoost;
  this.passedTheLine = passedTheLine;
  this.checkForRank = checkForRank;
  this.alterOdds = alterOdds;
  this.bstChanceToOdds = bstChanceToOdds;
}

////////////////////////////////////////////////////////////
///////////////                        ////////////////////
///////////////   HORSE METHODS START  /////////////////////
///////////////                      //////////////////////
///////////////////////////////////////////////////////////

///////////// HORSE GETTERS START//////////////
function getDirection()
{
  return this.direction;
}

function getSpeed()
{
  return this.speed;
}

function getHorseID()
{
  return this.horseID;
}
function getPosLeft()
{
  return this.horseID.offsetLeft;
}
function getPosTop()
{
  return this.horseID.offsetTop;
}
function getRoundsDid()
{
  return this.roundsDid;
}

function getBoostChance()
{
  return this.boostChance;
}

function getOdds()
{
  return this.odds;
}
///////////// HORSE  GETTERS STOP//////////////

///////////// HORSE  SETTERS START//////////////
function setDirection(dir)
{
  this.direction = dir;
}

function enableBoost(en)
{
  this.boost = en;
}

function setSpeed(sp)
{
  this.speed = sp;
}

function setID(id)
{
  this.horseID = id;
}
function setShouldRun(shouldIt)
{
  this.shouldRun = shouldIt;
}
function setShouldWalk(shouldIt)
{
  this.shouldWalk = shouldIt;
}
function setBoostChance(num)
{
  this.boostChance = num;
}

function setOdds(odds)
{
  this.odds = odds;
}
///////////// HORSE  SETTERS END//////////////

///////////// HORSE FUNCTIONALITY METHODS START//////////////
function changeClass(cls)
{
  this.horseID.className = cls;
}

function increaseRoundsDid()
{
  this.roundsDid++;
}

function produceRandomNum(min,max)
{
  //custom function that returns a random value from min value to max value
  return Math.random() * (max - min) + min;
}

function alterOdds(rank,alteration)
{
  if(this.odds <= Math.abs(alteration) && this.odds >= 1 && (rank ===1 || rank === 2))
  {
    this.odds = 1;
  }else
  {
    this.odds += alteration;
  }
}

function bstChanceToOdds()
{
  //assigns odds to a horse based on the boostChance it has
  //  CHANCE (%)     ODDS
  //  10 - 20      16 - 21
  //  20 - 30      11 - 16
  //  30 - 40       6 - 11
  //  40 - 50       1 - 6
  var bstChance = this.getBoostChance(); //chances (%) that the horse has to get a boost
  var odds = 21;
  for(var i = 10; i <= 40; i += 10)
  {
    odds -= 5;
    if(bstChance >= i && bstChance <= (i+10))
    {
      this.setOdds(Math.round(this.produceRandomNum((odds),(odds + 5))));
    }
  }

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function run(rounds) //MAIN FUNCTION OF HORSE object. property of Horse object, used by gameBegins()
{
  //this function checks the whole movement of the horse including:
  //when/how to move, when to turn, how to turn randomly on turns,  when to boost, when to change animation, when to reduce speed, when to finish
  if(this.shouldRun) //if shouldRun is true check the following
  {
    this.assistantController(rounds); //check if it passes the finishing line
    switch (this.direction) { //check the direction it has
      case 'RIGHT':
      if(this.getPosLeft() > (this.produceRandomNum(72,80) / 100 * window.innerWidth))//generate a random number from 72% to 80% of the window width
      {                                                                               //if horse's position from the left is bigger than the random number generated...
      this.changeClass("horse runDown"); //make the graphic turn to the bottom
      this.setDirection('DOWN'); //set its direction to 'DOWN'
      this.giveBoost();
    }
    else
    {
      this.changeClass("horse runRight"); //make the graphic turn to the right...
      this.horseID.style.left = this.getPosLeft() + this.getSpeed() + 'px'; //and continue moving to the right (futher away from the left side of the window)
    }
    break;
    case 'DOWN':
    if(this.getPosTop() > (this.produceRandomNum(67,80) / 100 * window.innerHeight))//generate a random number from 67% to 80% of the window height
    {                                                                                //if horse's position from the top is bigger than the random number generated...
    this.changeClass("horse runLeft"); //make the graphic turn to the left
    this.setDirection('LEFT'); //set its direction to 'LEFT'
    this.giveBoost();
  }else
  {
    this.changeClass("horse runDown"); //make the graphic turn to the bottom...
    this.horseID.style.top = this.getPosTop() + this.getSpeed() + 'px'; //and continue moving to the bottom (futher away from the top side of the window)
  }
  break;
  case 'LEFT':
  if(this.getPosLeft() < (this.produceRandomNum(4,12) / 100 * window.innerWidth)) //generate a random number from 4% to 12% of the window window width
  {                                                                                //if horse's position from the left is smaller than the random number generated...
  this.changeClass("horse runUp"); //make the graphic turn to the top
  this.setDirection('UP'); //set its direction to 'UP'
  this.giveBoost();
}else
{
  this.changeClass("horse runLeft"); //make the graphic turn to the left...
  this.horseID.style.left = this.getPosLeft() - this.getSpeed() + 'px'; //...and continue moving to the left (closer to the left side of the window)
}
break;
case 'UP':
if(this.getPosTop() < (this.produceRandomNum(6,17) / 100 * window.innerHeight)) //generate a random number from 6% to 17% of the window height
{                                                                                //if horse's position from the top is smaller than the random number generated...
this.changeClass("horse runRight"); //make the graphic turn to the right
this.setDirection('RIGHT'); //set its direction to 'RIGHT'
this.giveBoost();
this.permToCompleteRound = true; //set this flag to true. Means that the horse has passed the checkpoint
}else
{
  this.changeClass("horse runUp"); //make the graphic turn to the top...
  this.horseID.style.top = this.getPosTop() - this.getSpeed() + 'px'; //...and continue moving to the top (closer to the top side of the window)
}
break;
}
}else if(this.shouldWalk)
{
  this.assistantController(rounds);
  this.setSpeed(Math.round(this.getSpeed())); //making sure that the speed will be an integer otherwise there is a big possibility that the horses to keep subtracting value of speed from speed and move backwards outside of the window.
  this.setSpeed(this.getSpeed() - 1); //slowing down...
  this.horseID.style.left = this.getPosLeft() + this.getSpeed() + 'px';
}else
{
  this.changeClass("horse standRight");
  this.finished = true; //horse has finished the race

}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function assistantController(roundsRequired) //property of Horse Object, used by Horse.run()
{
  //this function assists Horse.run(). It checks when the horse has reached different stages during its run
  //like if it finished a round, or if all the rounds are finished, or to slow it down to 0 when all the rounds are done, or to give it a rank when it is finished.
  if(this.passedTheLine() && this.permToCompleteRound) //check if horse passes the finish line and if it passed the checkpoint
  {
    this.permToCompleteRound = false; //set this flag to false
    Output.decreaseRoundsLeft(this.getRoundsDid()); //display on the screen that there are roundsSet - 1 left
    this.increaseRoundsDid(); //then increase the number of rounds it did by 1
  }
  if(this.getRoundsDid() == roundsRequired) //check if the rounds the horse did are equal to the number of rounds set by the user
  {
    this.setShouldRun(false); //then set variable shouldRun to false (this affects the if statement in run() function)
    this.setShouldWalk(true); //then set variable shouldWalk to true (this affects the if statement in run() function)
    if(!this.hasARank) this.checkForRank(); //check for rank if this horse doesn't have any

  }
  if(this.getSpeed() < 0) //check when the speed will reach 0
  {
    this.setShouldWalk(false); //then set the varable shouldWalk to false (this affects the if statement in run() function)
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function passedTheLine() //property of Horse Object, used by Horse.assistantController(arg)
{
  //this function returns true, when a horse passes the finishing line
  var linePos = document.getElementById("startline").getBoundingClientRect();

  if(this.getPosLeft() > linePos.left  && this.getPosTop() <  linePos.bottom)
  {
    return true;
  }
  return false;
}

function checkForRank() //property of Horse Object. Used by Horse.assistantController(arg)
{
  //checks the indexes of  "positions" array and the "odds" array in Output Object whenever it is invoked.
  //it will assign the ID of the horse that invoked it, in order and then it will invoke updateList() method that exists too in Output object
  //every horse can invoke it only once.
  var ranks = Output.getPositionTable();
  var odds = Output.getOddsTable();
  if(ranks[0] === null)
  {
    ranks[0] = this.getHorseID().id;
    odds[0] = this.odds;
    Output.winningHorseOutput(this.getHorseID().id);
    this.alterOdds(1,-10);
    odds[0] = this.odds;
    this.hasARank = true;
    Output.updateList(ranks,odds);

  }
  else if(ranks[1] === null){ranks[1] = this.getHorseID().id;this.hasARank = true; this.alterOdds(2,-5);odds[1] = this.odds; Output.updateList(ranks,odds); }
  else if(ranks[2] === null){ranks[2] = this.getHorseID().id;this.hasARank = true; this.alterOdds(3,+5); odds[2] = this.odds; Output.updateList(ranks,odds); }
  else if(ranks[3] === null){ranks[3] = this.getHorseID().id;this.hasARank = true; this.alterOdds(4,+10); odds[3] = this.odds; Output.updateList(ranks,odds); }
}


function giveBoost() //property of Horse Object. Used by Horse.run(arg)
{
  //checks if the horse has "qualified" for a boost (depending on the result of shouldBoost())
  //if true it assigns a random number from the range of 10 to 20 to Horse.speed
  if(this.shouldBoost()) //invoke shouldBoost() function and if it returns true then...
  {
    this.setSpeed(Math.round(this.produceRandomNum(15,21))); //get a new speed for the horse. Doesn't nessesarily mean that the speed will be higher than the current speed
  }else
  {
    this.setSpeed(Math.round(this.produceRandomNum(10,18)));
  }
}

function shouldBoost() //property of Horse Object. Used by Horse.giveBoost()
{
  //calculates if  a horse will get a boost or not, based on the Horse.boostChance
  var randomNum = this.produceRandomNum(0,100);
  if(randomNum < this.boostChance) //example: boostChance = 43. The horse has 43% chances to get a boost.
  {
    this.setBoostChance(this.getBoostChance() - 4); //everytime the horse gets a boost, the possibility of getting more is reduced. (it gets tired!)
    return true;
  }else
  {
    return false;
  }
}

///////////// HORSE FUNCTIONALITY METHODS END//////////////

////////////////////////////////////////////////////////////
///////////////                        ////////////////////
///////////////   HORSE METHODS END  /////////////////////
///////////////                      //////////////////////
///////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////
// Input OBJECT WILL STORE USER INPUT RELATED INFORMATION //
////////////////////////////////////////////////////////////
var Input = {
  bets: null,
  rounds: null,
  horseChosen: null,
  positionsInitialTable: ["horse1","horse2","horse3","horse4"],
  oddsInitialTable: [null,null,null,null],

  checkForNullOdds: function()
  {
    for(var i = 0; i <= this.oddsInitialTable.length;i++)
    {
      if(this.oddsInitialTable[i] === null)
      {
        return true;
      }else
      {
        return false;
      }
    }
  },

  retakeOdds: function(hrs1Odds,hrs2Odds,hrs3Odds,hrs4Odds)
  {
    var oddsTable = Input.getOddsInitialTable();
    oddsTable[0] = hrs1Odds;
    oddsTable[1] = hrs2Odds;
    oddsTable[2] = hrs3Odds;
    oddsTable[3] = hrs4Odds;
  },
  //////// INPUT GETTERS/SETTERS START ////////////
  getHorseChosen : function(){return this.horseChosen;},
  getRounds : function(){return this.rounds;},
  getBets : function(){return this.bets;},
  getOddsInitialTable: function(){return this.oddsInitialTable;},
  getPositionInitialTable: function(){return this.positionsInitialTable;},

  setBets : function(bet){this.bets = bet;},
  setRounds : function(round){this.rounds = round;},
  setHorseChosen : function(hc){this.horseChosen = hc;},
  setHorseWon : function(id){this.horseWon = id;},
    //////// INPUT GETTERS/SETTERS END ////////////
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Output OBJECT THAT CONTAINS FUNCTIONS AND A LIST VITAL FOR THE OUTPUT OF THE RESULTS AT THE END OF THE RACE  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Output = {

  positions: [null, null, null, null],
  oddsTable: [0, 0, 0, 0],

  decreaseRoundsLeft: function(horseRoundsDid) //property of Output object, used by Horse.assistantController(arg)
  {
    //displays the rounds left on the screen
    //this function will calculate if the difference between rounds set by the user and rounds that the horse did.
    //if the difference is bigger or equal than rounds left, then it will subtract 1 from rounds left.
    //all this calculating to prevent any other horse mess with the counter and allow only the first horse that passes the finishing line per round, affect this counter.
    var roundsLeft = document.getElementById('roundsLeft').innerHTML;
    var roundsSet = Input.getRounds();
    if(roundsLeft >= (roundsSet - horseRoundsDid) )
    {
      roundsLeft = roundsLeft - 1;
      document.getElementById('roundsLeft').innerHTML = roundsLeft;
    }
  },

  nullifyPositionTable: function() //property of Output object, used by gameEnds()
  {
    //assigns null values to each index of Output.positions[] array
    var positions =  Output.getPositionTable();
    var odds = Output.getOddsTable();
    for(var i = 0;i < positions.length; i++)
    {
      positions[i] = null;
      odds[i] = 0;
    }
  },


  winningHorseOutput: function(horseWon) //property of Output object, used by Horse.checkForRank()
  {
    //function that gets which horse won as a parameter, and compares it with the variable from Input object.
    //if the user chose the horse that won, then with the appropriate colors, it will give feedback to the user.
    var oddsTable = Output.getOddsTable();

    if(horseWon == Input.getHorseChosen())
    {
      var earnings = Input.getBets() * oddsTable[0]; //only checking the odds of the first horse.
      var money = document.getElementById('funds').innerHTML;
      document.getElementById('console').className = "colorOfVictory";
      document.getElementById('console').innerHTML  = "You won £ " + earnings + " from that clever bet!";
      document.getElementById('funds').innerHTML = earnings + parseFloat(money);
    }
    else
    {
      document.getElementById('console').className = "colorOfLoss";
      document.getElementById('console').innerHTML  = "Your horse didn't make it. Better luck next time!";
    }
  },


  updateList: function(positions,oddsTable) //property of Output object, used by run() AND Horse.checkForRank()
  {
    //this function will update the Results table's standard cells, based on what Output.positions[] and Output.oddsTable[] arrays contain
    //by default, Output.positions[] and Output.oddsTable[] indexes contain nulls
    var tableResults = document.getElementById('results');
    var positionsFromDoc = tableResults.getElementsByTagName('td');

    positionsFromDoc[1].className = positions[0];
    positionsFromDoc[4].className = positions[1];
    positionsFromDoc[7].className = positions[2];
    positionsFromDoc[10].className = positions[3];

    positionsFromDoc[2].innerHTML = "1:" + oddsTable[0];
    positionsFromDoc[5].innerHTML = "1:" + oddsTable[1];
    positionsFromDoc[8].innerHTML = "1:" + oddsTable[2];
    positionsFromDoc[11].innerHTML = "1:" + oddsTable[3];
  },
  //////// OUTPUT GETTERS/SETTERS START ////////////
  getHorseWon: function(){return this.horseWon;},
  getEarnings: function(){return this.earnings;},
  getPositionTable: function(){return this.positions;},
  getOddsTable: function(){return this.oddsTable;},

  setHorseWon: function(horseName){this.horseWon = horseName;},
  setEarnings: function(profit){this.earnings = profit;},
  //////// OUTPUT GETTERS/SETTERS END ////////////
};

////////////////////////////////////////////////////////////
////////////                               ////////////////
////////////  OBJECT CREATION AREA END     ///////////////
///////////                               ///////////////
/////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
////////////                                                   ///////////////
////////////  INPUT CHECKING AND GUI RELATED FUNCTIONS START  ///////////////
///////////                                                  ////////////////
////////////////////////////////////////////////////////////////////////////

function enableStartButton(mode) //used by gameEnds()
{
  //this function will get one parameter and depending on it, it will modify the start button.
  //1 for button in race start mode, 2 for button in  repositioning mode
  //orange color is used by repositioning mode, and the listener will invoke allowReposition() function
  //blue color is the vanila, and its used by start race mode. The listener will invoke gameBegins() function; the main function of the script
  var start = document.getElementById('start');
  start.style.cursor = "pointer";
  start.style.color = "#ffffff";
  start.onmouseover = function(){this.style.color = "#000";};
  start.onmouseout = function(){this.style.color = "#ffffff";};
  if(mode == 1)
  {
    start.style.background = "-webkit-linear-gradient(top, #3498db, #2980b9)";
    start.style.background = "-moz-linear-gradient(top, #3498db, #2980b9)";
    start.style.background = "-ms-linear-gradient(top, #3498db, #2980b9)";
    start.style.background = "-o-linear-gradient(top, #3498db, #2980b9)";
    start.style.background = "linear-gradient(to bottom, #3498db, #2980b9)";
    start.removeEventListener('click',allowReposition);
    start.addEventListener('click',gameBegins);
    start.style.backgroundColor = "#3498db";
  }else if(mode == 2)
  {
    start.style.background = "-webkit-linear-gradient(top, #ffa500, #ffae19)";
    start.style.background = "-moz-linear-gradient(top, #ffa500, #ffae19)";
    start.style.background = "-ms-linear-gradient(top, #ffa500, #ffae19)";
    start.style.background = "-o-linear-gradient(top, #ffa500, #ffae19)";
    start.style.background = "linear-gradient(to bottom, #ffa500, #ffae19)";
    start.addEventListener('click',allowReposition);
    start.style.backgroundColor = "#ffa500";
  }
}

function allowReposition() //used by enableStartButton(arg)
//this function will reposition the horses to the starting point before the race can be started again
//it updates the list on the screen getting feedback from the list in the Input object
//it also invokes enableStartButton(mode) function, giving mode of value 1
{
  document.getElementById('horse1').style.top = 4 + 'vh';
  document.getElementById('horse1').style.left = 20 + 'vw';
  document.getElementById('horse2').style.top = 8 + 'vh';
  document.getElementById('horse2').style.left = 20 + 'vw';
  document.getElementById('horse3').style.top = 12 + 'vh';
  document.getElementById('horse3').style.left = 20 + 'vw';
  document.getElementById('horse4').style.top = 16 + 'vh';
  document.getElementById('horse4').style.left = 20 + 'vw';
  Output.updateList(Input.getPositionInitialTable(),Input.getOddsInitialTable());
  enableStartButton(1);
}

///////////////////////////////////////////////////
function disableStartButton() //used by gameBegins()
{
  // this function changes the color of the button, its behavior,  and removes the listener from it.
  var start = document.getElementById('start');
  start.style.backgroundColor = "#808080";
  start.style.color = "#808080";
  start.style.backgroundImage = "none";
  start.style.cursor = "default";
  start.onmouseover = function(){};
  start.onmouseout = function(){};
  start.removeEventListener('click',gameBegins);
}

function disableTextFields(bool) //used by gameEnds() AND gameBegins()
{
  //this function will disable the text boxes and the list if bool is true and will enable them if it is false
  var getRounds = document.getElementById('roundsGiven');
  var betsMoney = document.getElementById('amount');
  var list = document.getElementById('bethorse');
  if(bool === 0)
  {
    getRounds.disabled = true;
    betsMoney.disabled = true;
    list.disabled = true;
  }else
  {
    getRounds.disabled = false;
    betsMoney.disabled = false;
    list.disabled = false;
  }
}

///////////////////////////////////////////////////
function finalizeRounds() //used by gameBegins()
{
  //this function will check the input of the user for rounds given.
  //If the input is validated, then it keeps the value in the Input object and will return true
  //if not, then the input field will have a red shadow around it and this function will return false
  var boxForRounds = document.getElementById('roundsGiven');
  var getRounds = boxForRounds.value;
  //getRounds = Number(getRounds);
  var roundsApproved = testTheInput(getRounds,0);
  if(roundsApproved)
  {
    Input.setRounds(parseInt(getRounds));
    boxForRounds.style.boxShadow="";
    return true;
  }else
  {
    boxForRounds.style.boxShadow = "0px 0px 3px 1px #FF0000"; // make the shadow around it red
    return false;
  }
}


///////////////////////////////////////////////////
function finalizeBets() //used by gameBegins()
{
  //this function will check the input of the user for bets given and horse chosen.
  //If the input is validated, then it keeps the values in the Input object and will return true
  //if not, then the input field will have a red shadow around it and this function will return false
  var hasMoney = document.getElementById('funds').innerHTML;
  var betBox = document.getElementById('amount');
  var betsMoney = betBox.value;
  var list = document.getElementById('bethorse');
  var betsOnHorse = list.options[list.selectedIndex].value;

  var betsApproved = testTheInput(betsMoney,hasMoney);
  if(betsApproved)
  {
    Input.setBets(betsMoney);
    Input.setHorseChosen(betsOnHorse);
    betBox.style.boxShadow="";
    return true;
  }else
  {
    betBox.style.boxShadow = "0px 0px 3px 1px #FF0000"; // make the shadow around it red
    return false;
  }
}

///////////////////////////////////////////////////
function testTheInput(input,input2) //input2 should always be smaller than input1. If input2 is 0, it won't be tested
{
  //used by finalizeBets() AND finalizeRounds()
  //this function is responsible for the error handling
  //it tests different inputs and displays a message if the input is problematic
  document.getElementById('console').className = "colorOfError";
  var approved = true;
  var error;
  try
  {
    //checking how betsMoney can be used wrong as a character
    if(input === "") throw "Cannot be empty";
    if(isNaN(input)) throw "Must be a number";
    input = Number(input);
    //checking how betsMoney can be used wrong as a number
    if(input === 0) throw "Must have a value";
    if(input < 0) throw "Cannot be negative";


    if(input2 !== 0)
    {
      if(input > input2) throw "Lack of funds!";
    }else if(input2 === 0)
    {
      if(input > 30) throw "Horses will die beyond that";
    }
  }
  catch(err)
  {
    document.getElementById('console').innerHTML = err;
    approved = false;
    error = err;
  }
  finally
  {
    if(approved)
    {
      document.getElementById('console').className = "";
      document.getElementById('console').innerHTML = "";
      return true;
    }else
    {
      document.getElementById('console').innerHTML = error;
      return false;
    }
  }
}


///////////////////////////////////////////////////////////////////////////////
////////////                                                   ///////////////
////////////  INPUT CHECKING AND GUI RELATED FUNCTIONS END    ////////////////
///////////                                                  ////////////////
////////////////////////////////////////////////////////////////////////////



function myLoadFunction() //main
{
  //once the page loads this function gets invoked and its only use is to add listeners to the Start Button, and the two input fields
  var start = document.getElementById('start');
  var getRounds = document.getElementById('roundsGiven');
  var betsMoney = document.getElementById('amount');

  start.addEventListener('click',gameBegins);
  getRounds.addEventListener('keyup',finalizeRounds);
  betsMoney.addEventListener('keyup',finalizeBets);

}


function gameBegins()
{
  //To go in here, it means that the user pressed the Start Race button

  //So the input on rounds and bets must be re-checked. Game cannot start if the input is not validted.
  var roundsApproved = finalizeRounds();
  var betsApproved = finalizeBets();

  //4 instances of horse all into an array. That's to reduce code duplication
  var allHorses = [];
  allHorses[1] =  new Horse('horse1','RIGHT');
  allHorses[2] =  new Horse('horse2','RIGHT');
  allHorses[3] =  new Horse('horse3','RIGHT');
  allHorses[4] =  new Horse('horse4','RIGHT');

  //Depending on their boost chance, assign odds values to horses
  allHorses[1].bstChanceToOdds();
  allHorses[2].bstChanceToOdds();
  allHorses[3].bstChanceToOdds();
  allHorses[4].bstChanceToOdds();

  //Check if even one index in the list that keeps values for odds in Input object, contains null value
  //if true, get the value of odds of each horse and assign each to an index of the list
  //if false, assign to the variable "odds" of each horse, the value that each index of the list contains
  if(Input.checkForNullOdds())
  {
    Input.oddsInitialTable[0] = allHorses[1].getOdds();
    Input.oddsInitialTable[1] = allHorses[2].getOdds();
    Input.oddsInitialTable[2] = allHorses[3].getOdds();
    Input.oddsInitialTable[3] = allHorses[4].getOdds();

  }else
  {
    allHorses[1].setOdds(Input.oddsInitialTable[0]);
    allHorses[2].setOdds(Input.oddsInitialTable[1]);
    allHorses[3].setOdds(Input.oddsInitialTable[2]);
    allHorses[4].setOdds(Input.oddsInitialTable[3]);
  }

  //Check if the input of the user was validated, both for the rounds and the bets
  if(roundsApproved && betsApproved)
  {
    //if approved, update the user's money and how many rounds are left
    //disable start button and text fields
    //update the list of odds
    //start the interval

    var hasMoney = document.getElementById('funds').innerHTML;
    document.getElementById('funds').innerHTML = hasMoney - Input.getBets();

    var roundsToDo = Input.getRounds();
    document.getElementById('roundsLeft').innerHTML = roundsToDo;

    disableStartButton();
    disableTextFields(0);
    Output.updateList(Input.getPositionInitialTable(),Input.getOddsInitialTable());
    interval1 = setInterval(function()
    {
      if(!allHorses[1].finished || !allHorses[2].finished || !allHorses[3].finished || !allHorses[4].finished)
      {
        // even if one horse didn't finished its rounds, the race keeps going until it does
        for(var i = 1; i<5;i++)
        {
          allHorses[i].run(roundsToDo); //invoke each horse's main function
        }
      }else
      {
        //when all horse have finished the race, update the odds depending on the position that they finished
        Input.retakeOdds(allHorses[1].getOdds(),allHorses[2].getOdds(),allHorses[3].getOdds(),allHorses[4].getOdds());
        gameEnds();
      }
    },100);
  }
}

function gameEnds()
{
  //this function is used when a race is over.It clears the interval,sets the start race button in the state of reposition, (orange), enables the text fields again,
  //and it assigns null values to all indexes of the the position table in Ouput object
  clearInterval(interval1);
  enableStartButton(2);
  disableTextFields(1);
  Output.nullifyPositionTable();
}

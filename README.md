# Horse Racing/Betting Game JS
The task that is given in this BSc first year - second semester assignment, is to build the logic of a web based horse race/betting game with JavaScript.
<br><br>
![](https://github.com/antoniosTriant/Horse-Racing-Betting-Game-JS/blob/master/documentation/images/Screenshot_1.jpg)
<br><br>
## Design

***

The game is designed to be as pseudorandom as possible.  There are many factors that affect the outcome of the race and the unpredictability of it. 
<br><br>
Horses start at  random speed. They turn on different coordinates according always to the designated turns, and their speed might get a boost. 
<br><br>
Every time a horse takes a turn, a percentage is used to decide whether this horse will increase its speed or not. If it does get a speed boost, this percentage is reduced, if not it stays intact.  
<br><br>
For each horse there are odds generated based on how often the horse can get a boost. The chance for a horse to win is measured with its ability to speed up and overtake the other horses on every turn. 

## Development

***

OOP architecture, three objects were used: Input, Horse and Output.
<br>
Input handles initialization, Horse handles anything relating to the control of the horse and Output handles update and display of results.
<br><br>
## Horse Movement
Knowing 0,0 are the top left coordinates of the window, by `window.innerWidth `, `window.innerHeight` and with a bit trial-and-error, the size of the track is known, `offsetLeft `and `offsetTop `are used to get the position of each horse.
<br><br>
**Speed**: 10-18 (random range at the begining of the race)
**Direction**: RIGHT, LEFT, UP, DOWN (defined as string, Changing CSS class depending on direction)
<br><br>
## Boost and Tiredness
**Boost chance**: 10 -50 (random range defined at horse object creation) <br>
When a horse takes a turn, `giveBoost()` function is invoked which in turn invokes the `shouldBoost()` function. `shouldBoost()` function finds a number from 0 to 100; if that number is smaller than the boost chance, then the horse gets a boost. Note that getting a boost has a small possibility to reduce speed instead of increasing it. When a horse gets a boost, its boost chance is decreased by 4.<br>
The horse gets a new speed if not getting a boost from 10 to 18 and from 15 to 21 if it gets a boost. Flowchart below:
<br><br>
![](https://github.com/antoniosTriant/Horse-Racing-Betting-Game-JS/blob/master/documentation/images/flowchartBoosting.png)
<br><br>
## Horse Odds

Odds on the first race after the page is refreshed are generated based on the boost chance of each horse as shown in the following table:
<br><br>

| **BOOST CHANCE (%)** | **ODDS** |
| --- | --- |
| 10 - 20 | 16-21 |
| 20-30 | 11-16 |
| 30-40 | 6-11 |
| 40-50 | 1-6 |

<br><br>
From the second race after page refresh and every other, only the result of the horse is taken in account for odds update. On the table below, it is shown how odds are affected after a horse finishes a race:
<br><br>

| **POSITION** | **ODD ALTERATION** |
| --- | --- |
| 1ST | -10 |
| 2ND | -5 |
| 3RD | +5 |
| 4TH | +10 |

<br><br>
Odds can never fall under 1. If a horse has, for example, 5 odds and wins the race, its odds will become 1.
<br><br>
Odds of a horse update whenever a horse finishes a race.
<br><br>
Problem with odds, is that they could be available to the user as soon as the page is refreshed but they are not. This was not considered in the initial design so a fix was not implemented. 
<br><br>

## Known Bugs
1. Odds are not showing up when the user refreshes the page but when the first race begins.
2. Odds only take in account the outcome of each race. (Except the first race)

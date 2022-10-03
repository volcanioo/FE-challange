# Tech Assigment
Thank you so much for for the oppurtunity! I really enjoyed working on this small app.


<hr>

* [How to run?](#how-to-run)
* [Video](#take-a-look)
* [Requirements](#challenge-description)
* [My Thought Process](#my-thought-process)
    * You can also check my new PR called "Further Improvements" https://github.com/volcanioo/fe-challange/pull/1 to see what do I think can be improved at first glance.

<hr>

Now, I am super looking forward to hearing from you to get more ideas of how I could improve this;
* You can [create a new issue](https://github.com/volcanioo/fe-challange/issues/new) and share your ideas & feedback with me.
* You can text me on [Linkedin](https://www.linkedin.com/in/volkandeveci/). I am always happy to hear from you.

## How to run
```sh
npm install
```

Once all the packages are installed then run:

```sh
npm run start
```

Navigate to http://localhost:8080 to see the application running.

A server will also start on http://localhost:8000

## Challenge Description
- [x] For this you must display each of the players on the page.
- [x] Each player takes a turn rolling by clicking a button. The points per roll will be minimum 1 point & maximum 6 points.
- [x] Player 1 goes first then Player 2 etc. and once the last player has rolled, return back to player 1.
- [x] Each player continues to roll until a player scores equal to or higher than the `scoreToWin`. This player wins the match.
- [x] When a player wins the match, post the `winnerId` and `gameId` to the specified endpoint successfully. Display a congratulatory message in any way you see fit.
- [x] Layout the page as per the mockup. Please see the [mockup here](./mockup.png)
- [x] Only the current player can roll, represented visually as well as functionally
- [x] The winning player should be represented visually
- [x] Display a winning message in away you see fit
- [x] The players should not be able to continue rolling once the game has ended.

## Take a look

https://user-images.githubusercontent.com/14016028/193445842-98c10f75-c364-4533-8bcb-e9f857a90695.mov

## My Thought Process
1. I dug dive into the mockup first and tried to understand the requirements. I decided what structure HTML will be at this phase. 
2. I created a simple design that will match our needs.
    1. There are some elements in the implm. that are not mentioned in the mockup, so I decided to add them to make the app more user friendly. (last rolled dice, the positioning of header, etc.)
    2. I didn't spend so much time on colors, design, etc. I just wanted to make sure that I am following the requirements, but providing fancy animations would be awesome here- I also didn't spend so much time in doing animations as there was a time limit.
1. Development the logic of player switching at the dice rolling phase. (index.js:50-76)
      1. I included `scores` property to the player array we got from BE, so i can use this property to keep track of the scores of each player. 
      2. I created `playingPlayerIndex` variable so I can keep track of the current *playing* player. I use this variable mainly to switch the game to the next player.
      3. `rollDice` function generates a random number between 1-6 and adds it to the `scores` property of the current player. I avoid having the same rolled dice score twice. (index.js:78-84) I wanted to make sure that the player can't get stuck at the same score.
2. Development the logic that hide/show the rolling button in the `User` component
      1. The `isPlaying` property to the `User` component. This property is used to hide/show the rolling button.
      2. The `isWinner` property to the `User` component. This property is used to show the winner message.
      2. The `nextMoveFunc` property to the `User` component. This property is used to bind a function if there is an available next move that can be done by the player dependently on the condition of `playingPlayerIndex` in `index.js:98` -in that way, I can show/hide the rolling button at the player level.

Thank you so much for taking your time and trying to understand how I approached this challange. **Does these make sense for you?** I would love to hear your improvement ideas, thoughts and feedbacks. Please don't hesitate to approach me via [Linkedin](https://www.linkedin.com/in/volkandeveci/). I will be always happy to hear from you.

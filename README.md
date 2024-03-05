# TrainYourBrain

TrainYourBrain is a website where you can have fun and improve your analytical thinking by playing a couple of classic puzzle games.

The website is publicly hosted with Firebase and you can check it out here
[TrainYourBrain](https://trainyourbrain-c8e09.web.app/index.html).

This was my first frontend project ever, created with HTML, CSS and vanilla JS while having about two months of experience with them.

## Sudoku

The Sudoku grid was created by first making a simple HTML-table and then filling it with initial values fetched from a public API called [Dosuku](https://sudoku-api.vercel.app/).

You can choose between three difficulty levels: Easy, Medium and Hard. If you get stuck, you are able to get a hint by clicking the 'Get hint' button above the grid.
At any time you can also get a complete solution by clicking the 'Show solution' button. After filling the whole grid, you can check your answer by clicking 'Check'.
You can load a new Sudoku by choosing the desired difficulty level from the drop-down-menu and clicking 'Reload'.

The validation of the filled grid is done with an algorithm, ensuring that all possible correct solutions are taken into account and validated correctly.
The program keeps track of the number of hints given and displays it to the user once a correct solution is found and validated.

## Sliding puzzle

The sliding puzzle was made by creating button elements with JavaScript and appending them to the game board, which is a square shaped div element.
The board holds 16 squares, each one with a number from 1 to 15, except the 'last' square that is empty.

At the beginning of the game, the board is shuffled automatically by making random but valid moves 300-400 times.
The goal is to arrange the squares in correct order with the empty square being the last one.
You simply click on the square that you want to switch places with the empty one, and continue that until you get them arranged or decide to throw your phone/mouse to the wall.

The puzzle also includes a 'stop-watch' that starts each time the puzzle is shuffled and stops once the puzzle is solved correctly.
The time is displayed along with a message if the user manages to solve the puzzle.

## Puzzle 3

My original idea was to implement three different games, but unfortunately I had to abandon the idea of a third game for now due to the amount of time/work it would've taken.
I'll keep the option open in case I find the time and inspiration some time in the future.

Meanwhile you can enjoy the two games that are already available and ready to play.

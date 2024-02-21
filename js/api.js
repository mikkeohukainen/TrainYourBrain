export const fetchData = async (desiredDifficulty) => {
    try {
        let tries = 0;
        while (tries < 20) {
            const response = await fetch('https://sudoku-api.vercel.app/api/dosuku');
            const data = await response.json();
            const gridObj = data.newboard.grids[0];

            if (desiredDifficulty === 'Easy') desiredDifficulty = 'Medium'

            console.log(gridObj.difficulty);
            console.log(desiredDifficulty);

            if (gridObj.difficulty === desiredDifficulty) {
                return gridObj;
            }
            tries++;
        }
        console.log("Matching difficulty not found after several tries.");
    } 
    catch (error) {
        console.error("Error fetching data: ", error)
    }
}

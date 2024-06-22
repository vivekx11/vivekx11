document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game');
    const width = 8;
    const candyColors = ['red', 'yellow', 'orange', 'purple', 'green', 'blue'];
    let candies = [];

    // Create Board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const candy = document.createElement('div');
            candy.classList.add('candy');
            let randomColor = Math.floor(Math.random() * candyColors.length);
            candy.style.backgroundColor = candyColors[randomColor];
            candy.setAttribute('draggable', true);
            candy.setAttribute('id', i);
            game.appendChild(candy);
            candies.push(candy);
        }
    }
    createBoard();

    // Drag the Candy
    let colorBeingDragged;
    let colorBeingReplaced;
    let candyIdBeingDragged;
    let candyIdBeingReplaced;

    candies.forEach(candy => candy.addEventListener('dragstart', dragStart));
    candies.forEach(candy => candy.addEventListener('dragend', dragEnd));
    candies.forEach(candy => candy.addEventListener('dragover', dragOver));
    candies.forEach(candy => candy.addEventListener('dragenter', dragEnter));
    candies.forEach(candy => candy.addEventListener('dragleave', dragLeave));
    candies.forEach(candy => candy.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.style.backgroundColor;
        candyIdBeingDragged = parseInt(this.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {}

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundColor;
        candyIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        candies[candyIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

    function dragEnd() {
        let validMoves = [
            candyIdBeingDragged - 1,
            candyIdBeingDragged - width,
            candyIdBeingDragged + 1,
            candyIdBeingDragged + width
        ];

        let validMove = validMoves.includes(candyIdBeingReplaced);

        if (candyIdBeingReplaced && validMove) {
            candyIdBeingReplaced = null;
        } else if (candyIdBeingReplaced && !validMove) {
            candies[candyIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            candies[candyIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else {
            candies[candyIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }
    }

    // Check for matches
    function checkRowForThree() {
        for (let i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = candies[i].style.backgroundColor;
            const isBlank = candies[i].style.backgroundColor === '';

            if (rowOfThree.every(index => candies[index].style.backgroundColor === decidedColor && !isBlank)) {
                rowOfThree.forEach(index => {
                    candies[index].style.backgroundColor = '';
                });
            }
        }
    }

    function checkColumnForThree() {
        for (let i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let decidedColor = candies[i].style.backgroundColor;
            const isBlank = candies[i].style.backgroundColor === '';

            if (columnOfThree.every(index => candies[index].style.backgroundColor === decidedColor && !isBlank)) {
                columnOfThree.forEach(index => {
                    candies[index].style.backgroundColor = '';
                });
            }
        }
    }

    window.setInterval(function() {
        checkRowForThree();
        checkColumnForThree();
    }, 100);
});

script body
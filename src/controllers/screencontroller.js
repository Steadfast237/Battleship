import Gamecontroller from './gamecontroller';

class ScreenController {
  gameController = new Gamecontroller();
  log = document.querySelector('.log');
  playerContainer = document.querySelector('.real table tbody');
  opponentContainer = document.querySelector('.computer table tbody');

  constructor() {
    const [real, computer] = this.gameController.getPlayers();

    this.gameController.randomPlacement(real);
    this.gameController.randomPlacement(computer);

    this.generatePlayerBoardHtml(real, this.playerContainer);
    this.generatePlayerBoardHtml(computer, this.opponentContainer);

    this.opponentContainer.addEventListener('click', this.handleClick);
    this.updateScreenLog();
  }

  updateScreenLog = () => {
    if (this.gameController.isGameOver) {
      this.log.innerHTML = `GAME OVER! WINNER IS ${
        this.gameController.getActivePlayer().type
      } PLAYER`;
      return;
    }

    this.log.innerHTML = `${
      this.gameController.getActivePlayer().type === 'real' ? 'Your' : 'Pc'
    } Turn.`;
  };

  updateScreenBoard = () => {
    const player = this.gameController.opponentPlayer;
    const missedShots = player.gameboard.missedShots;
    const hits = player.gameboard.hits;

    missedShots.forEach((coord) => {
      const element = document.querySelector(
        `.${player.type} [data-coordinate="${coord}"]`
      );

      element.textContent = '';
      element.textContent = '✘';
    });

    hits.forEach((coord) => {
      const element = document.querySelector(
        `.${player.type} [data-coordinate="${coord}"]`
      );

      element.textContent = '';
      element.textContent = '🎯';
    });
  };

  generatePlayerBoardHtml = (player, element) => {
    let markup = '';

    if (player.type === 'real') {
    }

    // ${square.value === null ? '' : '.'}
    player.gameboard.board.forEach((row, rowIndex) => {
      markup += `
            <tr>
                <th scope="row">${rowIndex + 1}</th>`;

      row.forEach((square, colIndex) => {
        markup += `
            <td data-coordinate="${rowIndex}_${colIndex}">
            ${player.type === 'real' && square.value !== null ? '🛥' : ''}
            </td>
          `;
      });

      markup += '</tr>';
    });

    element.innerHTML = markup;
  };

  handleClick = (e) => {
    const target = e.target;
    const coordinate = target.dataset.coordinate;

    this.gameController.playRound(coordinate);
    this.updateScreenLog();
    this.updateScreenBoard();

    if (this.gameController.getActivePlayer().type === 'computer') {
      this.opponentContainer.removeEventListener('click', this.handleClick);
      this.computerTurn();
    }
  };

  computerTurn = () => {
    if (this.gameController.getActivePlayer().type === 'real') {
      this.opponentContainer.addEventListener('click', this.handleClick);
      return;
    }

    setTimeout(() => {
      this.gameController.playRound();
      this.updateScreenLog();
      this.updateScreenBoard();
      this.computerTurn();
    }, 500);
  };
}

export default ScreenController;

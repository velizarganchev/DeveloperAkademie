class HandleButtons {

    showEndScreenButtons() {
        document.getElementById('icons').style.display = 'none';
        document.getElementById('endscreen-panel').style.display = 'flex';
    }
    hideEndScreenButtons() {
        document.getElementById('icons').style.display = 'block';
        document.getElementById('endscreen-panel').style.display = 'none';
    }
}
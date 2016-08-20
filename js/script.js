var scores = [0, 0, 0, 0];

function toggleScores() {
	$('.scores').toggleClass('hide');
}

function setScore(team, score) {
	scores[team] = score;
	showScore(team);
	// setTimeout(hideScore(team), 3000);
}

function showScore(team) {
	$('#team' + team).css('height', scores[team] + 20 + 'px');
	$('#team' + team + ' span').text(scores[team]);
}

function hideScore(team) {
	$('#team' + team).css('height', scores[team] + 10 + 'px');
	$('#team' + team + ' span').fadeOut("slow");	
}

function incrementStack() {
	$('.cards').removeClass('transition correct incorrect');
	$('.cards .card')[0].remove();
}

function correct() {
	$('.cards').addClass('transition correct');
	setTimeout(incrementStack, 500);
}

function incorrect() {
	$('.cards').addClass('transition incorrect');
	setTimeout(incrementStack, 500);
}

$(document).ready(function() {
	$("#incorrect-btn").click(incorrect);
	$("#correct-btn").click(correct);
});
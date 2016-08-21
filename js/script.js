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
	dynamics.animate($('.cards .card')[0], {
		translateX : 100,
		translateY : 10,
		rotateZ: 5,
		opacity: 0
	}, {
		type: dynamics.easeOut,
		duration: 500,
		complete: incrementStack
	});
}

function incorrect() {
	$('.cards').addClass('transition incorrect');
	dynamics.animate($('.cards .card')[0], {
		translateX : -100,
		translateY : 10,
		rotateZ: -5,
		opacity: 0
	}, {
		type: dynamics.easeOut,
		duration: 500,
		complete: incrementStack
	});
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function fillStack(listOfWords) {
	listOfWords = shuffle(listOfWords).slice(0, 50);
	$.each(listOfWords, function(index, value) {
	  addCard(value);
	});
}

function addCard(word) {
	var colors = ['#f1c40f', '#e67e22', '#e74c3c', '#f39c12', '#d35400', '#c0392b'];
	var card = '<div class="card" style="background: ' + colors[Math.floor(Math.random()*colors.length)] + ';"><span class="word">' + word + '</span></div>';
	$('.cards').append(card);
}

$(document).ready(function() {
	fillStack(all);
	$("#incorrect-btn").click(incorrect);
	$("#correct-btn").click(correct);
});
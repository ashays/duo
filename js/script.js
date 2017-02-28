var teams = 4;
var scores = [0, 0, 0, 0];
var curTurn = -1;
var curTeam = function() { return curTurn % teams; }
var curRound = function() { return Math.floor(curTurn / curTeam); }
var roundPts = 0;

$(document).ready(function() {
	fillStack(all);
	$('#game-settings').show();
	$('#game-settings .small-btn').click(setupGame);
	$("#start_button").click(startLevel);
	$("#incorrect-btn").click(incorrect);
	$("#correct-btn").click(correct);
});

function setupGame(e) {
	var ele = e.target;
	var group = $(e.target).parents('.btn-group');
	$(group).children('.small-btn').removeClass('clicked');
	$(ele).addClass('clicked');
	teams = parseInt($(ele).text());
	for (var i = 0; i < teams; i++) {
		$('.scores').append('<div class="score team' + i + '"><span></span></div>');
	}
	setupTurn();
	transitionStatusScreen($('#game-settings'), $('#pass-device'));
}

function setupTurn() {
	toggleScoreBlocks();
	toggleScores();
	curTurn += 1;
	roundPts = 0;
	$('#teamTurn').removeClass("team0 team1 team2 team3").addClass("team" + curTeam()).text("Team " + (curTeam() + 1));
	setTimeout(highlightScore, 1000);
	// TIME text
	$('#time-screen').empty().append('<div id="time-text"><span>Time</span>Time</div><div><p class="instructions"></p></div>');
}

function startLevel() {
	toggleScores();
	$('#time-screen').hide();
	$('#controls').show();
	$('.cards').show();
	restartTimer(10);
	$('.status').fadeOut();
}

function restartTimer(time) {
	$('.timer').remove();
	$('#timer').append("<div class='timer team" + curTeam() + "'></div>");
	$('.timer').css('animation-duration', time + "s");
	setTimeout(endTurn, time * 1000);
}

function endTurn() {
	toggleScoreBlocks();
	$('#time-screen .instructions').text('You scored ' + roundPts + ' points on your turn.');
	$('#time-screen').show();
	$('#controls').fadeOut();
	$('.cards').fadeOut();
	dynamics.animate($('#time-text')[0], {
		scale: 1,
		opacity: 1
	}, {
		type: dynamics.gravity,
		duration: 500,
		complete: function() {
			setTimeout(function(){
				setupTurn();
				$('.status').fadeIn("slow");
			}, 2000);
		}
	});
}

function transitionStatusScreen(from, to) {
	dynamics.animate($(from)[0], {
		translateY : -100,
		opacity: 0
	}, {
		type: dynamics.easeInOut,
		delay: 500,
		duration: 250,
		complete: function() {
			$(from).hide();
			$(to).fadeIn();
		}
	});
}

function toggleScores() {
	$('.scores').toggleClass('hide');
	if (! $('.scores').hasClass('hide')) {
		for (var i = 0; i < teams; i++) {
			$('.score.team' + i + ' span').text(scores[i]);
		}		
	}
}

function toggleScoreBlocks() {
	$('.scores').toggleClass('gone');
}

function incScore() {
	scores[curTeam()] += 1;
	highlightScore();
}

function highlightScore() {
	$('.score.team' + curTeam()).css('height', '20px');
	$('.score.team' + curTeam() + ' span').text(scores[curTeam()]).addClass('show');
	setTimeout(function() {
		$('.score.team' + curTeam()).css('height', '10px');
		$('.score.team' + curTeam() + ' span').removeClass('show');
	}, 500);
}

function incrementStack() {
	$('.cards').removeClass('transition correct incorrect');
	$('.cards .card')[0].remove();
}

function correct() {
	incScore();
	roundPts++;
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
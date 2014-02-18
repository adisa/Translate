// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	

	// Your code here
	$('#lang-from').text(lang_from);
	$('#lang-to').text(lang_to);
	
	var keys = Object.keys(current_dict);
	var prev_key;
	var newWord = function() {
		var index = Math.floor(Math.random()*keys.length);
		prev_key = keys[index];
		$('#rand-word').text(current_dict[prev_key]);
		$('#answer-box').val("").focus();
	}
	newWord();
	
	var prev_word, prev_answer;
	var addPrevWord = function() {
		$('tbody tr').first().before("<tr><td><td><td>");
		
		var entry = $('tbody tr').first();
		prev_word = $('#rand-word').text();
		entry.children().first().text(prev_word);
		entry.children(":nth-child(2)").text(prev_answer);
		
		if(prev_answer == prev_key) {
			entry.addClass("correct");
		}else {
			entry.addClass("incorrect");
			entry.children(":nth-child(3)").text(prev_key);
		}
		
	}
	
	$('#submit-answer').click(function(){
		prev_answer = $('#answer-box').val();
		addPrevWord();
		newWord();
	});
	
	$('#answer-box').autocomplete({
		source: keys,
		minLength:2,
		select: function(event, ui) {
			prev_answer = ui.item.value;
			addPrevWord();
			newWord();
			return false;
		},
	});
});
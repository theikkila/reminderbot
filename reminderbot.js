var irc = require('irc');

var nick = "ReminderBOT";
var network = "irc.quakenet.org";

var client = new irc.Client(network, nick, {channels: ['#other', '#reminderbot']});

function printmsg(content, name, from, to, when){
	console.log(name, content, from, to, when);
	setTimeout(function(){
		client.say(to, name.replace('@', '')+": <"+from+"> "+content.replace("\"", ""));	
	}, when);
}

client.addListener('message', function(from, to, message){
	if(message == nick+": commands"){
		client.say(to, "remember, @<nick>, "<thing_to_remember>", [minutes] (default: 3 min)");
	}else{
		var spmsg = message.match(/(^\w+|".+"|@\w+|\d+$)/ig);
		console.log(spmsg);
		var name = "";
		var content = "";
		if(spmsg != null && spmsg.length >= 3){
			if(spmsg[0] == "remember")
			name = spmsg[1];
			content = spmsg[2];
			console.log(spmsg[1]);
			printmsg(content, spmsg[1], from, to, spmsg[3]);
		}
	}
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});


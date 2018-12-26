
var fs = require("fs");

var json = JSON.parse(fs.readFileSync('export.json'));
var json = Object.values(json)[0];

var byConversation = {};

json.forEach(function(a)
{
	a._serverMessages.forEach(function(b)
	{
		var id = b.conversationid || a.conversationId;

		if(!byConversation[id])
		{
			byConversation[id] = [];
		}

		byConversation[id].push(b);
	});
});

var getName = function(a)
{
	return a.replace(/^(.+\/)?[0-9]+:(.+)$/, '$2')
};

var format = function(a)
{
	return a.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\n/g, '<br />');
};

for(var i in byConversation)
{
	byConversation[i] = byConversation[i].sort(function(a, b)
	{
		return a.originalarrivaltime > b.originalarrivaltime ? 1 : -1;
	});

	var html = '<html><body>';

	byConversation[i].forEach(function(a)
	{
		html += '<dl><dt>'
			+a.originalarrivaltime.replace('T', ' ').substr(0, 19)
			+' / '
			+'<strong>'+format(getName(a.from))+'</strong>'
			+'</dt><dd>'
			+format(a.content)
			+'</dd></dl>';
	});

	html += '</body></html>';

	fs.writeFileSync(getName(i)+'.html', html);
}

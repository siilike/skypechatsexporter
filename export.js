
indexedDB.open('your-db-name-here').onsuccess = function(e)
{
	try
	{
		console.warn('Success opening db');

		var ret = {};
		var db = e.target.result;

		var t = db.transaction(db.objectStoreNames, "readonly");
		var toExport = Array.prototype.slice.call(db.objectStoreNames, 0).filter(function(a) { return a.indexOf('messages') === 0; });

		toExport.forEach(function(n)
		{
			console.warn('Exporting '+n);

			var d = [];
			t.objectStore(n).openCursor().onsuccess = function(e)
			{
				var c = e.target.result;

				if(c)
				{
					d.push(c.value);
					c.continue();
				}
				else
				{
					ret[n] = d;

					if(toExport.length === Object.keys(ret).length)
					{
						var blob = new Blob([ JSON.stringify(ret) ], { type: "octet/stream" });
						var url = window.URL.createObjectURL(blob);
						var a = document.createElement('a');
						a.href = url;
						a.download = "export.json";
						a.click();
						window.URL.revokeObjectURL(url);
					}
				}
			};
		});
	}
	catch(e)
	{
		console.error(e);
	}
};

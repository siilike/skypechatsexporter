
# Skype v8 chat history exporter

This is a simple script to export chat history from the wonderful new Skype.

Skype uses Electron's IndexedDB as a database. On Linux it is stored in `~/.config/skypeforlinux/IndexedDB` as a LevelDB and could be exported directly from there, but Chrome uses a custom comparator that is not implemented in JavaScript (although it should not be difficult).

As a quick workaround we can use Elecrtron's debugging tools. Press Ctrl+Alt+Shift+d and then Ctrl+Alt+i. From the Application tab find Storage -> IndexedDB and remember your database name. For me it was `s4l-username`.

Next, open the `export.js` script and replace `your-db-name-here` with the correct database name. Then open the Console tab and paste the full `export.js` into the command line and press Enter. If everything goes well it will offer to download all your chats in the JSON format.

You can use the `html.js` script to convert that file to HTML. Just put the exported JSON file into the same directory as `html.js` and run `node html.js`. This will generate a HTML file per conversation. Images are currently not included.

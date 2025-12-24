var path = require("path");
var fs = require("fs");
var cheerio = require("cheerio");


// Change these constants to suit your needs
const HTML_FOLDER = "docs";  // folder with your HTML files
// Valid search fields: "title", "description", "keywords", "body"
const EXCLUDE_FILES = ["search.html"];
const OUTPUT_INDEX = "public/index.json";  // Index file
var INDEX = 0;


function isHtml(filename) {
    lower = filename.toLowerCase();
    return (lower.endsWith(".htm") || lower.endsWith(".html"));
}


function findHtml(folder) {
    if (!fs.existsSync(folder)) {
        console.log("Could not find folder: ", folder);
        return;
    }

    var files = fs.readdirSync(folder);
    var htmls = [];
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(folder, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            var recursed = findHtml(filename);
            for (var j = 0; j < recursed.length; j++) {
                recursed[j] = path.join(files[i], recursed[j]).replace(/\\/g, "/");
            }
            htmls.push.apply(htmls, recursed);
        }
        else if (isHtml(filename) && !EXCLUDE_FILES.includes(files[i])) {
            htmls.push(files[i]);
        };
    };
    return htmls;
};


function readHtml(root, file) {
    var filename = path.join(root, file);
    var txt = fs.readFileSync(filename).toString();
    var $ = cheerio.load(txt);
    var title = $("title").text();
    if (typeof title == 'undefined') title = file;
    var description = $("meta[name=description]").attr("content");
    if (typeof description == 'undefined') description = "";
    var keywords = $("meta[name=keywords]").attr("content");
    if (typeof keywords == 'undefined') keywords = "";
    
    var topics = $('.topic');

    var docs = [];

    if (topics.length)
    {
   for (var i = 0; i < topics.length; i++) { 
    
    section_anchor = $(topics[i]).find('.topic-anchor')[0];

    var file = filename.replace('docs\\', '/').replace('.html', '');

                if (section_anchor){
                    section_href = section_anchor.attribs.id;
                    anchor_link = `${file}#${section_href}`;
                    section_title = $(section_anchor).text().replace(/(\r\n|\n|\r|\t)/gm, '')
                    section_content = $(topics[i]).children('.topic-content')[0]
                }

                if (section_content && $(section_content).text()){
                    section_body = $(section_content).text().replace(/(\r\n|\n|\r|\t)/gm, '');

                    console.log(filename);
                    
                    var doc = {
                        "id" : INDEX,
                        "title" : section_title,
                        "url" : anchor_link,
                        "body" : section_body
                    };

                    INDEX = INDEX + 1

                    docs.push(doc);
                }


        } 

        }

    return docs;
}



function main() {
    files = findHtml(HTML_FOLDER);
    var docs = [];
    console.log("Building index for these files:");
    for (var i = 0; i < files.length; i++) {
        console.log("    " + files[i]);
        docs.push(...readHtml(HTML_FOLDER, files[i]));
    }

    fs.writeFile(OUTPUT_INDEX, JSON.stringify(docs), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Index saved as " + OUTPUT_INDEX);
    }); 
}

main();
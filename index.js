var fs = require('fs');

var files = fs.readdirSync('BLAG-fortune/people/');

let chosenPerson = files[Math.floor(Math.random() * files.length)];

const MARGIN = 6;
const MAX_LEN = 50;
const ANARCHY = `
         \\           ..ed$$$$$$$ee.
          \\       zd$$*"".$$*$$F"**$$e.
                 d$$"    .$$" ^$$c   ^*$$.
               z$$"     4$$"   ^$$c     *$b.
              d$P      z$$"     ^$$L     ^$$.
             J$P      z$$"       ^$$b     ^$$
         $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
            4$$     J$$"            $$b    4$$
            ^$$    d$$               *$$   4$$
             $$L  d$$                 *$$  $$%
             ^$$cd$$                   *$$d$P
              ^$$$$                     *$$P
                *$$c                  .d$$"
                 ^*$$bc.           .e$$P"
                    ^*$$$$$$eee$$$$$*"   
                         ^"""""""
    `;


fs.readFile('fortunes/people/' + chosenPerson, 'utf8', (err, data) => {
    if (err) {
        console.log("No fortune found: " + err);
        return;
    }

    get_fortune(data);
});

let get_fortune = (f_data) => {
    let quotes = f_data.split('%')
        .filter(q => q != '\n');

    let lines = quotes[Math.floor(Math.random() * quotes.length)]
        .split("\n")
        .filter(Boolean)
        .map(format_quote)
        .join('\n');

    let max_line_len = lines
        .split('\n')
        .reduce((acc, curr) => Math.max(acc, curr.length), 0);

    let fortune = lines
        .split("\n")
        .map(i => border_pad_line(i, max_line_len))
        .join('\n');
    

    console.log(add_border(max_line_len, fortune));
}

let add_border = (max_line_len, fortune) => {
    let border = '-'.repeat(max_line_len + MARGIN)
    let padding = ' '.repeat(max_line_len + MARGIN);

    let top_border = ' ' + border + "\n" + '/' + padding + "\\\n";
    let bottom_border = '\n\\' + padding + "/\n " + border + '\n';

    return top_border + fortune + bottom_border + ANARCHY
}

let border_pad_line = (l, max_line_len) => {
    return "|" 
        + " ".repeat(MARGIN / 2) 
        + l.trim().padEnd(max_line_len + MARGIN / 2, " ") 
        + "|";
}

let format_quote = (q) => {
    
    if (q.length < MAX_LEN) {
        return q;
    } 

    let currentLineLen = 0;

    return q
        .split(' ')
        .map(i => {
            currentLineLen += i.length;
            if (currentLineLen > MAX_LEN) {
                currentLineLen = 0;
                return i + "\n";
            }
            return i;
        })
        .join(' ');
}

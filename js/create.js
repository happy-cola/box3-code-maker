const names = $('#table_name').val();
var l = [];
var sqllist = '';
var nodes=document.getElementsByClassName("value");
for (var i = 0; i < nodes.length; i++) {
    l.push(nodes[i].value);
}

function copyText(text) {
    var input = document.getElementById("input");
    input.value = text;
    input.select();
    document.execCommand("copy");
    mdui.alert("复制成功");
}

for (var v of l) {
    var vs = v.split(' ');
    var c = 'TEXT';
    if (vs == '') { continue; }
    if (vs[1] == '整数') {
        c = 'INTEGER';
    } else if (vs[1] == '小数') {
        c = 'REAL';
    } else if (vs[1] == '字符') {
        c = 'TEXT';
    } else if (vs[1] == '二进制') {
        c = 'BLOB';
    } else if (vs[1] == '其他') {
        c = 'NUMERIC';
    } else if (vs[1] == 'userKey') {
        c = 'TEXT PRIMARY KEY UNIQUE';
    }else c=vs[1];
    sqllist += '            ' + vs[0] + ' ' + c + ' ' + 'NOT NULL,\n';
}

sqllist = sqllist.slice(0, -2);
var code = '(async function () {\n    await db.sql`\n        CREATE TABLE IF NOT EXISTS ' + names + '(\n' + sqllist + '\n        )\n    `\n})();';
console.log(code);
copyText(code);
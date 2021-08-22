var names = $('#name').val();
var l = [];
var list1 = '';
var list2 = '';
var list3 = '';

for (var i = 1; i < 21; i++) {
    l.push($(`#value${i}`).val());
}

function copyText(text) {
    var input = document.getElementById("save_input");
    input.value = text;
    input.select();
    document.execCommand("copy");
    mdui.alert("复制成功");
}

for (var v of l) {
    var vs = v.split(' ');
    if (v == '' || v == ' ' || v == 'undefined') {
        continue;
    }
    if (vs[1] == '玩家名') {
        vs[1] = 'name';
    }
    list1 += '                ' + vs[0] + ',\n';
    list2 += '                ${entity.player.' + vs[1] + '},\n';
    list3 += '            ' + vs[0] + ' = excluded.' + vs[0] + ',\n';
}

list1 = list1.slice(0, -2);
list2 = list2.slice(0, -2);
list3 = list3.slice(0, -2);
var code = 'async function saveData() {\n    if (entity.player.userKey) {        await db.sql`\n            INSERT INTO ' + names + '(\n' + list1 + '\n            )\n            VALUES(\n' + list2 + '\n            )\n            ON CONFLICT(userKey)\n            DO UPDATE SET\n' + list3 + '        `\n    }\n};\nworld.onPlayerLeave(async ({entity})=>{await saveData(entity);});';
console.log(code);
copyText(code);

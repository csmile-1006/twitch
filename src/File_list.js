
// export function open_txt () {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", require('./data/image_list.txt'), false);
//     rawFile.send(null);
//     var data = [];
//     var object = rawFile.responseText.split(/\r?\n|\r/);
//     for (var i = 0 ; i < object.length ; i++) {
//         data.push(object[i]);
//     }
//     return data;
// }

// export var data = open_txt();

// export function image_counter (data) {
//     var counter = {};
//     for (var i = 0 ; i < data.length ; i++){
//         counter[i] = {name: data[i], count: 0}
//     }
//     return counter;
// }

export function open_image_counter () {
    var json = require('./image_counter.json');
    // var counter = JSON.parse(json);
    return json;
}

// export var counter = JSON.stringify(image_counter (data));

export function image_sample (portion, counter) {
    var answer = new Set();
    while (answer.size < portion){
        var random_number = Math.floor(Math.random () * counter.length);
        var img = counter[random_number];
        if (img.count < 3){
            answer.add(random_number)
        }
    }

    var result = Array.from(answer)

    return result;
}
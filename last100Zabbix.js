// find in-between the last 100 alarms only relevant ones....
let counter = 0;
while (counter <= 5) {
    counter++;
    var pointers = document.getElementsByClassName('pointer');
    for (let item of pointers) {
        if (item.innerText.match(/your regex here/g) === null) {
            item.parentElement.parentElement.remove();
        }
    }
}
var success = [];
var trs = [];
// floors as in "hosts" that's what we call them
var floors = {};
pointers = document.getElementsByClassName('pointer');
for (let i = 0; i < 511; i++) {
   delete pointers[i];
}
for (let item of pointers) {
   let temp_elem = document.createElement('div');
   let new_elem = item.getAttribute('onmouseover');
   if (new_elem === null) {
      continue;
   }
   new_elem = new_elem.substring(0, new_elem.length - 6);
   new_elem = new_elem.substring(37, new_elem.length);
   temp_elem.innerHTML = new_elem;
   trs.push(temp_elem.getElementsByTagName('tr'));
}
for (let temp in trs) {
   if (trs[temp].length === 0) {
      continue;
   }
   for (let temp1 in trs[temp]) {
      if (trs[temp][temp1].length == 0) {
         continue;
      }
      let temp2 = trs[temp][temp1].innerText;
      if (temp2 == undefined) {
         continue;
      }
      if (temp2.match(/yor alarm prefix/g) !== null || temp2.match(/(poweroff type is not soft)/g) !== null) {
         success.push(temp2);
      }
   }
}
var el = document.createElement('div');
var clean_success = [...new Set(success)];
for (let elem in clean_success) {
   let parag = document.createElement('p');
   let str = clean_success[elem];
   if (typeof str == 'string') {
      if (str.length > 500) {
         continue;
      }
	  // Here I have to omit data alarms for confidentiality. It's matching different alarams and applaying different colors to visually seperate
      parag.innerText = str.replace(/<[^>]*>?/gm, '');
      let regex = /regex/gm;
      let test = parag.innerText.match(regex);
	  if(parag.innerText.match(/regex/) !== null){
		  parag.style.color = 'red';
	  }
	  if(parag.innerText.match(//) !== null){
		  parag.style.color = 'lightgreen';
	  }
	  if(parag.innerText.match(//) !== null){
		  parag.style.color = 'violet';
	  }
      if (test !== null) {
         if (test[0] in floors) {
            floors[test[0]].push(parag);
         } else {
            floors[test[0]] = [parag];
         }
      }
   }
}
var ordered_list = document.createElement('ol');
let count = true;
for (let floor in floors) {
   for (let paragraph in floor) {
      let list_item = document.createElement('li');
      if (count) {
		  let header = document.createElement('h1');
		  header.innerText = floor;
		  el.appendChild(header);
          count = false;
      }
	  if(floors[floor].length <= parseInt(paragraph) || isNaN(parseInt(paragraph)) ){continue;}
      list_item.appendChild(floors[floor][paragraph]);
      ordered_list.appendChild(list_item);
   }
   el.appendChild(ordered_list);
   ordered_list = document.createElement('ol');
   count = true;
}
var tables = document.getElementsByTagName('table');
tables[10].innerHTML = '';
tables[10].appendChild(el);
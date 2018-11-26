'use strict';

// global vars
const allCrits = [];
const uniqueKeys = [];

// crit = critter
// constructors
function Creature(crit){
  this.title = crit.title;
  this.image_url = crit.image_url;
  this.description = crit.description;
  this.keyword = crit.keyword;
  this.horns = crit.horns;

  allCrits.push(this);
  // console.log(allCrits);
}

Creature.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let $clone = $('div[class="clone"]');

  let creatureTemplate = $('#photo-template').html();
  // make a while loop that iterates on making divs until allCrits[19].
  $clone.html(creatureTemplate);

  $clone.find('img').attr('src', this.image_url);
  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);

  $clone.removeClass('clone');
  $clone.attr('class', this.title).attr('id', this.keyword);
}

// this prototype populates the dropdown and removes and inputs keywords only once.
// 11/23 ... working on the 'input only once' part.
Creature.prototype.rendOption = function() {
  if(uniqueKeys.indexOf(this.keyword) === -1){
    $('select').append('<option class="drop">'+this.keyword+'</option>');
    let $drop = $('option[class="drop"]');
    $drop.attr('value', this.keyword);

    $drop.removeClass('drop');
    $drop.attr('id', this.keyword);
    uniqueKeys.push(this.keyword);
  }
}

// Event Handlers
//  select box filtering
$('select[name="keyword"]').on('change',function(){
  let $selection = $(this).val();
  console.log($(this).val());
  $('main div').hide()
  $(`div[id="${$selection}"]`).show()
  console.log($selection);
})

//button 1 + page 1 recall
$('button[class="P1"]').on('click', function(){
  $('main div').hide()
  allCrits.length = 0;
  readJson();
})

//button 2 + page 2 function call
$('button[class="P2"]').on('click', function(){
  $('main div').hide()
  allCrits.length = 0;
  page2Go('data/page-2.json');
})

function readJson () {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(creatureCrit => {
        new Creature(creatureCrit)
      })
    })
    .then(() => {
    // convert forEach to for?
      // function() (creature) {
      // for (var i=0; i<19; i++){
      allCrits.forEach(creature => {
        creature.render();
        creature.rendOption();
      })
    })
}
// get page-2.json

function page2Go (data) {
  $.get(data, 'json')
  //could pass parameter through function -Ix showed us how to do this way as well; keeping both methods here for learning purposes.
    .then(data => {
      data.forEach(creatureCrit => {
        new Creature(creatureCrit)
      })
    })
    .then(() => {
      allCrits.forEach(creature => {
        creature.render();
        creature.rendOption();
      })
    })
}

$(() => readJson());

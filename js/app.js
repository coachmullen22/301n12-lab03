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
  console.log(allCrits);
}

Creature.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let $clone = $('div[class="clone"]');

  let creatureTemplate = $('#photo-template').html();
  $clone.html(creatureTemplate);

  $clone.find('h2').text(this.title);
  $clone.find('img').attr('src', this.image_url);
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

$('button[id="P1"]').on('click', function(){
  $('main div').hide()
  console.log('hiding!');
})

function readJson () {
  $.get('data/page-1.json', 'json')
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
  // get page-2.json
  $.get('data/page-2.json', 'json')
    .then(data => {
      data.forEach(creatureCrit => {
        new Creature(creatureCrit)
      })
    })
}

$(() => readJson());

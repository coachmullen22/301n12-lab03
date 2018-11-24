'use strict';

// global vars
const allCrits = [];

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
  $('select').append('<option class="drop">'+this.keyword+'</option>');
  let $drop = $('option[class="drop"]');
  $drop.attr('value', this.keyword);

  $drop.removeClass('drop');
  $drop.attr('id', this.keyword);
}

//select box filtering
$('select[name="keyword"]').on('change',function(){
  let $selection = $(this).val();
  console.log($(this).val());
  $('main div').hide()
  $(`div[id="${$selection}"]`).show()
  console.log($selection);
})
// $('select[name="icecream"]').on('change', function() {
//   let $selection = $(this).val();
//   $('img').hide()
//   $(`img[data-flavor="${$selection}"]`).show()
// })


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
    

}

$(() => readJson());

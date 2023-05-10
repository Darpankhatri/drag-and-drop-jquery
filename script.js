var correctCards = 0;
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Create the pile of shuffled cards
  var numbers = [ "mango.jpg", "apple.jpg", "Dragon.png", "grapes.webp", "kiwi.jpeg", "pineapple.jpg", "pomegranate.jpg", "Strawberry.jpg", "Watermelon.jpg","Banana.jpg" ];
  numbers.sort( function() { return Math.random() - .5 } );

  for ( var i=0; i<10; i++ ) {
    $('<div><img src="images/'+numbers[i]+'" style="width: 100%;"></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  var words = [ "mango.jpg", "apple.jpg", "Dragon.png", "grapes.webp", "kiwi.jpeg", "pineapple.jpg", "pomegranate.jpg", "Strawberry.jpg", "Watermelon.jpg","Banana.jpg" ];
  var words_display = [ "Mango", "Apple", "Dragon", "Grapes", "Kiwi", "Pineapple", "Pomegranate", "Strawberry", "Watermelon","Banana" ];

  for ( var i=1; i<=10; i++ ) {
    
    $('<div style="font-size: small;">' + words_display[i-1] + '</div>').data( 'number', words[i-1] ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

function handleCardDrop(event, ui) {
  
  //Grab the slot number and card number
  var slotNumber = $(this).data('number');
  var cardNumber = ui.draggable.data('number');
  
  //If the cards was dropped to the correct slot,
  //change the card colour, position it directly
  //on top of the slot and prevent it being dragged again
  if (slotNumber === cardNumber) {
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');
    $(this).droppable('disable');
    ui.draggable.position({
      of: $(this), my: 'left top', at: 'left top'
    });
    //This prevents the card from being
    //pulled back to its initial position
    //once it has been dropped
    ui.draggable.draggable('option', 'revert', false);
    correctCards++; //increment keep track correct cards
  }
  
  //If all the cards have been placed correctly then
  //display a message and reset the cards for
  //another go
  if (correctCards === 10) {
    $('#successMessage').show();
    $('#successMessage').animate({
      left: '380px',
      top: '200px',
      width: '400px',
      height: '150px',
      opacity: 1
    });
  }
  
  
  
}
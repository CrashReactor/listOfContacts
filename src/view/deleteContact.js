app.view.deleteContact = {
  setupUserInterface : function () {
    var
      deleteButton = document.forms[ "Contact" ].commit,
      selectEl = document.forms[ "Contact" ].selectContact,
      
      optionEl = null,
      contact = null,
      keys = [],
      key = "",
      i 
    ;

    // Load all contact objects
    Contact.loadAll();
    keys = Object.keys( Contact.instances );

    // Populate the selection list with contacts
    for ( i = 0; i < keys.length; i++ ) {
      key = keys[ i ];
      contact = Contact.instances[ key ];
      
      optionEl = document.createElement( "option" );
      optionEl.text = contact.name;
      optionEl.value = contact.id;
      selectEl.add( optionEl, null );
    }

    deleteButton.addEventListener( "click", 
      app.view.deleteContact.handleDeleteButtonClickEvent
    );
    window.addEventListener( "beforeunload", function () {
      Contact.saveAll();
    });
  },
  handleDeleteButtonClickEvent : function () {
    var
      selectEl = document.forms[ "Contact" ].selectContact,
      id = selectEl.value
    ;

    if ( id ) {
      Contact.destroy( id );
      selectEl.remove( selectEl.selectedIndex );
    }
  }
};

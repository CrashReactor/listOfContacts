app.view.updateContact = {
  setupUserInterface : function () {
    var 
      formEl          = document.forms[ "Contact" ],
      saveButton      = formEl.commit,
      selectContactEl = formEl.selectContact,

      optionEl = null,
      contact  = null,
      keys     = [],
      key      = "",
      i
    ;

    // Load all contact objects.
    Contact.loadAll();

    // Populate the selection list with contacts.
    keys = Object.keys( Contact.instances );
    selectContactEl.innerHTML = "<option value=''> --- </option>";
   
    for ( i = 0; i < keys.length; i++ ) {
      key = keys[ i ];
      contact = Contact.instances[ key ];

      optionEl = document.createElement( "option" );
      optionEl.text = contact.name;
      optionEl.value = contact.id;
      selectContactEl.add( optionEl, null );
    }
    // When a contact is selected, populate the form with the book data.
    selectContactEl.addEventListener( "change", function () {
      var
        contact = null,
        key = selectContactEl.value
      ;

      if ( key ) {
        contact = Contact.instances[ key ];
        formEl.id.value       = contact.id;
        formEl.name.value     = contact.name;
        formEl.username.value = contact.username;
        formEl.email.value    = contact.email;
        formEl.phone.value    = contact.phone;
        formEl.website.value  = contact.website; 
        formEl.favorite.value = contact.favorite;
        formEl.avatar.value   = contact.avatar; 
        formEl.address.value  = contact.address;
        formEl.company.value  = contact.company;
        formEl.posts.value    = contact.posts;
        formEl.accountHistory.value = contact.accountHistory; 

        /*function recursion ( prop ) {
          Object.keys( prop ).forEach( function (key) {
            if ( Array.isArray(prop[key]) || prop[key] instanceof Object) {
              recursion( prop[key] );
            } else {
              console.log( key + " : " + prop[key] );
            } 
          }); 
          console.log( "" );
        }
        recursion( contact );*/
      } else {
        formEl.reset();
      }
    });

    saveButton.addEventListener( "click",
      app.view.updateContact.handleUpdateButtonClickEvent
    );

    window.addEventListener( "beforeunload", function () {
      Contact.saveAll();
    });
  },
  
  handleUpdateButtonClickEvent : function () {
    var
      formEl = document.forms[ "Contact" ],
      slots = {
        id       : formEl.id.value, 
        name     : formEl.name.value, 
        nameuser : formEl.username.value, 
        email    : formEl.email.value, 
        phone    : formEl.phone.value, 
        website  : formEl.website.value, 
        favorite : formEl.favorite.value, 
        avatar   : formEl.avatar.value, 

        address  : formEl.address.value,
        company  : formEl.company.value, 
        posts    : formEl.posts.value,
        accountHistory : formEl.accountHistory.value
      }
    ;

    Contact.update( slots );
    Contact.saveAll();
    formEl.reset();

    app.view.updateContact.setupUserInterface(); 
  }
}; 

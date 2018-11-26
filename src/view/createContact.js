app.view.createContact = {
  setupUserInterface: function () {
    var saveButton = document.forms[ "Contact" ].commit;

    // Load all contact objects.
    Contact.loadAll();

    // Set an event handler for the save/submit button.
    saveButton.addEventListener( "click",
      app.view.createContact.handleSaveButtonClickEvent
    );

    window.addEventListener( "beforeunload", function () {
      Contact.saveAll();
    });
  },
    
  // Save user input data
  handleSaveButtonClickEvent: function () {
    var 
      formEl = document.forms[ "Contact" ],
      slots = { 
        id       : formEl.id.value, 
        name     : formEl.name.value,
        username : formEl.username.value,
        email    : formEl.email.value,
        phone    : formEl.phone.value,
        website  : formEl.website.value,
        company  : formEl.company.value,
        favorite : formEl.favorite.value,
        avatar   : formEl.avatar.value 
        /*
        posts : formEl.posts.value,
        accountHistory: formEl.posts.value,
        address : formEl.address.value 
        */
      }
    ;
   
    Contact.add( slots );
    formEl.reset();
  }
};

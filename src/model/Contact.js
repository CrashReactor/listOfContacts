function Contact( slots ) {
  this.id       = slots.id;
  this.name     = slots.name;
  this.username = slots.username;
  this.email    = slots.email;
  this.phone    = slots.phone;
  this.website  = slots.website;
  this.favorite = slots.favorite;
  this.avatar   = slots.avatar;

  this.address  = slots.address; 
  this.company  = slots.company;
  this.posts    = slots.posts;
  this.accountHistory = slots.accountHistory;
}




Contact.instances = {};




Contact.add = function ( slots ) {
  var contact = new Contact( slots );

  Contact.instances[ slots.id ] = contact;
  console.log( "Contact " + slots.id + " created!" );
};




Contact.convertRow2Obj = function ( contactRow ) {
  var contact = new Contact( contactRow );

  return contact;
};




Contact.loadAll = function () {
  var 
    contactsString = "",
    contacts       = {},
    keys           = [],
    key            = "",
    i
  ;

  try {
    if ( localStorage["contacts"] ) {
      contactsString = localStorage[ "contacts" ];
      
    }
  } catch ( e ) {
    alert( "Error when reading from Local Storage\n" + e );
  }

  if ( contactsString ) {
    contacts = JSON.parse( contactsString );
    keys = Object.keys( contacts );

    console.log( keys.length + " contacts loaded." );

    for ( i = 0; i < keys.length; i++ ) {
      key = keys[ i ];
      Contact.instances[ key ] = Contact.convertRow2Obj( contacts[key] );
    }
  }
};




Contact.update = function ( slots ) {
  var contact = Contact.instances[ slots.id ];

  if ( contact.name !== slots.name ) {
    contact.name = slots.name;
  } 
  else if ( contact.username !== slots.username ) {
    contact.username = slots.username ;
  } 
  else if ( contact.email !== slots.email ) {
    contact.email = slots.email ;
  } 
  else if ( contact.phone !== slots.phone ) {
    contact.phone = slots.phone ;
  } 
  else if ( contact.website !== slots.website ) {
    contact.website = slots.website ;
  }  
  else if ( contact.favorite !== slots.favorite ) {
    contact.favorite = slots.favorite ;
  }  
  else if ( contact.avatar !== slots.avatar ) {
    contact.avatar = slots.avatar ;
  }  
  else if ( contact.address !== slots.address ) {
    contact.address = slots.address;
  } 
  else if ( contact.company !== slots.company ) {
    contact.company = slots.company ;
  } 
  else if ( contact.posts !== slots.posts ) {
    contact.posts= slots.posts;
  } 
  else if ( contact.accountHistory !== slots.accountHistory ) {
    contact.accountHistroy = slots.accountHistory;
  }  

  console.log( "Contact " + slots.id + " modified!" );
};




Contact.destroy = function ( id ) {
  if ( Contact.instances[id] ) {
    console.log( "Contact " + id + " deleted." );

    delete Contact.instances[ id ];
  } 
  else {
    console.log( "There is no contact with ID " + id + " in the database!" );
  }
};




Contact.saveAll = function () {
  var
    contactsString = "",
    nmrOfContacts  = Object.keys( Contact.instances ).length,
    error          = false
  ;

  try {
    contactsString = JSON.stringify( Contact.instances );
    localStorage[ "contacts" ] = contactsString;
    console.log( "Saved" );
  } catch ( e ) {
    alert( "Error when writing to Local Storage\n" + e );
    error = true;
  }

  if ( !error ) {
    console.log( nmrOfContacts + " contacts saved." );
  }
};




Contact.createTestData = function () {
  var 
    xhttp = new XMLHttpRequest(),
    i
  ;

  xhttp.onreadystatechange = function() {
    if ( this.readyState === 4 && this.status === 200 ) {
      var 
        testContacts = xhttp.responseText,
        contacts = JSON.parse(testContacts),
        contact,
        id
      ;

      for ( i = 0; i < contacts.length; i++ ) {
        contact = contacts[ i ];
        id = contact.id;

        Contact.instances[ id ] = contact;
      }
      Contact.saveAll();
    }
  };

  xhttp.open( "GET", "https://api.myjson.com/bins/115q22");
  xhttp.send();
};




Contact.clearData = function () {
  if ( confirm("Delete?") ) {
    localStorage[ "contacts" ] = "{}";
  }
};

app.view.listContacts = {
  setupUserInterface : function () {
    var 
      ulEl = document.querySelector( "ol" ),
      keys = [],
      key  = "",
      liEl,
      name,
      node,
      i
    ;

    // Load all contacts objects.
    Contact.loadAll();
    keys = Object.keys( Contact.instances );

    // For each contact, create a li element into the ul list for 1 attribute.
    for ( i = 0; i < keys.length; i++ ) {
      key = keys[ i ];
      name = Contact.instances[ key ].name;

      liEl = document.createElement( "li" );
      node = document.createTextNode( name );

      liEl.appendChild( node );
      ulEl.appendChild( liEl )
    }
  }
};

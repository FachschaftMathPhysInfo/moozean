import Ember from 'ember';

export default Ember.Mixin.create({

  ajaxError: function(error) {
    if (!error) {
      Ember.Logger.warn('No (valid) error object provided! ajaxError function must be called with the error object as its argument.');
      return;
    }

    // Depending whether the mixin is used in controller or route
    // we need to use different methods.
    var transitionFunc = this.transitionToRoute || this.transitionTo,
        couldHandleError = false;

    switch (this._getStatusCode(error)) {
      case 401:
        transitionFunc.call(this, 'auth.logout');
        couldHandleError = true;
        break;
      case 422:
      var errorMessage= "Fehler in den Daten:\n";
        for(var i=0;i<error.errors.length;i++){
            let y=error.errors[i];
           errorMessage+= "["+(i+1)+"]"+" "+y.title +(y.detail!=undefined)?(":"+y.detail+"\n"):"\n";
         }
        alert(errorMessage);
        couldHandleError=true;
      break;
      case 404:

      case 500:
        // Here we trigger a service to show an server error message.
        // This is just an example and currently not the final implementation.
        // this.get('notificationService').show();
        var errorMessage= "Fehler auf dem Server:\n";
          for(var i=0;i<error.errors.length;i++){
              let y=error.errors[i];
             errorMessage+= "["+(i+1)+"]"+" "+y.title +":"+y.description+"\n";
           }
        alert(errorMessage);
        couldHandleError = true;
    }

    // For all other errors just log them.
    if (!couldHandleError) {
      Ember.Logger.error(error);
    }
  },

  _getStatusCode: function(error) {
    // First check for jQuery error object
    var status = error.status;

    // Check for ember adapter error object if it's not a jquery error
    if (!status && error.errors && error.errors[0].status) {
      status = parseInt(error.errors[0].status);
    }

    return status;
  },

});

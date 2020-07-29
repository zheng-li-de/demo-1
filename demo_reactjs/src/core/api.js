import axios from 'axios';
axios.defaults.withCredentials = true;

const Api = {

    _handleErrorResponse: function(response){
      var data = response.data;
      var err = null;
      if (data && data.error && data.error.message) {
        err = new Error(data.error.message);
        err.code = data.error.code;
      } else {
        err = new Error(response.statusText?response.statusText:'invalid error response');
        err.code = response.status;
      }
      return err;
    },
  
    login: function (username, password, callback) {
      var err, self = this;
      axios.post('http://localhost:8080/login', {username:username, password:password})
        .then(function(response){
          
        })
        .catch(function(error){
          if (error.response) {
            err = self._handleErrorResponse(error.response);
          } else {
            err = new Error(error.message);
            err.code = -1;
          }
        })
        .then(function(){
          callback(err);
        });
    },
  
    getProfile: function (id, callback) {
      var data, err, self = this;
      axios.get('http://localhost:8080/api/v1/profile/'+id)
        .then(function(response){
          if (!response.data) {
            err = new Error('invalid response');
            err.code = 0;
          } else {
            data = response.data;
          }
        })
        .catch(function(error){
          if (error.response) {
            err = self._handleErrorResponse(error.response);
          } else {
            err = new Error(error.message);
            err.code = -1;
          }
        })
        .then(function(){
          callback(err, data);
        });
    },
  
    setProfile: function(id, profile, callback) {
      var data, err, self = this;
      axios.post('http://localhost:8080/api/v1/profile/'+id, profile)
        .then(function(response){
          if (!response.data) {
            err = new Error('invalid response');
            err.code = 0;
          } else {
            data = response.data;
          }
        })
        .catch(function(error){
          if (error.response) {
            err = self._handleErrorResponse(error.response);
          } else {
            err = new Error(error.message);
            err.code = -1;
          }
        })
        .then(function(){
          callback(err, data);
        });
    }
};

export default Api;
import { Component } from '@angular/core';
import  firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCsY2BmR4m3-6w1uaI2TuPvip3XKaVpTX8",
      authDomain: "http-client-demo-d142f.firebaseapp.com",
      databaseURL: "https://http-client-demo-d142f.firebaseio.com",
      projectId: "http-client-demo-d142f",
      storageBucket: "http-client-demo-d142f.appspot.com",
      messagingSenderId: "21811968885",
      appId: "1:21811968885:web:9db1a6cafe53cdcf06f13c",
      measurementId: "G-CSW94B4H2Y"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}

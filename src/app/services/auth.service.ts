import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
/**
 * Creation d'un user d'authentfication
 * @param email 
 * @param password 
 */
  createNewUser(email:string, password:string){
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          ()=>{
            resolve();
          },
          (error)=>{
            reject(error);
          }
        );
      }
    );

  }

  /**
   * gere la connexion connecter
   * @param email 
   * @param password 
   */
  signin(email:string, password:string){
    return new Promise(
      (resolve, reject)=>{

        firebase.auth().signInWithEmailAndPassword(email, password);

      }

    );
  }
}

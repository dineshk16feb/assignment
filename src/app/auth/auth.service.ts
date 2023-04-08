import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userData: any;

    constructor(
        private afs: AngularFirestore,
        private afAuth: AngularFireAuth,
        private router: Router,
        private _snackBar: MatSnackBar,
    ) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
            } else {
                localStorage.setItem('user', 'null');
            }
        });
    }

    // Sign in with email/password
    SignIn(email: string, password: string) {
        return this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.SetUserData(result.user);
                this.afAuth.authState.subscribe((user) => {
                    if (user) {
                        this.router.navigate(['task-management']);
                        this._snackBar.open('Login Successful');
                    }
                });
            })
            .catch((error) => {
                this._snackBar.open(error.message);
            });
    }

    // Sign up with email/password
    SignUp(email: string, password: string, name: string) {
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.user) {
                    result.user.updateProfile({ displayName: name })
                        .then().catch(error => error)
                    this.router.navigate(['login']);
                    this._snackBar.open('Signup Successful');
                    this.SetUserData(result.user);
                }
            })
            .catch((error) => {
                this._snackBar.open(error.message);
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null ? true : false;
    }

    // Sign out
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }

    SetUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        };
        return userRef.set(userData, {
            merge: true,
        });
    }
}
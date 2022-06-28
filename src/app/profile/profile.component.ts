import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserProfileService } from '../services/user-profile.service';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { User } from '../model/user';
import { UserProfile } from '../model/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  active_user: string = '';
  user_gender: string = '';
  user_weight: string = '';
  user_height: string = '';
  user_age: string = '';

  userProfilesList: UserProfile[] = [];

  userObj: UserProfile = {
      id : '',
      email: '',
      username: '',
      gender: '',
      height: '',
      age: '',
      weight: '',
      objective: '',
      medical_issues: ''
    };

    id : string= '';
    email: string = '';
    username: string = '';
    gender: string = '';
    height: string = '';
    age: string = '';
    weight: string = '';
    objective: string = '';
    medical_issues: string = '';

  constructor(private auth: AuthService, private data: UserProfileService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.showEmail();
    this.getAllUserProfiles();
  }

  isLoggedIn() {
      return this.afAuth.authState.pipe(first()).toPromise();
  }

    getAllUserProfiles() {

      this.data.getAllUserProfiles().subscribe(res => {

        this.userProfilesList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })

      }, err => {
        alert('Error while fetching users data.');
      })

    }

    resetForm() {
      this.id = '';
      this.email = '';
      this.username = '';
      this.gender = '';
      this.height = '';
      this.age = '';
      this.weight = '';
      this.objective = '';
      this.medical_issues = '';
    }

    addUserProfile() {
      if (this.username == '' ||  this.gender == '' || this.height == '' || this.age == '' || this.weight == '' || this.objective == '' || this.medical_issues == '' ) {
        alert('Fill all input fields.');
        return;
      }

        this.userObj.id = '';
        this.userObj.email = this.active_user;
        this.userObj.username = this.username;
        this.userObj.gender = this.gender;
        this.userObj.height = this.height;
        this.userObj.age = this.age;
        this.userObj.weight = this.weight;
        this.userObj.objective = this.objective;
        this.userObj.medical_issues = this.medical_issues;

        this.data.addUserProfile(this.userObj);
        this.resetForm();
    }

    updateUser(userProfile : UserProfile) {
      if (this.username == '' ||  this.gender == '' || this.height == '' || this.age == '' || this.weight == '' || this.objective == '' || this.medical_issues == '' ) {
        alert('Fill all input fields.');
        return;
      }
        this.data.deleteUserProfile(userProfile);

        this.userObj.id = '';
        this.userObj.email = this.active_user;
        this.userObj.username = this.username;
        this.userObj.gender = this.gender;
        this.userObj.height = this.height;
        this.userObj.age = this.age;
        this.userObj.weight = this.weight;
        this.userObj.objective = this.objective;
        this.userObj.medical_issues = this.medical_issues;

        this.data.addUserProfile(this.userObj);
        this.resetForm();
    }

    deleteUserProfile(userProfile : UserProfile) {
      if (window.confirm('Are you sure you want to delete ' + userProfile.id + ' ?')) {
        this.data.deleteUserProfile(userProfile);
      }
    }


  url = '../../assets/images/upload.png';

  onSelect(event) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      window.alert('Please select correct image format');
    }
  }


  async showEmail() {
       const user =await  this.isLoggedIn()
       if (user) {
          this.active_user=user.email;
          this.user_gender=this.userObj.gender;
          this.user_weight=this.userObj.weight;
          this.user_height=this.userObj.height;
          this.user_age=this.userObj.age;

        //console.log(user.email);
       } else {
         // do something else
      }
  }

}

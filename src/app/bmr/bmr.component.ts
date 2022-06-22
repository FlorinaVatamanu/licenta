import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Bmr } from '../model/bmr';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-bmr',
  templateUrl: './bmr.component.html',
  styleUrls: ['./bmr.component.scss']
})
export class BmrComponent implements OnInit {

    usersList: User[] = [];

    userObj: User = {
      id : '',
      fullname: '',
      email: '',
      password: '',
      role: '',
      gender: '',
      weight: '',
      height: '',
      age: '',
      activity_level: ''
    };

    id : string= '';
    fullname: string = '';
    email: string = '';
    password: string = '';
    role: string = '';
    gender: string = '';
    weight: string = '';
    height: string = '';
    age: string = '';
    activity_level: string = '';
    rez: string = '';

    bmr_rez: number;
    active: number;


    carbs: string;
    carbsK: string;
    fats: string;
    fatsK: string;
    proteins: string;
    proteinsK: string;
    piechart: any;
    piechartK: any;

    constructor(private auth: AuthService, private data: UserService, private afAuth: AngularFireAuth) { }

    ngOnInit(): void {
      this.getAllUsers();
    }

    // register() {
    //   this.auth.logout();
    // }

    getAllUsers() {

      this.data.getAllUsers().subscribe(res => {

        this.usersList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.email = e.payload.doc.email;
          return data;
        })

      }, err => {
        alert('Error while fetching users data.');
      })

    }

    resetForm() {
      this.id = '';
      this.fullname = '';
      this.email = '';
      this.password = '';
      this.role = '';
      this.gender = '';
      this.weight = '';
      this.height = '';
      this.age = '';
      this.activity_level = '';
    }

    addUser() {
      if (this.fullname == '' ||  this.email == '' || this.password == '' || this.role == '' || this.gender == '' || this.weight == '' || this.height == '' ||  this.age == '' || this.activity_level == '' ) {
        alert('Fill all input fields.');
        return;
      }

        this.userObj.id = '';
        this.userObj.fullname = this.fullname;
        this.userObj.email = this.email;
        this.userObj.password = this.password;
        this.userObj.role = this.role;
        this.userObj.gender = this.gender;
        this.userObj.weight = this.weight;
        this.userObj.height = this.height;
        this.userObj.age = this.age;
        this.userObj.activity_level = this.activity_level;

        this.data.addUser(this.userObj);
        this.resetForm();

    }

    updateUser(user : User) {
      if (this.fullname == '' ||  this.email == '' || this.password == '' || this.role == '' || this.gender == '' || this.weight == '' || this.height == '' || this.age == '' || this.activity_level == '' ) {
        alert('Fill all input fields.');
        return;
      }
        this.data.deleteUser(user);

        this.userObj.id = '';
        this.userObj.fullname = this.fullname;
        this.userObj.email = this.email;
        this.userObj.password = this.password;
        this.userObj.role = this.role;
        this.userObj.gender = this.gender;
        this.userObj.weight = this.weight;
        this.userObj.height = this.height;
        this.userObj.age = this.age;
        this.userObj.activity_level = this.activity_level;

        this.data.addUser(this.userObj);
        this.resetForm();
    }

    updateUser2(user : User) {
      if (this.fullname == '' ||  this.email == '' || this.password == '' || this.role == '' || this.gender == '' || this.weight == '' || this.height == '' || this.age == '' || this.activity_level == '' ) {
        alert('Fill all input fields.');
        return;
      }

        this.userObj.gender = this.gender;
        this.userObj.weight = this.weight;
        this.userObj.height = this.height;
        this.userObj.age = this.age;
        this.userObj.activity_level = this.activity_level;

        //this.data.addUser(this.userObj);
        this.resetForm();
    }

    deleteUser(user : User) {
      if (window.confirm('Are you sure you want to delete ' + user.email + ' ?')) {
        this.data.deleteUser(user);
      }
    }

    isLoggedIn() {
      return this.afAuth.authState.pipe(first()).toPromise();
    }

    async doSomething() {
       const user =await  this.isLoggedIn()
       if (user) {
          this.rez=user.email;

          this.userObj.email = user.email;
          this.userObj.gender = this.gender;
          this.userObj.weight = this.weight;
          this.userObj.height = this.height;
          this.userObj.age = this.age;

          this.data.addUser(this.userObj);

        //console.log(user.email);
       } else {
         // do something else
      }
    }

    resetFormular(){
         this.resetForm();
    }

    calculateBMR(){
      if (this.gender == '' || this.weight == '' || this.height == '' || this.age == '') {
          alert('Fill all input fields.');
          return;
      }
      var varsta = Number(this.age);
      var inaltime = Number(this.height);
      var greutate = Number(this.weight);

      let calories = 0;
      if(this.gender == 'Female') {
          //females =  655.09 + 9.56 x (Weight in kg) + 1.84 x (Height in cm) - 4.67 x age
         calories = 655.09 + (9.56 * greutate) + (1.84 * inaltime) - (4.67 * varsta);
      }
      else {
         calories = 66.47 + (13.75 * greutate) + (5 * inaltime) - (6.75 * varsta);
        }

      calories = Math.round((calories + Number.EPSILON) * 100) / 100;
      this.bmr_rez=calories;
      console.log(this.bmr_rez);
   }

   calculateActivityLevel(){
      if (this.gender == '' || this.weight == '' || this.height == '' || this.age == '') {
          alert('Fill all input fields.');
          return;
      }
      var varsta = Number(this.age);
      var inaltime = Number(this.height);
      var greutate = Number(this.weight);
      var nivel_activitate = Number(this.activity_level);
      let calories = 0;
      let caloriesA = 0;
      if(this.gender == 'Female') {
          //females =  655.09 + 9.56 x (Weight in kg) + 1.84 x (Height in cm) - 4.67 x age
         calories = 655.09 + (9.56 * greutate) + (1.84 * inaltime) - (4.67 * varsta);
         caloriesA = nivel_activitate * calories;
      }
      else {
         calories = 66.47 + (13.75 * greutate) + (5 * inaltime) - (6.75 * varsta);
         caloriesA = nivel_activitate * calories;
        }
      this.bmr_rez=calories;
      caloriesA = Math.round((caloriesA + Number.EPSILON) * 100) / 100;
      this.active=caloriesA;

      console.log(this.active);
   }

   calculateCarbs(){
    var carbs1 = 0;
    //var carbs2 = 0;
    this.carbsK = (Math.round((((0.5 * this.bmr_rez)+ Number.EPSILON) * 100) / 100)).toString(10);
    carbs1 = 0.5 * this.bmr_rez / 4;
    //carbs2 = 0.65 * this.bmr_rez / 4;
    carbs1 = Math.round((carbs1 + Number.EPSILON) * 100) / 100;
    //carbs2 = Math.round((carbs2 + Number.EPSILON) * 100) / 100;
    this.carbs=carbs1.toString(10);// + ' - ' + carbs2.toString(10);
    console.log(this.carbs);
   }

   calculateFats(){
    var fats1 = 0;
    //var fats2 = 0;
    this.fatsK = (Math.round((((0.3 * this.bmr_rez)+ Number.EPSILON) * 100) / 100)).toString(10);
    fats1 = 0.3 * this.bmr_rez / 9;
    //fats2 = 0.35 * this.bmr_rez / 9;
    fats1 = Math.round((fats1 + Number.EPSILON) * 100) / 100;
    //fats2 = Math.round((fats2 + Number.EPSILON) * 100) / 100;
    this.fats=fats1.toString(10);// + ' - ' + fats2.toString(10);
    console.log(this.fats);
   }

   calculateProteins(){
    var protein1 = 0;
    //var protein2 = 0;
    this.proteinsK = (Math.round((((0.2 * this.bmr_rez) + Number.EPSILON) * 100) / 100)).toString(10);
    protein1 = 0.2 * this.bmr_rez / 4;
    //protein2 = 0.35 * this.bmr_rez / 4;
    protein1 = Math.round((protein1 + Number.EPSILON) * 100) / 100;
    //protein2 = Math.round((protein2 + Number.EPSILON) * 100) / 100;
    this.proteins=protein1.toString(10);//+ ' - ' + protein2.toString(10);
    console.log(this.proteins);
   }

    draw() {
        this.piechart = {
            labels: ['carbohydrates','fats','proteins'],
            datasets: [
                {
                    data: [this.carbs ,this.fats, this.proteins],
                    backgroundColor: [
                        "#FFCE56",
                        "#51d850",
                        "#ff885d"
                    ],
                    hoverBackgroundColor: [
                        "#FFCE56",
                        "#51d850",
                        "#ff885d"
                    ]
                }
            ]
        };

    }

     drawKcals() {
         this.piechartK = {
             labels: ['Kcal~C','Kcal~F','Kcal~P'],
             datasets: [
                 {
                     data: [this.carbsK ,this.fatsK, this.proteinsK],
                     backgroundColor: [
                         "#fbc983",
                         "#aeed83",
                         "#ff9e7d"
                     ],
                     hoverBackgroundColor: [
                         "#fbc983",
                         "#aeed83",
                         "#ff9e7d"
                     ]
                 }
             ]
         };

     }
}

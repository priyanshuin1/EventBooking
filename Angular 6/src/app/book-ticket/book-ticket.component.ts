import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray,FormGroup, Validators, FormControl, } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  bookingForm: FormGroup;
  submitted: boolean=false;
  registerForm: any;
  showattandance: boolean=false;
  selectedSet: any=[];
  messageShow: boolean=false;
  id: any;

  constructor( private router: Router,
    private _formBuilder: FormBuilder,
    private UserService : UserService,
    private routes: ActivatedRoute,
    private ToastrService : ToastrService) {
      this.routes.params.subscribe(
        (params:Params)=>{
           this.id=params.id
            })
    }

  ngOnInit() {

    this.registerForm = this._formBuilder.group({
      fullName: ['', Validators.required],
      emailId: ['' ,[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNo: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      NoOfSeats: ['', [Validators.required]],
      // NameOfAttended: this._formBuilder.array([])
      openTextFiled : this._formBuilder.array([])
  });
  }

  get f() { return this.registerForm.controls; }

  // noOfSeatsSelected(event){
  //   // console.log('dajsdhkasj',event.target.value );
  //   if(event.target.value != 1){
  //    this.showattandance= true;
  //    this.selectedSet=event.target.value ;
  //    console.log('hdkhdkafghk====', this.selectedSet);
  //   //  this.registerForm.controls['NameOfAttended'].Validators;
  //   }else{
  //     this.showattandance= false;
  //   }

  // }

  get noOfSeats()

  {
    
    return this.registerForm.get('openTextFiled') as FormArray;
    console.log(this.registerForm.get('openTextFiled'),'aheowqhjeoqiwh' );

  }


  noOfSeatsSelected(test)
  {
    let approvalno=this.registerForm.value.NoOfSeats;
    let length=this.noOfSeats.length;
    if(approvalno != 1){
      this.showattandance= true;
      
     }else{
       this.showattandance= false;
       this.registerForm.get('noOfSeats').clearValidators();
     }
    if(approvalno>length)
    {
      for (let k = length; k < approvalno; k++) {
        this.noOfSeats.push(this._formBuilder.group({
          NameOfAttended: ['', Validators.required]
        }));
      }
    }
    else if(approvalno < length)
    {
      let diff = length - approvalno;
      for (let k = 0; k < diff; k++)
       {
        this.noOfSeats.removeAt(k);
      }
    }
  }
    onSubmit() {
      console.log('fgfghuewriuewryweiuryieu',this.registerForm.controls);

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }else{
          console.log('this.registerForm=',this.registerForm)
          var bookingData={
            bookingData:this.registerForm.value,
            eventId : this.id
          }
          this.UserService.bookTicket(bookingData).subscribe((resp:any)=>{
            if(resp.status==200){
              this.ToastrService.success(resp.msg)
              this.messageShow=true;
            }else if(resp.status==202){
              this.ToastrService.info(resp.msg)
            }else{
              this.ToastrService.success(resp.msg)
              this.messageShow=true;
            }
          })
        }
    }
}

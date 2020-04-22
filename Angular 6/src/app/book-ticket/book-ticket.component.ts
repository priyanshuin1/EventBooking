import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
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
      NameOfAttended: ['']
  });
  }

  get f() { return this.registerForm.controls; }

  noOfSeatsSelected(event){
    // console.log('dajsdhkasj',event.target.value );
    if(event.target.value != 1){
     this.showattandance= true;
    //  this.selectedSet=event.target.value ;
    //  this.registerForm.controls['NameOfAttended'].Validators;
    }else{
      this.showattandance= false;
    }

  }

    onSubmit() {
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
            }else{
              this.ToastrService.success(resp.msg)
              this.messageShow=true;
            }
          })
        }
    }
}

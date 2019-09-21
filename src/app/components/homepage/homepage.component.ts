import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { Router } from "@angular/router";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  imageurl: string = "/assets/img/default.png";
  filetoupload: File = null;
  constructor(
    public modalService: NgbModal,
    public fb: FormBuilder,
    public http: HttpClient,
    public router: Router
  ) {}
  reactForm: FormGroup;
  ngOnInit() {
    this.reactForm = this.fb.group({
      upload: "",
      firstname: [
        "",
        [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,20}$/)]
      ],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      number: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /(\+?\(?\d{0,4}\)?[ -\/]{0,3}\(?\d{2,5}\)?[ -]?)?[\d -]{6,12}\d/
          )
        ]
      ],
      age: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      address: ["", [Validators.required]],
      home1: ["", [Validators.required]],
      home2: ["", [Validators.required]],
      company1: ["", [Validators.required]],
      company2: ["", [Validators.required]],
      tag: ["", Validators.required]
    });
  }

  fileinput(file: FileList) {
    this.filetoupload = file.item(0);
    //console.log(this.filetoupload);
    // preview of image

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageurl = event.target.result;
    };
    reader.readAsDataURL(this.filetoupload);
  }

  url = "http://localhost:3000/Profile";
  advab;
  addfield() {
    this.advab = this.reactForm.value.address;
  }
  reactsubmit() {
    var tags = [];
    for (var i = 0; i < this.reactForm.value.tag.length; i++) {
      tags.push(this.reactForm.value.tag[i].display);
    }
    //console.log(this.imageurl);

    var tag_str = tags.join(",");
    var data =
      "firstname=" +
      this.reactForm.value.firstname +
      "&lastname=" +
      this.reactForm.value.lastname +
      "&email=" +
      this.reactForm.value.email +
      "&number=" +
      this.reactForm.value.number +
      "&age=" +
      this.reactForm.value.age +
      "&state=" +
      this.reactForm.value.state +
      "&country=" +
      this.reactForm.value.country +
      "&home1=" +
      this.reactForm.value.home1 +
      "&home2=" +
      this.reactForm.value.home2 +
      "&company1=" +
      this.reactForm.value.company1 +
      "&company2=" +
      this.reactForm.value.company2 +
      "&upload=" +
      this.imageurl +
      "&tag=" +
      tag_str;
    // console.log(this.reactForm);
    const myheaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    this.http.post(this.url, data, { headers: myheaders }).subscribe(res => {
      this.router.navigate(["/profile/" + res["id"]]);
    });

    this.reactForm.reset();
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    return value;
  }
}

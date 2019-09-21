import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public modalService: NgbModal,
    public fb: FormBuilder,
    public router: Router,
    public domS: DomSanitizer,
    public activeRoute: ActivatedRoute
  ) {}
  data: any = {};
  reactForm: FormGroup;
  imgUrl: any = "./assets/img/default.png";

  ngOnInit() {
    let id = this.activeRoute.snapshot.params.id;

    this.http.get("http://localhost:3000/Profile?id=" + id).subscribe(res => {
      this.data = res[0];
      console.log(res);
      var tag_arr = this.data.tag.split(",");
      var tags_arr = [];
      for (var i = 0; i < tag_arr.length; i++) {
        tags_arr.push(tag_arr[i]);
      }
      this.imgUrl = this.domS.bypassSecurityTrustUrl(this.data.upload);

      this.reactForm = this.fb.group({
        firstname: [
          this.data.firstname,
          [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,20}$/)]
        ],
        lastname: [this.data.lastname, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        number: [
          this.data.number,
          [
            Validators.required,
            Validators.pattern(
              /(\+?\(?\d{0,4}\)?[ -\/]{0,3}\(?\d{2,5}\)?[ -]?)?[\d -]{6,12}\d/
            )
          ]
        ],
        age: [this.data.age, Validators.required],
        state: [this.data.state, Validators.required],
        country: [this.data.country, Validators.required],
        address: [""],
        home1: [this.data.home1, [Validators.required]],
        home2: [this.data.home2, [Validators.required]],
        company1: [this.data.company1, [Validators.required]],
        company2: [this.data.company2, [Validators.required]],
        tag: [tags_arr, Validators.required]
      });
      //console.log(this.data);
    });
  }
  url = "http://localhost:3000/Profile";
  advab;
  addfield() {
    this.advab = this.reactForm.value.address;
  }
  reactsubmit() {
    var tags = [];
    for (var i = 0; i < this.reactForm.value.tag.length; i++) {
      if (this.reactForm.value.tag[i].display) {
        tags.push(this.reactForm.value.tag[i].display);
      } else {
        tags.push(this.reactForm.value.tag[i]);
      }

      // console.log(this.reactForm.value.tags);
    }

    var tag_str = tags.join(",");

    var datas =
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
      "&tag=" +
      tag_str;
    // console.log(datas);
    // console.log(this.reactForm);
    const myheaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    this.http.post(this.url, datas, { headers: myheaders }).subscribe(res => {
      this.router.navigate(["/profile/" + res["id"]]);
    });
    this.reactForm.reset();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}

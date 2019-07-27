import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../services/requests.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    login: string;
    password: string;
    error: boolean;

    constructor(public request: RequestsService, private router: Router) {
        this.error = false;
    }

    ngSubmit(event) {
        event.preventDefault();
        this.request.getAdmin(this.login, this.password).subscribe(result => {
            if (result) {
                localStorage.setItem('isAdmin', JSON.stringify(result));
                this.router.navigate(['/admin']);
                this.error = false;
            } else {
                console.log(result);
                this.error = true;
            }
        });
    }

    ngOnInit() {
    }

}

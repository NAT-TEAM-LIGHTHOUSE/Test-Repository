import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Globalobjects } from '../../../../services/globalobjects';
import { Login } from '../../../../services/login';

@Component({
  selector: 'app-website-footer',
  templateUrl: './website-footer.component.html',
  styleUrls: ['./website-footer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive,RouterLink]
})
export class WebsiteFooterComponent implements OnInit {
  private blockedDomains = [
    '0-mail.com', '0815.ru', '10mail.org', '10minutemail.com', '10minutemail.net', '10minutemail.org', '20minutemail.com',
    '2prong.com', '33mail.com', '3d-painting.com', '4warding.com', 'anonbox.net', 'anonymbox.com', 'antichef.com',
    'armyspy.com',
    'binkmail.com', 'bodhi.lawlita.com', 'bofthew.com',
    'burnermail.io',
    'byom.de',
    'chacuo.net',
    'cool.fr.nf',
    'courriel.fr.nf',
    'dayrep.com',
    'deadaddress.com',
    'despam.it',
    'devnullmail.com',
    'discard.email',
    'discardmail.com',
    'discardmail.de',
    'disposable.com',
    'dispostable.com',
    'dm.w3internet.co.uk',
    'dodgit.com',
    'dodgit.org',
    'dontreg.com',
    'dropmail.me',
    'dump-email.info',
    'e4ward.com',
    'emailondeck.com',
    'emailtemporario.com.br',
    'emailtmp.com',
    'fakeinbox.com',
    'fake-mail.ml',
    'fastacura.com',
    'filzmail.com',
    'fizmail.com',
    'fleckens.hu',
    'frapmail.com',
    'garliclife.com',
    'getairmail.com',
    'getnada.com',
    'gishpuppy.com',
    'gmal.com',
    'guerrillamail.biz',
    'guerrillamail.com',
    'guerrillamail.de',
    'guerrillamail.net',
    'guerrillamail.org',
    'guerrillamailblock.com',
    'hidemail.de',
    'hmamail.com',
    'hotpop.com',
    'incognitomail.com',
    'jetable.com',
    'jetable.fr.nf',
    'kasmail.com',
    'keepmymail.com',
    'killmail.com',
    'klezmail.com',
    'mail-temporaire.fr',
    'maildrop.cc',
    'mailinator.com',
    'mailinator.net',
    'mailinator.org',
    'mailnesia.com',
    'mailnull.com',
    'mailnesia.com',
    'mailtothis.com',
    'mintemail.com',
    'mintmail.com',
    'mohmal.com',
    'mytemp.email',
    'no-spam.ws',
    'noclickemail.com',
    'nowmymail.com',
    'objectmail.com',
    'one-time.email',
    'opayq.com',
    'owlpic.com',
    'pookmail.com',
    'proxymail.eu',
    'rcpt.at',
    'recode.me',
    'sharklasers.com',
    'spambog.com',
    'spambog.de',
    'spambog.ru',
    'spamgourmet.com',
    'spamherelots.com',
    'spamhereplease.com',
    'spamhole.com',
    'spamify.com',
    'spaminator.de',
    'spamspot.com',
    'temp-mail.io',
    'temp-mail.org',
    'temp-mail.ru',
    'tempail.com',
    'tempemail.com',
    'tempinbox.com',
    'tempmail.com',
    'tempmail.net',
    'tempmailaddress.com',
    'temporaryemail.net',
    'throwawaymail.com',
    'trashmail.at',
    'trashmail.com',
    'trashmail.de',
    'trashmail.net',
    'wegwerfemail.de',
    'wegwerfmail.de',
    'yopmail.com',
    'yopmail.fr',
    'yopmail.net'
  ];
websiteUrl :any




  Subscriber = {
    email: ''
  };

  isSending = false;
  sendMsg = '';
  ok_sendMsg="";

  constructor(private loginService: Login,public globalObject : Globalobjects
  ) {   }

  ngOnInit() { 
    this.websiteUrl= this.globalObject.websiteUrl;
  }

  onSubmit() {
    if (!this.Subscriber.email) {
      this.sendMsg = 'Please enter your email.';
      return;
    }


     if (!this.Subscriber.email.includes('@')) {
    this.sendMsg = 'Please enter a valid email address.';
    return;
  }
  // Disposable email validation
  const domain = this.Subscriber.email
    .split('@')[1]
    .toLowerCase()
    .trim();

  if (this.blockedDomains.includes(domain)) {
    this.sendMsg =
      'Disposable email addresses are not allowed. Please use a valid email.';
    return;
  }
    this.isSending = true;
    this.sendMsg = '';

    let wsdp: any = {
      email: this.Subscriber.email,
      serviceType: "web_newsletter"
    };

    let reqBody = {
      wsdp: wsdp
    };

    this.loginService.postData(reqBody, 'operateData').subscribe({
      next: (res: any) => {
        this.isSending = false;
        if (res.responseStatus && res.responseStatus.includes('success')) {
          this.ok_sendMsg = 'Thank you for subscribing!';
          this.Subscriber = { email: '' };
        } else {
          this.sendMsg = res.responseMsg || 'Something went wrong.';
        }
      },
      error: (err: any) => {
        console.error('Error subscribing: ', err);
        this.isSending = false;
        this.sendMsg = 'Server error. Please try again later.';
      }
    });
  }

  open() {
    // alert("hello");
  }


   openWhatsApp(): void {
  window.open(
    'https://wa.me/919158883141',
    '_blank',
    'noopener,noreferrer'
  );
}


}




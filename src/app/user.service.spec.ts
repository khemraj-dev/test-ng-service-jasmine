import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


import { UserService } from './user.service';

fdescribe('UserService', () => {
  let service: UserService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
    service = TestBed.get(UserService);
    backend = TestBed.get(MockBackend);
  });

  it('#isLoggedIn should return false after creation', inject([UserService], (service: UserService) => {
    expect(service.isLoggedIn()).toBeFalsy();
  }));

  it('should send the login request to the server', (done) => {
    done();
  });

  it('#login should call endpoint and return it\'s result', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/login');
      expect(connection.request.text()).toEqual(JSON.stringify({ username: 'admin', password: 'secret' }));
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      let options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
    });

    service
      .login({ username: 'admin', password: 'secret' })
      .subscribe((response) => {
        expect(response.json()).toEqual({ success: true });
        done();
      });
  });
});




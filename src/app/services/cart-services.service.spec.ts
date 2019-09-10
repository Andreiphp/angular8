import { TestBed } from '@angular/core/testing';

import { CartServicesService } from './cart-services.service';

describe('CartServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartServicesService = TestBed.get(CartServicesService);
    expect(service).toBeTruthy();
  });
});

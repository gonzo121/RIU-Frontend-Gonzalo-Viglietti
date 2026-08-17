import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be loading initially', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('shoud be loading after show is called', () => {
    service.show();

    expect(service.isLoading()).toBe(true);
  });

  it('should stop loading after hide is called', () => {
    service.show();

    service.hide();

    expect(service.isLoading()).toBe(false);
  });

  it('should not go below zero when hide is called without pending operations', () => {
    service.hide();
    service.hide();

    expect(service.isLoading()).toBe(false);
  });

  it('should remain loading while there are pending operations', () => {
    service.show();
    service.show();

    service.hide();

    expect(service.isLoading()).toBe(true);
  });

  it('should stop loading when all pending operations are completed', () => {
    service.show();
    service.show();

    service.hide();
    service.hide();

    expect(service.isLoading()).toBe(false);
  });

  describe('run', () => {
    it('should execute the operation and return its result', async () => {
      const operation = jest.fn().mockResolvedValue('success');

      const result = await service.run(operation);

      expect(operation).toHaveBeenCalledTimes(1);
      expect(result).toBe('success');
    });

    it('should activate loading while operation is running', async () => {
      let resolveOperation!: (value: string) => void;

      const operation = () => 
        new Promise<string>(resolve => {
          resolveOperation = resolve;
        });

      const promise = service.run(operation);

      expect(service.isLoading()).toBe(true);

      resolveOperation('success');

      await promise;

      expect(service.isLoading()).toBe(false);      
    });

    it('should stop loading after operation completes', async () => {
      await service.run(async () => 'success');

      expect(service.isLoading()).toBe(false);
    })

    it('should stop loading even if operation throws an error', async () => {
      const operation = jest.fn().mockRejectedValue(
        new Error('Algo salio mal')
      );

      await expect(service.run(operation)).rejects.toThrow(
        'Algo salio mal'
      );

      expect(service.isLoading()).toBe(false);
    });

  });
}); 

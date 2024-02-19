import { HttpException } from '../../src/middlewares';

describe('Error', () => {
  it('should return a new instance of HttpException', () => {
    const error = new HttpException(400, 'error');
    expect(error).toBeInstanceOf(HttpException);
  });
  it('should have a status and message', () => {
    const error = new HttpException(400, 'error');
    expect(error.status).toBe(400);
    expect(error.message).toBe('error');
  });
});

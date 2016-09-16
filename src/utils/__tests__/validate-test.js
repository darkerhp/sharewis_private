/* eslint-disable no-undef */
import validateEmailLogin from '../validate';

describe('Validate', () => {
  describe('validateEmailLogin', () => {
    it('should return 2 errors if email and password are missing', () => {
      emptyForm = {
        email: '',
        password: '',
      };
      expect(validateEmailLogin(emptyForm)).toEqual({
        email: '必要です',
        password: '必要です',
      });
    });

    it('should return 1 error if email is missing', () => {
      incompleteForm = {
        email: '',
        password: 'password',
      };
      expect(validateEmailLogin(incompleteForm)).toEqual({
        email: '必要です',
      });
    });

    it('should return 1 error if password is missing', () => {
      incompleteForm = {
        email: 'existing_user@example.com',
        password: '',
      };
      expect(validateEmailLogin(incompleteForm)).toEqual({
        password: '必要です',
      });
    });


    it('should return no error if both fields are filled', () => {
      goodForm = {
        email: 'existing_user@example.com',
        password: 'password',
      };
      expect(validateEmailLogin(goodForm)).toEqual({});
    });
  });
});
